"use client";

import { CreditCard, Info } from 'lucide-react';
import React from 'react'
import { Button } from '~/components/ui/button';
import { createCheckoutSession } from '~/lib/stripe';
import { api } from '~/trpc/react';
import { Slider } from '~/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

const BillingPage = () => {
    const {data:credits} = api.project.getMyCredits.useQuery();
    const [creditsToBuy,setCreditsToBuy] = React.useState<number[]>([100]);
    const creditsToBuyAmount = creditsToBuy[0]!;
    const price = (creditsToBuyAmount / 50).toFixed(2);
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Credits</h1>
        <p className="text-muted-foreground">
          Manage your account credits and billing information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the pay-as-you-go plan.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-center">
            <div className="text-4xl font-bold">{credits?.credits || 0}</div>
            <p className="text-sm text-muted-foreground mt-1">Available Credits</p>
          </CardContent>
          <CardFooter>
            <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700 w-full text-sm flex gap-3 items-start mt-auto">
              <Info className="size-5 mt-0.5 shrink-0" />
              <div>
                <p>Each credit allows you to index 1 file in a repository.</p>
                <p className="font-medium mt-1">Example: A project with 100 files requires 100 credits.</p>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buy More Credits</CardTitle>
            <CardDescription>Select the amount of credits you wish to purchase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Amount</span>
              <span className="text-2xl font-bold">{creditsToBuyAmount} Credits</span>
            </div>
            
            <Slider 
              defaultValue={[100]}
              max={1000}
              min={10}
              step={10}
              onValueChange={(value) => setCreditsToBuy(value)}
              value={creditsToBuy}
              className="py-4"
            />
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Price per 50 credits</span>
              <span className="font-medium text-foreground">$1.00</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full flex gap-2"
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
  )
}

export default BillingPage