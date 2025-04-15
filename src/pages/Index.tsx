
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeaturesSection from "@/components/sections/FeaturesSection";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const HeroCodeSnippet = () => {
  return (
    <div className="relative max-w-md mx-auto mt-8">
      <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="text-sm text-white/60 ml-2">AI Idea Generator</div>
        </div>
        
        <div className="space-y-2 font-mono text-sm text-white/70">
          <div className="animate-pulse-subtle">{"> Analyzing market trends..."}</div>
          <div className="animate-pulse-subtle animation-delay-200">{"> Identifying high-growth sectors..."}</div>
          <div className="animate-pulse-subtle animation-delay-300">{"> Matching with founder profiles..."}</div>
          <div className="animate-pulse-subtle animation-delay-400">{"> Validating market potential..."}</div>
          <div className="animate-pulse-subtle animation-delay-500 text-idea-purple font-semibold">{"> Ready to generate your next big idea!"}</div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <HeroGeometric
        badge="AI-Powered"
        title1="Your Next Big"
        title2="Startup Idea"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg shadow-idea-purple/20 hover:shadow-idea-purple/40 transition-all" asChild>
            <Link to="/generator" className="flex items-center gap-2">
              Generate a Business Idea <ArrowRight size={18} />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white">
            Learn More
          </Button>
        </div>
        
        <HeroCodeSnippet />
      </HeroGeometric>
      
      <FeaturesSection />
    </Layout>
  );
};

export default Index;
