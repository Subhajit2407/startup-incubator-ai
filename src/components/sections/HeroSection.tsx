
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <section className="relative pt-28 md:pt-36 lg:pt-40 pb-20 overflow-hidden bg-hero-pattern">
      <div className="absolute inset-0 bg-dot-pattern opacity-40 z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-idea-purple to-violet-500 animate-fade-up">
            Your Next Big Startup Idea, Powered by AI
          </h1>
          <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up animation-delay-200">
            Discover and validate startup ideas based on real-time market trends, tech shifts, and consumer needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <Button onClick={scrollToGenerator} size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Generate a Business Idea
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-24 bottom-0"></div>
          <div className="bg-idea-purple-light/30 border border-idea-purple-light rounded-2xl p-6 max-w-4xl mx-auto shadow-xl backdrop-blur-sm relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="text-sm text-foreground/60 ml-2">AI Idea Generator</div>
            </div>
            
            <div className="space-y-2 font-mono text-sm text-foreground/70">
              <div className="animate-pulse-subtle">{"> Analyzing market trends..."}</div>
              <div className="animate-pulse-subtle animation-delay-200">{"> Identifying high-growth sectors..."}</div>
              <div className="animate-pulse-subtle animation-delay-300">{"> Matching with founder profiles..."}</div>
              <div className="animate-pulse-subtle animation-delay-400">{"> Validating market potential..."}</div>
              <div className="animate-pulse-subtle animation-delay-500 text-idea-purple font-semibold">{"> Ready to generate your next big idea!"}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
        <svg className="relative block w-full" style={{height: "60px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440 100 L0,100 Z" fill="currentColor" className="text-background"></path>
        </svg>
      </div>
    </section>
  );
}
