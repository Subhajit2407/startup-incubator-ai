
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

type IdeaType = {
  name: string;
  pitch: string;
  marketValidation: string;
  mvpFeatures: string[];
  revenueModel: string;
  techStack: string[];
  aiUseCase: string;
  slogan: string;
  category: string;
};

const sampleIdeas: IdeaType[] = [
  {
    name: "HealthHub",
    pitch: "AI-powered health monitoring platform that predicts potential health issues before they become serious.",
    marketValidation: "The global digital health market is projected to reach $639.4 billion by 2026, growing at 13.4% CAGR.",
    mvpFeatures: ["Health data integration", "AI prediction engine", "Alert system", "Doctor connectivity"],
    revenueModel: "Freemium with paid premium features, B2B healthcare provider partnerships",
    techStack: ["React Native", "TensorFlow", "AWS Lambda", "MongoDB", "HealthKit API"],
    aiUseCase: "Predictive analytics for early health issue detection based on wearable data",
    slogan: "Your Health, Predicted",
    category: "HealthTech"
  },
  {
    name: "EduMentor AI",
    pitch: "Personalized education platform that adapts to each student's learning style and pace.",
    marketValidation: "The EdTech market size is expected to reach $605.4 billion by 2027, growing at 15.52% CAGR.",
    mvpFeatures: ["Learning style assessment", "Adaptive curriculum", "Progress tracking", "Parent dashboard"],
    revenueModel: "Subscription model with tiered pricing for schools and individual users",
    techStack: ["Next.js", "Python ML", "Firebase", "Node.js", "GPT-4"],
    aiUseCase: "Natural language processing to understand student responses and adapt teaching methods",
    slogan: "Education, Evolved",
    category: "EdTech"
  },
  {
    name: "GreenTrace",
    pitch: "Carbon footprint tracking app that helps businesses meet sustainability goals with actionable insights.",
    marketValidation: "The carbon footprint management market is expected to grow to $12.2 billion by 2025 with increasing regulatory pressure.",
    mvpFeatures: ["Carbon calculator", "Sustainability recommendations", "Progress reports", "Certification support"],
    revenueModel: "SaaS model with tiered pricing based on company size and features",
    techStack: ["React", "Django", "PostgreSQL", "Docker", "Carbon API"],
    aiUseCase: "Machine learning to optimize carbon reduction strategies and predict outcomes",
    slogan: "Track, Reduce, Sustain",
    category: "GreenTech"
  }
];

export default function IdeaGeneratorSection() {
  const [category, setCategory] = useState<string>("All");
  const [businessType, setBusinessType] = useState<string>("All");
  const [teamSize, setTeamSize] = useState<number[]>([3]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedIdea, setGeneratedIdea] = useState<IdeaType | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Randomly select one of the sample ideas
      const randomIdea = sampleIdeas[Math.floor(Math.random() * sampleIdeas.length)];
      setGeneratedIdea(randomIdea);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section id="generator" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-radial from-idea-purple-light/20 to-transparent opacity-60 z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">Idea Generator</h2>
          <p className="text-xl text-foreground/70 animate-fade-up animation-delay-100">
            Tell us about your interests and preferences, and our AI will generate a tailored startup idea with market validation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-idea-purple/20 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <Tabs defaultValue="generate" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="generate">Generate Idea</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="generate" className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Areas of Interest</label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Categories</SelectItem>
                          <SelectItem value="HealthTech">HealthTech</SelectItem>
                          <SelectItem value="EdTech">EdTech</SelectItem>
                          <SelectItem value="FinTech">FinTech</SelectItem>
                          <SelectItem value="GreenTech">GreenTech</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="SaaS">SaaS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Type</label>
                      <Select value={businessType} onValueChange={setBusinessType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Types</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Service">Service</SelectItem>
                          <SelectItem value="Platform">Platform</SelectItem>
                          <SelectItem value="Marketplace">Marketplace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Team Size: {teamSize[0]}</label>
                      <Slider
                        defaultValue={[3]}
                        max={10}
                        min={1}
                        step={1}
                        value={teamSize}
                        onValueChange={setTeamSize}
                        className="py-4"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleGenerate} 
                      className="w-full py-6 text-lg"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating Idea...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Sparkles size={20} />
                          Generate Business Idea
                        </span>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="results">
                  {generatedIdea ? (
                    <div className="space-y-6 animate-fade-up">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-idea-purple px-3 py-1">
                          {generatedIdea.category}
                        </Badge>
                        <h3 className="text-2xl font-bold">{generatedIdea.name}</h3>
                      </div>
                      
                      <p className="text-lg">{generatedIdea.pitch}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-idea-soft-blue rounded-xl p-4">
                          <h4 className="font-medium mb-2">Market Validation</h4>
                          <p className="text-sm">{generatedIdea.marketValidation}</p>
                        </div>
                        
                        <div className="bg-idea-soft-green rounded-xl p-4">
                          <h4 className="font-medium mb-2">Revenue Model</h4>
                          <p className="text-sm">{generatedIdea.revenueModel}</p>
                        </div>
                        
                        <div className="bg-idea-soft-yellow rounded-xl p-4">
                          <h4 className="font-medium mb-2">MVP Features</h4>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {generatedIdea.mvpFeatures.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-idea-soft-peach rounded-xl p-4">
                          <h4 className="font-medium mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {generatedIdea.techStack.map((tech, index) => (
                              <Badge key={index} variant="outline" className="bg-white/50">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-idea-soft-pink rounded-xl p-4 mt-6">
                        <h4 className="font-medium mb-2">AI Use Case</h4>
                        <p className="text-sm">{generatedIdea.aiUseCase}</p>
                      </div>
                      
                      <div className="text-center bg-idea-purple/10 rounded-xl p-6 mt-6">
                        <p className="text-xl italic font-medium">"{generatedIdea.slogan}"</p>
                      </div>
                      
                      <div className="flex justify-center mt-8">
                        <Button onClick={handleGenerate} className="px-8">
                          Generate New Idea
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-foreground/60">
                        No idea generated yet. Go to the Generate tab to create your first idea!
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
