
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Activity, Briefcase, Lightbulb, Brain, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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

// Expanded sample ideas categorized by business domain and type
const sampleIdeas: Record<string, Record<string, IdeaType[]>> = {
  "All": {
    "All": [
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
    ]
  },
  "FinTech": {
    "Platform": [
      {
        name: "SplitPay Hub",
        pitch: "Platform that enables marketplaces and service providers to seamlessly split payments among multiple stakeholders in real-time.",
        marketValidation: "With the rise of multi-vendor platforms, there's a growing need for efficient payment splitting solutions with a market size of $10.5B by 2028.",
        mvpFeatures: ["User onboarding and KYC verification", "Real-time payment splitting", "Dashboard for transaction tracking", "Integration with major payment gateways"],
        revenueModel: "Transaction fees, subscription plans for premium features, and white-label solutions for enterprise clients",
        techStack: ["React.js", "Node.js with Express", "MongoDB", "Stripe API", "TensorFlow"],
        aiUseCase: "Utilizes AI to predict transaction patterns and optimize fund distribution among stakeholders",
        slogan: "Empowering seamless financial collaboration",
        category: "FinTech"
      },
      {
        name: "CryptoLend",
        pitch: "Decentralized lending platform connecting crypto holders with borrowers through smart contracts and competitive interest rates.",
        marketValidation: "DeFi lending market has grown to over $20 billion in total value locked (TVL) with continued adoption from traditional finance.",
        mvpFeatures: ["Wallet integration", "Smart contract lending pools", "Interest rate calculator", "Risk assessment tools"],
        revenueModel: "Service fees on loans, premium risk analytics, institutional partnerships",
        techStack: ["Solidity", "React", "Node.js", "The Graph", "ChainLink"],
        aiUseCase: "AI risk assessment models to determine optimal loan terms and minimize defaults",
        slogan: "Unlock the Value of Your Digital Assets",
        category: "FinTech"
      }
    ],
    "Service": [
      {
        name: "TaxSmart AI",
        pitch: "AI-powered tax planning service that continuously monitors financial activity to maximize tax efficiency for freelancers and small businesses.",
        marketValidation: "The global tax management software market is expected to reach $11.19 billion by 2027, growing at 10.4% CAGR.",
        mvpFeatures: ["Financial account integration", "Real-time tax estimation", "Deduction finder", "Custom tax calendar"],
        revenueModel: "Monthly subscription, premium consultations, enterprise plans for accountants",
        techStack: ["Python", "TensorFlow", "React", "AWS", "Plaid API"],
        aiUseCase: "Machine learning to identify tax-saving opportunities based on spending patterns and business activities",
        slogan: "Never Overpay Taxes Again",
        category: "FinTech"
      }
    ],
    "Product": [
      {
        name: "BudgetBuddy",
        pitch: "AI financial assistant that gamifies saving and helps users achieve financial goals through personalized challenges.",
        marketValidation: "Personal finance app market is growing at 15% annually, with increased demand for engaging, gamified experiences.",
        mvpFeatures: ["Bank account integration", "Personalized saving challenges", "Achievement system", "Financial coaching"],
        revenueModel: "Freemium model with premium features, financial partner referrals",
        techStack: ["Flutter", "Firebase", "Node.js", "MongoDB", "Plaid API"],
        aiUseCase: "Using AI to create personalized saving challenges based on spending patterns and income predictability",
        slogan: "Making Saving Fun",
        category: "FinTech"
      }
    ]
  },
  "HealthTech": {
    "Platform": [
      {
        name: "MediMatch",
        pitch: "Platform connecting patients with the right specialists based on symptoms, medical history, and doctor expertise.",
        marketValidation: "The healthcare IT market size is estimated to reach $390.7 billion by 2024, growing at a CAGR of 15.8%.",
        mvpFeatures: ["Symptom analysis", "Doctor matching algorithm", "Video consultations", "Medical record sharing"],
        revenueModel: "Commission from providers, premium subscription for priority matching and features",
        techStack: ["React Native", "Node.js", "AWS", "MongoDB", "FHIR API"],
        aiUseCase: "Natural language processing to analyze symptoms and match with appropriate medical specialists",
        slogan: "The Right Doctor, Right Away",
        category: "HealthTech"
      }
    ],
    "All": [
      {
        name: "SleepSync",
        pitch: "Advanced sleep tracking and optimization system using non-invasive sensors to improve sleep quality and overall health.",
        marketValidation: "The sleep tech devices market is expected to reach $27 billion by 2025, growing at 15.7% CAGR.",
        mvpFeatures: ["Sleep pattern analysis", "Environmental optimization", "Personalized recommendations", "Health data integration"],
        revenueModel: "Hardware sales, premium subscription for advanced insights and coaching",
        techStack: ["Embedded systems", "Flutter", "Python ML", "AWS IoT", "HealthKit"],
        aiUseCase: "AI algorithms identify optimal sleep conditions based on user data and environmental factors",
        slogan: "Sleep Better, Live Better",
        category: "HealthTech"
      }
    ]
  },
  "EdTech": {
    "All": [
      {
        name: "SkillForge",
        pitch: "Adaptive learning platform that creates personalized curriculum paths based on career goals and learning pace.",
        marketValidation: "The professional development market size is projected to reach $455.5 billion by 2026, growing at 9.2% CAGR.",
        mvpFeatures: ["Skill assessment", "Career path mapping", "Custom curriculum generator", "Progress tracking"],
        revenueModel: "B2C subscription, B2B enterprise licensing for companies, content partnerships",
        techStack: ["Next.js", "GraphQL", "Python AI", "PostgreSQL", "LMS API integration"],
        aiUseCase: "Machine learning to assess skill gaps and design optimal learning pathways for career transitions",
        slogan: "Your Path, Your Pace",
        category: "EdTech"
      }
    ]
  },
  "GreenTech": {
    "All": [
      {
        name: "EcoChain",
        pitch: "Blockchain-based supply chain platform enabling businesses to verify and showcase their sustainability practices.",
        marketValidation: "The green technology market is expected to reach $51.09 billion by 2029, growing at 20.3% CAGR.",
        mvpFeatures: ["Supply chain tracking", "Carbon footprint calculator", "Sustainability certificates", "Consumer facing transparency portal"],
        revenueModel: "SaaS subscription for businesses, certification services, data analytics packages",
        techStack: ["Solidity", "React", "Node.js", "MongoDB", "IoT sensors"],
        aiUseCase: "AI to analyze supply chain data and identify opportunities for reducing environmental impact",
        slogan: "Verifiable Sustainability for the Modern Business",
        category: "GreenTech"
      }
    ]
  }
};

