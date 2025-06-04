
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const planFeatures = {
  free: [
    "3 idea validations per month", 
    "Basic AI analysis", 
    "Export to PDF",
  ],
  basic: [
    "10 idea validations per month", 
    "Advanced AI analysis", 
    "Export to PDF and Notion", 
    "Competitor analysis",
  ],
  pro: [
    "Unlimited idea validations", 
    "Premium AI analysis", 
    "All export options", 
    "Competitor analysis",
    "Market trend reports",
    "ROI projections",
  ]
};

const ChoosePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      // In a real app, we would handle subscription creation here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`You've selected the ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error selecting plan:', error);
      toast.error('Failed to select plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground">Select the plan that best fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className={`border-2 ${selectedPlan === 'free' ? 'border-accent' : 'border-border'} transition-all`}>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle>Free</CardTitle>
                {selectedPlan === 'free' && <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">Selected</span>}
              </div>
              <CardDescription>Get started with idea validation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">$0 <span className="text-muted-foreground text-sm font-normal">/month</span></div>
              <ul className="space-y-2">
                {planFeatures.free.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedPlan === 'free' ? 'default' : 'outline'} 
                className="w-full"
                onClick={() => setSelectedPlan('free')}
              >
                {selectedPlan === 'free' ? 'Selected' : 'Select Free'}
              </Button>
            </CardFooter>
          </Card>

          {/* Basic Plan */}
          <Card className={`border-2 ${selectedPlan === 'basic' ? 'border-accent' : 'border-border'} transition-all`}>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle>Basic</CardTitle>
                {selectedPlan === 'basic' && <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">Selected</span>}
              </div>
              <CardDescription>For serious idea validation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">$9.99 <span className="text-muted-foreground text-sm font-normal">/month</span></div>
              <ul className="space-y-2">
                {planFeatures.basic.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedPlan === 'basic' ? 'default' : 'outline'} 
                className="w-full"
                onClick={() => setSelectedPlan('basic')}
              >
                {selectedPlan === 'basic' ? 'Selected' : 'Select Basic'}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className={`border-2 ${selectedPlan === 'pro' ? 'border-accent' : 'border-border'} relative overflow-hidden transition-all`}>
            {/* Recommended badge */}
            <div className="absolute -right-12 top-6 bg-accent text-white px-12 py-1 rotate-45 text-xs font-semibold">
              RECOMMENDED
            </div>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="flex items-center gap-2">
                  Pro <Zap size={16} className="text-yellow-400" />
                </CardTitle>
                {selectedPlan === 'pro' && <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">Selected</span>}
              </div>
              <CardDescription>Complete idea validation suite</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">$19.99 <span className="text-muted-foreground text-sm font-normal">/month</span></div>
              <ul className="space-y-2">
                {planFeatures.pro.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedPlan === 'pro' ? 'default' : 'outline'} 
                className="w-full"
                onClick={() => setSelectedPlan('pro')}
              >
                {selectedPlan === 'pro' ? 'Selected' : 'Select Pro'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-10 flex justify-center">
          <Button 
            size="lg" 
            onClick={handleContinue} 
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Continue with ' + selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          You can change your plan at any time from your account settings.
        </p>
      </div>
    </div>
  );
};

export default ChoosePlan;
