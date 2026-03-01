"use client";

import { CreditCard, Info, Wallet } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { createCheckoutSession } from "~/lib/stripe";
import { api } from "~/trpc/react";
import { Slider } from "~/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const BillingPage = () => {
  const { data: credits } = api.project.getMyCredits.useQuery();
  const [creditsToBuy, setCreditsToBuy] = React.useState<number[]>([100]);
  const creditsToBuyAmount = creditsToBuy[0]!;
  const price = (creditsToBuyAmount / 50).toFixed(2);

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-charcoal-800 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white uppercase italic">
          Billing &amp; Credits
        </h1>
        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase mt-1">
          Manage your account credits and purchase history
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Balance Card */}
        <Card className="flex flex-col border-charcoal-800 bg-charcoal-900 rounded-sm shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold tracking-tight text-white uppercase italic">
                  Current Balance
                </CardTitle>
                <CardDescription className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Pay-as-you-go plan
                </CardDescription>
              </div>
              <div className="bg-brand-primary/10 rounded-sm p-2 text-brand-primary">
                <Wallet className="size-5" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col justify-center">
            <div className="text-5xl font-bold text-white tracking-tight font-mono">
              {credits?.credits ?? 0}
            </div>
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mt-2">
              Available Credits
            </p>
          </CardContent>

          <CardFooter>
            <div className="w-full rounded-sm border border-brand-primary/20 bg-brand-primary/5 px-4 py-3 flex gap-3 items-start">
              <Info className="size-4 mt-0.5 shrink-0 text-brand-primary" />
              <div className="text-[11px] font-mono text-slate-400 space-y-1">
                <p>Each credit allows you to index <span className="text-white font-bold">1 file</span> in a repository.</p>
                <p className="text-slate-500">A project with 100 files costs 100 credits.</p>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Buy Credits Card */}
        <Card className="border-charcoal-800 bg-charcoal-900 rounded-sm shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold tracking-tight text-white uppercase italic">
                  Buy Credits
                </CardTitle>
                <CardDescription className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Select the amount to purchase
                </CardDescription>
              </div>
              <div className="bg-brand-primary/10 rounded-sm p-2 text-brand-primary">
                <CreditCard className="size-5" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Amount display */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">
                  Amount
                </p>
                <span className="text-3xl font-bold text-white font-mono">
                  {creditsToBuyAmount}
                </span>
                <span className="text-slate-500 text-sm font-bold ml-2 uppercase tracking-wider">credits</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">
                  Total
                </p>
                <span className="text-3xl font-bold text-brand-primary font-mono">
                  ${price}
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <Slider
                defaultValue={[100]}
                max={1000}
                min={10}
                step={10}
                onValueChange={(value) => setCreditsToBuy(value)}
                value={creditsToBuy}
                className="py-2"
              />
              <div className="flex justify-between text-[10px] font-bold font-mono text-slate-600 uppercase">
                <span>10</span>
                <span>500</span>
                <span>1000</span>
              </div>
            </div>

            {/* Rate info */}
            <div className="flex justify-between items-center border border-charcoal-800 rounded-sm px-4 py-3 bg-charcoal-950/50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Rate
              </span>
              <span className="font-mono text-sm font-bold text-white">
                $1.00 / 50 credits
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-sm h-11 tracking-wider uppercase flex gap-2"
              onClick={() => {
                createCheckoutSession(creditsToBuyAmount);
              }}
            >
              <CreditCard className="size-4" />
              Buy {creditsToBuyAmount} credits for ${price}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BillingPage;