export default function IdeaGeneratorSection() {
  const [category, setCategory] = useState<string>("All");
  const [businessType, setBusinessType] = useState<string>("All");
  const [teamSize, setTeamSize] = useState<number[]>([3]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedIdea, setGeneratedIdea] = useState<IdeaType | null>(null);
  const [activeTab, setActiveTab] = useState<string>("generate");

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Try to get ideas matching both category and business type
      let ideas = sampleIdeas[category]?.[businessType];
      
      // If no exact match, try to get ideas for the category with "All" business type
      if (!ideas || ideas.length === 0) {
        ideas = sampleIdeas[category]?.["All"];
      }
      
      // If still no match, fall back to general ideas
      if (!ideas || ideas.length === 0) {
        ideas = sampleIdeas["All"]["All"];
      }
      
      // Select a random idea from the available ones
      const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
      
      // Adjust the idea based on team size
      const customizedIdea = { 
        ...randomIdea,
        // Adjust pitch based on team size - larger teams can handle more complex ideas
        pitch: teamSize[0] > 5 
          ? `${randomIdea.pitch} Ideal for teams with diverse expertise.` 
          : randomIdea.pitch,
      };
      
      setGeneratedIdea(customizedIdea);
      setIsGenerating(false);
      setActiveTab("results");
    }, 2000);
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      id="generator" 
      className="relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="border-idea-purple/20 shadow-xl bg-black/40 backdrop-blur-md border border-white/10">
          <CardContent className="p-6 md:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/60 border border-white/10">
                <TabsTrigger 
                  value="generate" 
                  className="data-[state=active]:bg-idea-purple/20 data-[state=active]:text-white"
                >
                  Generate Idea
                </TabsTrigger>
                <TabsTrigger 
                  value="results" 
                  className="data-[state=active]:bg-idea-purple/20 data-[state=active]:text-white"
                >
                  Results
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="generate" className="space-y-8">
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium mb-2 text-white/80">Areas of Interest</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full bg-black/60 border-white/10">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="FinTech">FinTech</SelectItem>
                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                        <SelectItem value="EdTech">EdTech</SelectItem>
                        <SelectItem value="GreenTech">GreenTech</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="SaaS">SaaS</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium mb-2 text-white/80">Business Type</label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger className="w-full bg-black/60 border-white/10">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                        <SelectItem value="Platform">Platform</SelectItem>
                        <SelectItem value="Marketplace">Marketplace</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium mb-2 text-white/80">Team Size: {teamSize[0]}</label>
                    <Slider
                      defaultValue={[3]}
                      max={10}
                      min={1}
                      step={1}
                      value={teamSize}
                      onValueChange={setTeamSize}
                      className="py-4"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handleGenerate} 
                      className="w-full py-6 text-lg bg-gradient-to-r from-idea-purple to-violet-500 hover:from-idea-purple hover:to-violet-600 border-none shadow-lg shadow-idea-purple/20"
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
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="results">
                {generatedIdea ? (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center gap-3">
                      <Badge className="bg-idea-purple text-white px-3 py-1">
                        {generatedIdea.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white">{generatedIdea.name}</h3>
                    </div>
                    
                    <p className="text-lg text-white/80">{generatedIdea.pitch}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-black/40 backdrop-blur-md border border-idea-purple/20 rounded-xl p-5 hover:border-idea-purple/40 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Activity size={18} className="text-idea-purple" />
                          <h4 className="font-medium text-white">Market Validation</h4>
                        </div>
                        <p className="text-sm text-white/70">{generatedIdea.marketValidation}</p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-black/40 backdrop-blur-md border border-idea-purple/20 rounded-xl p-5 hover:border-idea-purple/40 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase size={18} className="text-idea-purple" />
                          <h4 className="font-medium text-white">Revenue Model</h4>
                        </div>
                        <p className="text-sm text-white/70">{generatedIdea.revenueModel}</p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 backdrop-blur-md border border-idea-purple/20 rounded-xl p-5 hover:border-idea-purple/40 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb size={18} className="text-idea-purple" />
                          <h4 className="font-medium text-white">MVP Features</h4>
                        </div>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-white/70">
                          {generatedIdea.mvpFeatures.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-black/40 backdrop-blur-md border border-idea-purple/20 rounded-xl p-5 hover:border-idea-purple/40 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Zap size={18} className="text-idea-purple" />
                          <h4 className="font-medium text-white">Tech Stack</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {generatedIdea.techStack.map((tech, index) => (
                            <Badge key={index} variant="outline" className="bg-black/60 border-white/10 text-white/70">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-black/40 backdrop-blur-md border border-idea-purple/20 rounded-xl p-5 mt-6 hover:border-idea-purple/40 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Brain size={18} className="text-idea-purple" />
                        <h4 className="font-medium text-white">AI Use Case</h4>
                      </div>
                      <p className="text-sm text-white/70">{generatedIdea.aiUseCase}</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center bg-gradient-to-r from-idea-purple/10 to-violet-500/10 rounded-xl p-6 mt-6"
                    >
                      <p className="text-xl italic font-medium text-white">"{generatedIdea.slogan}"</p>
                    </motion.div>
                    
                    <div className="flex justify-center gap-4 mt-8">
                      <Button
                        onClick={handleGenerate}
                        className="px-6 bg-gradient-to-r from-idea-purple to-violet-500 hover:from-idea-purple hover:to-violet-600 border-none shadow-lg shadow-idea-purple/20"
                      >
                        Generate New Idea
                      </Button>
                      
                      <Button variant="outline" className="px-6 border-white/10 bg-black/40 text-white hover:bg-white/5">
                        <span className="flex items-center gap-2">
                          Create Sitemap <ChevronRight size={16} />
                        </span>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-white/60">
                      No idea generated yet. Go to the Generate tab to create your first idea!
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
