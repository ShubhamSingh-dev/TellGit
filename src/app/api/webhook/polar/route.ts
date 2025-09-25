import { db } from "@/lib/db";
import { findPlan } from "@/lib/utils";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

    onCustomerCreated: async (payload) => {
        const email = payload.data.email;
        const customerId = payload.data.id;

        await db.user.update({ where: { email }, data: { customerId }, })
    },

    onSubscriptionCreated: async (payload) => {
        await db.subscription.create({
            data: {
                polarSubId: payload.data.productId,
                customerId: payload.data.customerId,
                planType: findPlan(payload.data.productId)!.plan,
                billingCycle: findPlan(payload.data.productId)!.billingCycle,
                status: "PAST_DUE",
                startDate: payload.data.startedAt ? new Date(payload.data.startedAt) : new Date(),
                endDate: payload.data.endsAt ? new Date(payload.data.endsAt) : new Date(),
                maxProjects: findPlan(payload.data.productId)!.maxProjects,
                maxTeamMembers: findPlan(payload.data.productId)!.maxTeamMembers,
                maxQuestions: findPlan(payload.data.productId)!.maxQuestions,
                maxMeetingSeconds: findPlan(payload.data.productId)!.maxMeetingSeconds,
                includedCredits: findPlan(payload.data.productId)!.includedCredits,
                user: {
                    connect: { email: payload.data.user.email }
                },
            },
        });
    },

    onSubscriptionUpdated: async (payload) => {
        // Map Polar status to your application status
        let subscriptionStatus: "ACTIVE" | "CANCELLED" | "EXPIRED" | "PAST_DUE";

        switch (payload.data.status?.toLowerCase()) {
            case "active":
                subscriptionStatus = "ACTIVE";
                break;
            case "canceled":
            case "cancelled":
                subscriptionStatus = "CANCELLED";
                break;
            case "expired":
            case "terminated":
                subscriptionStatus = "EXPIRED";
                break;
            case "incomplete":
            case "incomplete_expired":
            case "past_due":
                subscriptionStatus = "PAST_DUE";
                break;
            default:
                // Keep existing status if mapping is unclear
                const existingSubscription = await db.subscription.findUnique({
                    where: { customerId: payload.data.customerId },
                    select: { status: true }
                });
                subscriptionStatus = existingSubscription?.status || "PAST_DUE";
        }

        await db.subscription.update({
            where: { customerId: payload.data.customerId },
            data: {
                polarSubId: payload.data.productId,
                planType: findPlan(payload.data.productId)!.plan,
                billingCycle: findPlan(payload.data.productId)!.billingCycle,
                status: subscriptionStatus,
                startDate: payload.data.startedAt ? new Date(payload.data.startedAt) : undefined,
                endDate: payload.data.endsAt ? new Date(payload.data.endsAt) : undefined,
                maxProjects: findPlan(payload.data.productId)!.maxProjects,
                maxTeamMembers: findPlan(payload.data.productId)!.maxTeamMembers,
                maxQuestions: findPlan(payload.data.productId)!.maxQuestions,
                maxMeetingSeconds: findPlan(payload.data.productId)!.maxMeetingSeconds,
                includedCredits: findPlan(payload.data.productId)!.includedCredits,
            },
        });

        await db.creditHistory.create({
            data: {
                customerId: payload.data.customerId,
                amount: payload.data.amount! / 100,
                type: "PLAN_RESTRUCTURE",
                description: `Subscription Updated - ${payload.data.productId}`,
            }
        });
    },

    onSubscriptionActive: async (payload) => {
        // Update user, subscription and credit history
        await db.$transaction(async (tx) => {
            await tx.user.update({
                where: { email: payload.data.user.email },
                data: {
                    customerId: payload.data.customerId,
                    subscription: {
                        connect: { customerId: payload.data.customerId }
                    },
                    credits: { increment: findPlan(payload.data.productId)!.includedCredits },
                },
            });
            await tx.subscription.update({
                where: { customerId: payload.data.customerId },
                data: {
                    polarSubId: payload.data.productId,
                    planType: findPlan(payload.data.productId)!.plan,
                    billingCycle: findPlan(payload.data.productId)!.billingCycle,
                    status: "ACTIVE",
                    startDate: payload.data.startedAt ? new Date(payload.data.startedAt) : new Date(),
                    endDate: payload.data.endsAt ? new Date(payload.data.endsAt) : new Date(),
                    maxProjects: findPlan(payload.data.productId)!.maxProjects,
                    maxTeamMembers: findPlan(payload.data.productId)!.maxTeamMembers,
                    maxQuestions: findPlan(payload.data.productId)!.maxQuestions,
                    maxMeetingSeconds: findPlan(payload.data.productId)!.maxMeetingSeconds,
                    includedCredits: findPlan(payload.data.productId)!.includedCredits,
                },
            });
            return tx.creditHistory.create({
                data: {
                    customerId: payload.data.customerId,
                    amount: payload.data.amount! / 100,
                    type: "PLAN_ALLOCATION",
                    description: `Subscription Active - ${payload.data.productId}`,
                },
            });
        });
    },

    onSubscriptionCanceled: async (payload) => {
        await db.subscription.update({
            where: { customerId: payload.data.customerId, planType: findPlan(payload.data.productId)?.plan, status: "ACTIVE" },
            data: { status: "CANCELLED" },
        });
    },

    onSubscriptionRevoked: async (payload) => {
        await db.subscription.update({
            where: { customerId: payload.data.customerId },
            data: { status: "EXPIRED" },
        });
    },

    // Future Scope: Handling payments (No Changes Needed)
    // onOrderCreated: async (payload) => {
    //     await db.payment.create({
    //         data: {
    //             id: payload.data.id,
    //             customerId: payload.data.customerId,
    //             amount: payload.data.amount / 100,
    //             currency: payload.data.currency,
    //             status: "SUCCESSFUL",
    //             createdAt: new Date(),
    //             transactionId: payload.data.checkoutId!,
    //             description: `Payment for order ${payload.data.id}`,
    //         },
    //     });
    // },

    // onOrderRefunded: async (payload) => {
    //     await db.$transaction(async (tx) => {
    //         await tx.payment.update({
    //             where: { id: payload.data.id },
    //             data: { status: "REFUNDED" },
    //         });
    //         return tx.creditHistory.create({
    //             data: {
    //                 customerId: payload.data.customerId,
    //                 amount: payload.data.amount / 100,
    //                 type: "REFUND",
    //                 description: `Refund for Order - ${payload.data.productId} $${payload.data.refundedAmount}`,
    //             },
    //         });
    //     });
    // },

    onRefundCreated: async (payload) => { },
    onRefundUpdated: async (payload) => { },
});
