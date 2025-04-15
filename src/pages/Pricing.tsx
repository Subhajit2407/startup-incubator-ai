
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingCard = ({ 
  title, 
  price, 
  features, 
  recommended = false 
}: { 
  title: string; 
  price: string; 
  features: string[]; 
  recommended?: boolean;
}) => {
  return (
    <div className={`p-6 rounded-xl bg-black/40 backdrop-blur-sm border ${recommended ? 'border-idea-purple/50' : 'border-white/10'} relative`}>
      {recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-idea-purple px-4 py-1 rounded-full text-xs font-medium">
          Recommended
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-white/60">/m</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-idea-purple shrink-0 mt-0.5" />
            <span className="text-sm text-white/70">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={`w-full ${recommended ? '' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'}`}>
        Get Started
      </Button>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      title: "Free",
      price: "Free",
      features: [
        "Generate up to 3 ideas per month",
        "Basic idea validation",
        "Email support",
        "Limited industry categories",
        "Basic security features"
      ]
    },
    {
      title: "Standard Plan",
      price: "$9.99",
      features: [
        "Unlimited idea generation",
        "Advanced idea validation",
        "Priority email support",
        "Full industry categories",
        "Advanced security features"
      ],
      recommended: true
    },
    {
      title: "Pro Plan",
      price: "$19.99",
      features: [
        "Everything in Standard",
        "Comprehensive market analysis",
        "24/7 priority support",
        "Custom idea parameters",
        "Enhanced security features"
      ]
    }
  ];

  return (
    <Layout>
      <div className="py-28 bg-[#030303] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Pricing
            </h1>
            <p className="text-white/60">
              Choose the plan that best fits your startup ideation needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                recommended={plan.recommended}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 relative">
                  <div className="absolute inset-0 bg-idea-purple/50 rounded-full"></div>
                  <div className="absolute inset-0.5 bg-[#030303] rounded-full"></div>
                  <div className="absolute inset-1 bg-idea-purple rounded-full"></div>
                </div>
                <span className="text-sm text-white/60">Billed Yearly</span>
              </div>
              <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded">Save 20%</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
