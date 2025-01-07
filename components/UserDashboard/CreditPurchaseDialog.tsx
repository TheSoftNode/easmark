import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Loader2, Info, DollarSign, CreditCardIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePurchaseCreditsMutation } from '@/src/redux/features/dashboard/dashboardApi';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const creditPackages = [
  { credits: 100, price: 49.99, popular: false, description: "Perfect for small projects" },
  { credits: 250, price: 99.99, popular: true, description: "Most popular for medium-sized needs" },
  { credits: 500, price: 179.99, popular: false, description: "Best value for regular users" },
];

// Rate per credit (price/credits from the middle package as reference)
const CREDIT_RATE = creditPackages[1].price / creditPackages[1].credits;

interface CreditPurchaseDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function CreditPurchaseDialog({
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
  trigger
}: CreditPurchaseDialogProps) {
  const [selectedPackage, setSelectedPackage] = useState(creditPackages[1]);
  const [customCredits, setCustomCredits] = useState<string>("");
  const [purchaseMode, setPurchaseMode] = useState<'package' | 'custom'>('package');
  const [purchaseCredits, { isLoading }] = usePurchaseCreditsMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    externalOnOpenChange?.(open);
  };

  const calculatePrice = (credits: number) => {
    return (credits * CREDIT_RATE).toFixed(2);
  };

  const handleCustomCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomCredits(value);
  };

  const handlePurchase = async () => {
    try {
      const credits = purchaseMode === 'custom' ? parseInt(customCredits) : selectedPackage.credits;
      const price = purchaseMode === 'custom' ? calculatePrice(credits) : selectedPackage.price;

      if (purchaseMode === 'custom' && (!credits || credits < 50)) {
        toast.error('Minimum purchase is 50 credits');
        return;
      }

      // Here you would integrate with Stripe
      const paymentMethodId = 'dummy_payment_method_id';

      await toast.promise(
        purchaseCredits({
          amount: credits,
          paymentMethodId
        }).unwrap(),
        {
          loading: 'Processing purchase...',
          success: `Successfully purchased ${credits} credits!`,
          error: 'Failed to process purchase'
        }
      );

      handleOpenChange(false);
    } catch (error) {
      console.error('Purchase error:', error);
    }
  };

  return (
    <Dialog open={externalIsOpen ?? isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="text-indigo-600 border-indigo-600">
            <CreditCard className="mr-2 h-4 w-4" />
            Add Credits
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[98vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Purchase Credits</DialogTitle>
          <DialogDescription>
            Choose a credit package or enter a custom amount
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="package" className="w-full" onValueChange={(v) => setPurchaseMode(v as 'package' | 'custom')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="package">Preset Packages</TabsTrigger>
            <TabsTrigger value="custom">Custom Amount</TabsTrigger>
          </TabsList>

          <TabsContent value="package" className="space-y-4">
            <div className="grid gap-4 py-4">
              {creditPackages.map((pkg) => (
                <div
                  key={pkg.credits}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedPackage.credits === pkg.credits
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'}
                  `}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                      Popular
                    </span>
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{pkg.credits} Credits</h3>
                      <p className="text-sm text-gray-500 mt-1">{pkg.description}</p>
                      <p className="text-sm text-indigo-600 mt-2">
                        ${(pkg.price / pkg.credits).toFixed(3)} per credit
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${pkg.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle>Custom Credit Amount</CardTitle>
                <CardDescription>Enter the number of credits you'd like to purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Credits</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={customCredits}
                      onChange={handleCustomCreditsChange}
                      className="pl-8"
                      placeholder="Minimum 50 credits"
                    />
                    <CreditCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                {parseInt(customCredits) > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate per credit:</span>
                      <span className="font-medium">${CREDIT_RATE.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total price:</span>
                      <span className="font-bold text-lg">
                        ${calculatePrice(parseInt(customCredits))}
                      </span>
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500 flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Minimum purchase is 50 credits. The price per credit is fixed at ${CREDIT_RATE.toFixed(3)}.
                    Payment will be processed securely through Stripe.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button
            onClick={handlePurchase}
            className="w-full"
            disabled={isLoading || (purchaseMode === 'custom' && (!customCredits || parseInt(customCredits) < 50))}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <DollarSign className="mr-2 h-4 w-4" />
                {purchaseMode === 'custom' 
                  ? `Purchase ${customCredits || '0'} Credits for $${calculatePrice(parseInt(customCredits) || 0)}`
                  : `Purchase ${selectedPackage.credits} Credits for $${selectedPackage.price}`
                }
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}