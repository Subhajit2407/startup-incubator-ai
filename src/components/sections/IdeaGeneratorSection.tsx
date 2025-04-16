import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Activity, Briefcase, Lightbulb, Brain, ChevronRight, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

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
  businessModel: string;
  targetMarket: string;
  initialInvestment: string;
  complexity: string;
  geographicFocus: string;
  businessType: "physical" | "online" | "hybrid";
  timeToMarket: string;
  scalabilityPotential: string;
  competitiveLandscape: string;
  subcategory?: string;
  originalCategory?: string;
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
        category: "HealthTech",
        subcategory: "Remote Patient Monitoring",
        businessModel: "SaaS",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "EdTech",
        subcategory: "Personalized Learning",
        businessModel: "Subscription",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "GreenTech",
        subcategory: "Carbon Tracking",
        businessModel: "SaaS",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "FinTech",
        subcategory: "Payments",
        businessModel: "Transaction-based",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "FinTech",
        subcategory: "Crypto",
        businessModel: "Lending",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "FinTech",
        subcategory: "Financial Planning",
        businessModel: "Subscription",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "FinTech",
        businessModel: "Freemium",
        targetMarket: "Global",
        initialInvestment: "Bootstrap ($0-$25k)",
        complexity: "Basic - MVP in 2-3 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "6 months",
        scalabilityPotential: "Moderate",
        competitiveLandscape: "Strong"
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
        category: "HealthTech",
        businessModel: "SaaS",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "HealthTech",
        businessModel: "Hardware + Software",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "EdTech",
        businessModel: "Subscription",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
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
        category: "GreenTech",
        businessModel: "SaaS",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
      }
    ]
  },
  "AI/ML": {
    "AI Infrastructure": [
      {
        name: "ScaleMatrix",
        pitch: "On-demand AI compute infrastructure marketplace connecting businesses with unused GPU/TPU capacity at lower costs than major cloud providers.",
        marketValidation: "The AI infrastructure market is projected to reach $94.5 billion by 2025, growing at 39.7% CAGR with compute being a major bottleneck.",
        mvpFeatures: ["Compute capacity marketplace", "Auto-scaling capabilities", "Cost optimization engine", "Security compliance framework"],
        revenueModel: "Usage-based fees and commission from compute providers with premium enterprise plans",
        techStack: ["Kubernetes", "Terraform", "Go", "React", "Prometheus"],
        aiUseCase: "AI-powered matching algorithm to allocate workloads to optimal compute resources for price and performance",
        slogan: "Democratizing AI Compute",
        category: "AI/ML",
        businessModel: "Marketplace - Commission",
        targetMarket: "Global",
        initialInvestment: "Series A ($500k-$2M)",
        complexity: "Complex - MVP in 6-12 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Moderate"
      },
      {
        name: "NeuralCache",
        pitch: "AI model deployment platform that optimizes inference speed and cost through innovative caching and distribution technologies.",
        marketValidation: "The AI model serving market is expected to grow to $35 billion by 2026 as companies face high costs for real-time inference.",
        mvpFeatures: ["Automated model compression", "Edge-cloud hybrid deployment", "Predictive caching system", "Performance analytics dashboard"],
        revenueModel: "SaaS tiered pricing based on inference volume and latency requirements",
        techStack: ["PyTorch", "ONNX", "TensorRT", "FastAPI", "Redis"],
        aiUseCase: "Self-optimizing system that learns usage patterns to pre-cache models and minimize inference latency",
        slogan: "Lightning-Fast AI, Anywhere",
        category: "AI/ML",
        businessModel: "SaaS - Usage Based",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "6 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Moderate"
      },
      {
        name: "DataFoundry",
        pitch: "End-to-end data infrastructure platform for AI training that automates collection, labeling, augmentation, and versioning.",
        marketValidation: "Data preparation accounts for 80% of AI project time with the AI data services market worth $13.2 billion by 2026.",
        mvpFeatures: ["Automated data labeling", "Synthetic data generation", "Data quality monitoring", "Feature store integration"],
        revenueModel: "Tiered subscription based on data volume and processing needs with enterprise options",
        techStack: ["Python", "Apache Beam", "MLflow", "React", "PostgreSQL"],
        aiUseCase: "AI systems that learn to generate high-quality labeled data through active learning techniques",
        slogan: "Better Data, Better AI",
        category: "AI/ML",
        businessModel: "SaaS - Tiered Plans",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "9 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
      },
      {
        name: "EdgeCompute",
        category: "AI/ML",
        subcategory: "AI Infrastructure",
        pitch: "A distributed edge computing platform that brings AI processing closer to IoT devices, reducing latency and bandwidth usage while enhancing privacy.",
        marketValidation: "The edge AI computing market is projected to grow at 15% CAGR through 2030 as smart devices proliferate and real-time processing demands increase.",
        mvpFeatures: ["Edge node deployment system", "workload distribution manager", "device syncing protocol", "power optimization algorithms"],
        revenueModel: "Tiered subscription based on computing nodes and data processed with enterprise licensing options.",
        techStack: ["Rust", "WebAssembly", "TensorRT", "Kubernetes", "MQTT"],
        aiUseCase: "Distributing and optimizing AI workloads across edge devices while maintaining model accuracy and performance.",
        slogan: "Intelligence at the Edge, Results in Real-time",
        businessModel: "SaaS",
        targetMarket: "IoT manufacturers, smart city initiatives, autonomous vehicle companies, and retail analytics providers.",
        initialInvestment: "Medium",
        complexity: "High",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "9-12 months",
        scalabilityPotential: "Very high due to the growing number of edge devices",
        competitiveLandscape: "Emerging market with several startups and tech giants investing heavily in edge AI capabilities."
      },
      {
        name: "ModelMesh",
        category: "AI/ML",
        subcategory: "AI Infrastructure",
        pitch: "A multi-model AI serving platform that dynamically allocates computing resources based on demand patterns, ensuring optimal utilization and cost efficiency.",
        marketValidation: "Organizations deploying multiple AI models face operational inefficiencies with static resource allocation, with studies showing up to 40% wasted GPU capacity.",
        mvpFeatures: ["Model registry", "dynamic scaling", "resource allocation optimizer", "load balancing", "performance monitoring dashboard"],
        revenueModel: "Usage-based pricing with minimum commitments and enterprise packages.",
        techStack: ["Go", "Python", "KServe", "Ray", "Prometheus"],
        aiUseCase: "Intelligent allocation of computing resources across multiple AI models based on usage patterns and priorities.",
        slogan: "One Platform, Infinite Models",
        businessModel: "SaaS",
        targetMarket: "ML-driven enterprises, research institutions, and AI-as-a-service providers.",
        initialInvestment: "Medium-High",
        complexity: "High",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "8-10 months",
        scalabilityPotential: "High with the growing adoption of multi-model AI architectures",
        competitiveLandscape: "Specialized market with few established players but growing interest from cloud providers."
      },
      {
        name: "DataForge",
        category: "AI/ML",
        subcategory: "AI Infrastructure",
        pitch: "An end-to-end data pipeline platform designed specifically for AI training data, handling collection, cleaning, augmentation, and versioning with automated quality checks.",
        marketValidation: "Data preparation consumes up to 80% of ML engineers' time, with poor data quality being the primary reason for AI project failures.",
        mvpFeatures: ["Data connectors", "quality assessment tools", "automated labeling workflows", "data versioning", "augmentation toolkit"],
        revenueModel: "Tiered subscription based on data volume and processing requirements.",
        techStack: ["Python", "Apache Airflow", "Dask", "MLflow", "FastAPI"],
        aiUseCase: "Using AI to improve data quality for other AI systems, creating a virtuous cycle of improvement.",
        slogan: "Better Data, Smarter AI",
        businessModel: "SaaS",
        targetMarket: "AI development teams, data science organizations, and enterprises building custom AI solutions.",
        initialInvestment: "Medium",
        complexity: "Medium-High",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "6-8 months",
        scalabilityPotential: "Very high as AI adoption continues to accelerate",
        competitiveLandscape: "Fragmented market with specialized tools but few comprehensive solutions."
      },
      {
        name: "InferenceHub",
        category: "AI/ML",
        subcategory: "AI Infrastructure",
        pitch: "A unified inference platform that optimizes and standardizes AI model deployment across cloud, edge, and on-premise environments.",
        marketValidation: "The AI inference market is projected to reach $42 billion by 2027, growing at 38% CAGR as companies struggle with deployment complexity.",
        mvpFeatures: ["Single-API model deployment", "hardware optimization layer", "performance monitoring", "cost analytics", "automated scaling"],
        revenueModel: "Usage-based pricing with enterprise plans for high-volume customers.",
        techStack: ["TensorRT", "ONNX", "Rust", "Kubernetes", "gRPC"],
        aiUseCase: "Intelligent optimization of models for specific hardware targets while maintaining accuracy benchmarks.",
        slogan: "Deploy Once, Run Anywhere",
        businessModel: "SaaS",
        targetMarket: "ML engineering teams, AI-focused enterprises, and hardware manufacturers.",
        initialInvestment: "Medium-High",
        complexity: "High",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "9-12 months",
        scalabilityPotential: "Very high as AI adoption expands across industries",
        competitiveLandscape: "Emerging market with growing competition from cloud providers and startups."
      },
      {
        name: "AIGuardian",
        category: "AI/ML",
        subcategory: "AI Infrastructure",
        pitch: "A comprehensive AI security platform that protects machine learning models and infrastructure from adversarial attacks, data poisoning, and unauthorized access.",
        marketValidation: "AI security breaches are expected to cost companies over $15 billion by 2025, with 60% of enterprises reporting security concerns as a major AI adoption barrier.",
        mvpFeatures: ["Model vulnerability scanning", "adversarial attack detection", "input validation", "model access control", "security compliance dashboard"],
        revenueModel: "Annual subscription with tiered pricing based on model count and security features.",
        techStack: ["Python", "PyTorch", "Tensorflow", "Kubernetes", "Zero Trust Architecture"],
        aiUseCase: "Using AI to detect and prevent attacks on other AI systems through continuous learning of new threat vectors.",
        slogan: "Secure Models, Trusted AI",
        businessModel: "SaaS",
        targetMarket: "Financial services, healthcare organizations, government agencies, and large enterprises using AI for critical applications.",
        initialInvestment: "Medium",
        complexity: "High",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "9-12 months",
        scalabilityPotential: "High as AI security becomes a regulatory requirement",
        competitiveLandscape: "Early market with few specialized solutions and growing demand."
      },
      {
        name: "QuantumML",
        category: "AI/ML",
        subcategory: "AI Infrastructure",
        pitch: "A hybrid quantum-classical computing platform that accelerates specific AI workloads using quantum algorithms running on today's NISQ devices.",
        marketValidation: "The quantum AI market is projected to reach $1.5 billion by 2028 with early applications showing 10-100x speedups for specific ML tasks.",
        mvpFeatures: ["Quantum algorithm library", "hybrid workflow orchestration", "problem decomposition engine", "results verification", "quantum resource optimization"],
        revenueModel: "Pay-per-quantum-usage with consulting services for algorithm development.",
        techStack: ["Qiskit", "Pennylane", "Python", "Julia", "Cloud APIs"],
        aiUseCase: "Quantum-enhanced machine learning for optimization problems, simulation, and specific pattern recognition tasks beyond classical capabilities.",
        slogan: "Tomorrow's Computing Power, Today's AI Problems",
        businessModel: "SaaS",
        targetMarket: "Research institutions, pharmaceutical companies, financial services firms, and AI research labs.",
        initialInvestment: "High",
        complexity: "Very High",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12-18 months",
        scalabilityPotential: "Moderate initially but explosive as quantum hardware improves",
        competitiveLandscape: "Nascent market with high barriers to entry and significant potential."
      }
    ],
    "Generative AI": [
      {
        name: "CreativeForge AI",
        pitch: "Enterprise-grade generative AI platform that allows companies to build and deploy custom multimodal generative models using their proprietary data.",
        marketValidation: "The generative AI market is projected to grow from $11.3 billion in 2023 to $200.7 billion by 2030, at a CAGR of 42.1%.",
        mvpFeatures: ["Custom model fine-tuning", "Content moderation systems", "Multimodal generation capabilities", "Enterprise integration APIs"],
        revenueModel: "Enterprise licensing with usage-based pricing tiers and professional services for implementation",
        techStack: ["PyTorch", "JAX", "TypeScript", "FastAPI", "Docker"],
        aiUseCase: "Meta-learning systems to efficiently fine-tune models on smaller datasets while maintaining quality and safety",
        slogan: "Your Data, Your AI",
        category: "AI/ML",
        businessModel: "SaaS - Tiered Plans",
        targetMarket: "Global",
        initialInvestment: "Series A ($500k-$2M)",
        complexity: "Complex - MVP in 6-12 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "12 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Strong"
      }
    ]
  },
  "Entertainment": {
    "Gaming": [
      {
        name: "GameMatch",
        pitch: "AI-powered social platform that matches gamers based on playing style, skill level, and personality compatibility.",
        marketValidation: "The gaming matchmaking market is expected to reach $2.8 billion by 2025, with over 2.7 billion gamers worldwide seeking better social experiences.",
        mvpFeatures: ["AI matchmaking algorithm", "Game integration API", "Social profiles", "Team formation", "Tournament organization"],
        revenueModel: "Freemium model with premium matchmaking features and promotional partnerships with game publishers",
        techStack: ["React Native", "Node.js", "MongoDB", "TensorFlow", "WebRTC"],
        aiUseCase: "Machine learning for optimized player matching based on gameplay data and social interaction patterns",
        slogan: "Play Better Together",
        category: "Entertainment",
        businessModel: "Freemium",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "8 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Moderate"
      },
      {
        name: "VirtualStage",
        pitch: "Platform for creating and monetizing interactive virtual concerts and performances with real-time audience engagement.",
        marketValidation: "The virtual events market is projected to grow at 24% CAGR, reaching $774 billion by 2030, with music and entertainment leading adoption.",
        mvpFeatures: ["3D performance space", "Avatar customization", "Audience interaction tools", "Monetization options", "Analytics dashboard"],
        revenueModel: "Revenue sharing with creators, ticket sales, and virtual merchandise",
        techStack: ["Unity", "WebGL", "Node.js", "AWS Media Services", "WebRTC"],
        aiUseCase: "AI-enhanced crowd simulation and personalized audience experiences based on user preferences",
        slogan: "The Stage Without Limits",
        category: "Entertainment",
        businessModel: "Marketplace - Commission",
        targetMarket: "Global",
        initialInvestment: "Series A ($500k-$2M)",
        complexity: "Complex - MVP in 6-12 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "10 months",
        scalabilityPotential: "Very High",
        competitiveLandscape: "Emerging"
      }
    ],
    "Streaming": [
      {
        name: "NicheStream",
        pitch: "Specialized streaming platform that curates and delivers content for underserved interest communities with interactive viewing features.",
        marketValidation: "Niche streaming services are growing at 18% annually, with specialized content platforms achieving 3x higher retention rates than general platforms.",
        mvpFeatures: ["Curated content libraries", "Community features", "Creator partnerships", "Adaptive streaming", "Interactive viewing"],
        revenueModel: "Subscription model with tiered access and targeted advertising partnerships",
        techStack: ["React", "AWS Elemental", "Redis", "PostgreSQL", "Recommendation Engine"],
        aiUseCase: "Content recommendation and discovery algorithms specialized for niche interest prediction",
        slogan: "Content for Your Passion",
        category: "Entertainment",
        businessModel: "Subscription",
        targetMarket: "Global",
        initialInvestment: "Angel ($100k-$500k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "6 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Moderate"
      }
    ],
    "AR/VR": [
      {
        name: "ImmerseTour",
        pitch: "VR platform allowing users to create, share and experience interactive virtual tours of real-world locations with spatial audio and historical context.",
        marketValidation: "The VR tourism market is projected to reach $15 billion by 2030, with 64% of consumers more likely to visit destinations after virtual experiences.",
        mvpFeatures: ["VR environment creation tools", "Spatial audio", "Historical overlay", "Social sharing", "Monetization for creators"],
        revenueModel: "Marketplace model with commission on paid tours and premium creation tools",
        techStack: ["Unity", "WebXR", "Three.js", "Spatial Audio SDK", "Cloud Storage"],
        aiUseCase: "AI-powered scene recognition and automatic 3D reconstruction from 2D photos and videos",
        slogan: "Travel Without Borders",
        category: "Entertainment",
        businessModel: "Marketplace - Commission",
        targetMarket: "Global",
        initialInvestment: "Angel ($100k-$500k)",
        complexity: "Complex - MVP in 6-12 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "9 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Emerging"
      }
    ],
    "Creator Economy": [
      {
        name: "CreatorMint",
        pitch: "Platform that helps content creators turn their digital expertise into monetizable online courses with AI-assisted content creation.",
        marketValidation: "The creator economy is valued at $104 billion with course creation growing at 29% annually and creators seeking diversified revenue streams.",
        mvpFeatures: ["AI content assistant", "Course builder", "Marketing toolkit", "Payment processing", "Analytics dashboard"],
        revenueModel: "Revenue sharing model with creators and premium tools subscription",
        techStack: ["Next.js", "GPT-4", "Stripe Connect", "AWS", "Firebase"],
        aiUseCase: "AI-powered content generation, structure optimization, and personalized learning path creation",
        slogan: "Your Knowledge, Your Business",
        category: "Entertainment",
        businessModel: "SaaS - Revenue Sharing",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "6 months",
        scalabilityPotential: "High",
        competitiveLandscape: "Competitive"
      }
    ],
    "Social Media": [
      {
        name: "MoodShare",
        pitch: "Emotion-based social platform that connects users through shared feelings and experiences rather than social graphs or content.",
        marketValidation: "Over 70% of Gen Z users seek more authentic social connections, with emotional wellbeing apps growing at 25% CAGR.",
        mvpFeatures: ["Emotion tracking", "Mood-based matching", "Anonymous sharing", "Community circles", "Wellbeing tools"],
        revenueModel: "Freemium model with premium features and partnerships with mental health services",
        techStack: ["React Native", "Express.js", "MongoDB", "Sentiment Analysis API", "WebSockets"],
        aiUseCase: "AI sentiment analysis to understand emotional content and create meaningful connections",
        slogan: "Connect Through Feeling",
        category: "Entertainment",
        businessModel: "Freemium",
        targetMarket: "Global",
        initialInvestment: "Seed ($25k-$100k)",
        complexity: "Moderate - MVP in 4-6 months",
        geographicFocus: "Global",
        businessType: "online",
        timeToMarket: "6 months",
        scalabilityPotential: "Very High",
        competitiveLandscape: "Emerging"
      }
    ]
  }
};

// Extended categories with more options
const categories = {
  "FinTech": ["Digital Banking", "Investment", "Insurance", "Payments", "Lending", "Crypto", "WealthTech", "RegTech", "DeFi", "InsurTech", "Open Banking", "Financial Inclusion"],
  "HealthTech": ["Telemedicine", "Mental Health", "Fitness", "Medical Devices", "Healthcare AI", "Biotech", "Digital Therapeutics", "Remote Patient Monitoring", "Health Analytics", "Personalized Medicine"],
  "EdTech": ["K-12", "Higher Education", "Professional Training", "Language Learning", "Tutoring", "Educational Games", "Corporate Training", "STEM Education", "Early Childhood", "Special Education"],
  "E-commerce": ["D2C", "Marketplace", "Subscription Box", "Social Commerce", "Retail Tech", "Mobile Commerce", "Live Shopping", "Resale/Second-hand", "Cross-border Commerce"],
  "SaaS": ["Business Tools", "Productivity", "Communication", "Analytics", "Security", "CRM", "HR Tech", "Project Management", "Cloud Infrastructure", "API Services"],
  "AI/ML": ["Computer Vision", "NLP", "Robotics", "Data Analytics", "AutoML", "Generative AI", "Edge AI", "AI Infrastructure", "AI Ethics & Governance", "Industry-specific AI"],
  "GreenTech": ["Clean Energy", "Sustainability", "Waste Management", "Carbon Tracking", "Green Transport", "Climate Tech", "Circular Economy", "Water Tech", "Green Building"],
  "IoT": ["Smart Home", "Industrial IoT", "Wearables", "Smart Cities", "Agriculture", "Supply Chain", "Healthcare IoT", "Energy Management", "Smart Retail"],
  "Entertainment": ["Gaming", "Streaming", "Virtual Events", "AR/VR", "Social Media", "Creator Economy", "eSports", "Digital Media", "Interactive Entertainment"],
  "FoodTech": ["Delivery", "Cloud Kitchen", "Food Science", "AgriTech", "Restaurant Tech", "Alternative Protein", "Food Waste", "Personalized Nutrition"],
  "Web3": ["DeFi", "NFTs", "DAOs", "Blockchain Gaming", "Metaverse", "Web3 Infrastructure", "Crypto Payments", "Digital Identity"],
  "SpaceTech": ["Satellite Tech", "Space Tourism", "Space Manufacturing", "Earth Observation", "Space Infrastructure"],
  "DeepTech": ["Quantum Computing", "Nanotech", "Advanced Materials", "Fusion Energy", "Brain-Computer Interface"]
};

const businessModels = [
  "SaaS - Subscription",
  "SaaS - Usage Based",
  "SaaS - Tiered Plans",
  "Marketplace - Commission",
  "Marketplace - Subscription",
  "Marketplace - Hybrid",
  "Freemium",
  "Premium",
  "Transaction Fee",
  "Advertising",
  "Data Monetization",
  "Hardware + Software",
  "Consulting + Platform",
  "API as a Service",
  "White Label",
  "Franchise",
  "Licensing",
  "Pay-Per-Use",
  "Revenue Sharing",
  "Subscription Box",
  "Membership",
  "Usage-Based",
  "Outcome-Based",
  "Decentralized/Token"
];

const geographicFocuses = [
  "Global",
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
  "Local/City-specific"
];

const complexityLevels = [
  "Basic - MVP in 2-3 months",
  "Moderate - MVP in 4-6 months",
  "Complex - MVP in 6-12 months",
  "Very Complex - MVP in 12+ months"
];

const investmentRanges = [
  "Bootstrap ($0-$25k)",
  "Seed ($25k-$100k)",
  "Angel ($100k-$500k)",
  "Series A ($500k-$2M)",
  "Series B+ ($2M+)"
];

interface IdeaGeneratorSectionProps {
  onNavigateToSitemap: (prompt: string) => void;
}

// Mock function to simulate API call for idea generation
async function fetchRelevantIdeasFromWeb(category: string, subcategory: string, businessType: string): Promise<any> {
  console.log(`Fetching ideas for ${category}/${subcategory} (${businessType})`);
  // In a real implementation, this would be an actual API call to a service like OpenAI
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Ideas fetched successfully"
      });
    }, 1500);
  });
}

// Function to simulate fetching market trends from the web
const fetchMarketTrends = async (category: string, subcategory: string): Promise<string> => {
  console.log(`Fetching market trends for ${category}/${subcategory}`);
  
  // This would be replaced with an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      
      const trendsByCategory: Record<string, string> = {
        "FinTech": `The global FinTech market is projected to reach $190 billion by ${nextYear}, growing at 13.7% CAGR with ${subcategory !== "All" ? subcategory + " leading innovation" : "digital payments dominating growth"}.`,
        "HealthTech": `HealthTech investments are expected to reach $280 billion by ${nextYear}, with ${subcategory !== "All" ? subcategory + " solutions" : "telehealth platforms"} seeing accelerated adoption post-pandemic.`,
        "EdTech": `The EdTech sector is forecasted to grow to $404 billion by ${nextYear}, with ${subcategory !== "All" ? subcategory + " technologies" : "AI-powered personalized learning"} transforming education globally.`,
        "AI/ML": `The artificial intelligence market size is expected to reach $407 billion by ${nextYear}, with ${subcategory !== "All" ? subcategory + " applications" : "generative AI solutions"} creating new opportunities across industries.`,
        "GreenTech": `Sustainable technology investments are projected to reach $74 billion by ${nextYear}, with ${subcategory !== "All" ? subcategory + " innovations" : "carbon tracking technologies"} becoming essential for corporate ESG compliance.`,
        "Web3": `The Web3 ecosystem is expected to grow to $81.5 billion by ${nextYear}, with ${subcategory !== "All" ? subcategory + " projects" : "decentralized applications"} gaining mainstream adoption.`,
      };
      
      // Default market validation if category not found
      const defaultValidation = `The global tech startup market is expected to reach $3.5 trillion by ${nextYear}, with innovative solutions in ${category !== "All" ? category : "emerging technology sectors"} showing strong growth potential.`;
      
      resolve(trendsByCategory[category] || defaultValidation);
    }, 1000);
  });
};

// Function to get tech stack suggestions based on category/subcategory
const getTechStackSuggestions = (category: string, subcategory: string): string[] => {
  const defaultStack = ["React", "Node.js", "PostgreSQL", "AWS", "Docker"];
  
  const techStacks: Record<string, Record<string, string[]>> = {
    "FinTech": {
      "Payments": ["Stripe API", "React", "Node.js", "MongoDB", "Redis"],
      "Crypto": ["Solidity", "Ethers.js", "React", "Node.js", "IPFS"],
      "WealthTech": ["Python", "Django", "React", "PostgreSQL", "AWS"],
      "Default": ["React", "Node.js", "PostgreSQL", "Stripe API", "AWS"]
    },
    "HealthTech": {
      "Telemedicine": ["React Native", "WebRTC", "Node.js", "MongoDB", "AWS"],
      "Mental Health": ["React Native", "Node.js", "MongoDB", "TensorFlow", "AWS"],
      "Healthcare AI": ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "AWS"],
      "Default": ["React", "Node.js", "MongoDB", "AWS", "FHIR API"]
    },
    "AI/ML": {
      "NLP": ["Python", "Hugging Face", "PyTorch", "FastAPI", "Docker"],
      "Computer Vision": ["Python", "TensorFlow", "OpenCV", "FastAPI", "Docker"],
      "Generative AI": ["Python", "PyTorch", "Stable Diffusion", "FastAPI", "AWS"],
      "Edge AI": ["TensorFlow Lite", "Python", "C++", "Docker", "Kubernetes"],
      "Default": ["Python", "TensorFlow", "Flask", "PostgreSQL", "Docker"]
    },
    "Web3": {
      "DeFi": ["Solidity", "Ethers.js", "React", "Node.js", "The Graph"],
      "NFTs": ["Solidity", "IPFS", "React", "Node.js", "Pinata"],
      "DAOs": ["Solidity", "Aragon", "React", "Node.js", "IPFS"],
      "Default": ["Solidity", "React", "Node.js", "Ethers.js", "IPFS"]
    }
  };
  
  if (category in techStacks) {
    if (subcategory !== "All" && subcategory in techStacks[category]) {
      return techStacks[category][subcategory];
    }
    return techStacks[category]["Default"];
  }
  
  return defaultStack;
};

export default function IdeaGeneratorSection({ onNavigateToSitemap }: IdeaGeneratorSectionProps) {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("All");
  const [subcategory, setSubcategory] = useState<string>("All");
  const [businessType, setBusinessType] = useState<"physical" | "online" | "hybrid">("online");
  const [teamSize, setTeamSize] = useState<number[]>([3]);
  const [businessModel, setBusinessModel] = useState<string>("SaaS");
  const [geographicFocus, setGeographicFocus] = useState<string>("Global");
  const [complexity, setComplexity] = useState<string>("Moderate - MVP in 4-6 months");
  const [investment, setInvestment] = useState<string>("Seed ($25k-$100k)");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedIdea, setGeneratedIdea] = useState<IdeaType | null>(null);
  const [activeTab, setActiveTab] = useState<string>("generate");
  const [error, setError] = useState<string | null>(null);
  const [useWebSearch, setUseWebSearch] = useState<boolean>(true);
  
  // Reset subcategory when category changes
  useEffect(() => {
    setSubcategory("All");
  }, [category]);
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Step 1: Initialize ideas pool
      let allIdeas: IdeaType[] = [];
      
      // Collect all available ideas
        Object.keys(sampleIdeas).forEach(cat => {
          Object.values(sampleIdeas[cat]).forEach(ideasArr => {
          allIdeas = [...allIdeas, ...ideasArr];
          });
        });
      
      // Step 2: Create a scoring function to rank ideas by relevance
      const scoreIdea = (idea: IdeaType): number => {
        let score = 0;
        
        // Category match is highest priority
        if (category !== "All" && idea.category === category) {
          score += 100;
        }
        
        // Subcategory match
        if (subcategory !== "All" && idea.subcategory === subcategory) {
          score += 50;
        } else if (subcategory !== "All") {
          // Partial match on subcategory
          if (idea.name?.toLowerCase().includes(subcategory.toLowerCase())) {
            score += 20;
          }
          
          if (idea.pitch?.toLowerCase().includes(subcategory.toLowerCase())) {
            score += 15;
          }
          
          if (idea.aiUseCase?.toLowerCase().includes(subcategory.toLowerCase())) {
            score += 10;
          }
          
          // Check tech stack for relevance
          if (idea.techStack) {
            idea.techStack.forEach(tech => {
              if (tech.toLowerCase().includes(subcategory.toLowerCase())) {
                score += 5;
              }
            });
          }
        }
        
        // Business type match
        if (idea.businessType === businessType) {
          score += 30;
        }
        
        // Add slight randomness to prevent same ideas every time
        score += Math.random() * 5;
        
        return score;
      };
      
      // Step 3: Special case for AI/ML category - add AI-related ideas from other categories
      if (category === "AI/ML") {
        const aiIdeas = allIdeas.filter(idea => 
          (idea.category !== "AI/ML") &&
          ((idea.aiUseCase && (
            idea.aiUseCase.toLowerCase().includes("ai") || 
            idea.aiUseCase.toLowerCase().includes("machine learning")
          )) ||
          (idea.techStack && idea.techStack.some(tech => 
            tech.toLowerCase().includes("tensorflow") ||
            tech.toLowerCase().includes("pytorch") ||
            tech.toLowerCase().includes("gpt")
          )))
        ).map(idea => ({
          ...idea,
          originalCategory: idea.category,
          category: "AI/ML",
          subcategory: subcategory !== "All" ? subcategory : idea.subcategory || "AI Application"
        }));
        
        allIdeas = [...allIdeas, ...aiIdeas];
      }
      
      // Step 4: Score and sort all ideas
      const scoredIdeas = allIdeas
        .map(idea => ({ idea, score: scoreIdea(idea) }))
        .sort((a, b) => b.score - a.score);
      
      // Step 5: Select a top idea (randomly from top 3 for variety)
      const topIdeas = scoredIdeas.slice(0, 3);
      const selectedIdea = topIdeas[Math.floor(Math.random() * topIdeas.length)].idea;
      
      console.log(`Selected idea: ${selectedIdea.name} with category ${selectedIdea.category} and subcategory ${selectedIdea.subcategory || 'N/A'}`);
      
      // Step 6: Fetch real-time market trends if enabled
      let marketValidation = selectedIdea.marketValidation;
      
      if (useWebSearch) {
        try {
          const trends = await fetchMarketTrends(
            category !== "All" ? category : selectedIdea.category,
            subcategory !== "All" ? subcategory : (selectedIdea.subcategory || "All")
          );
          marketValidation = trends;
        } catch (err) {
          console.warn("Failed to fetch market trends:", err);
          // Fall back to the original market validation
        }
      }
      
      // Step 7: Update tech stack with modern/relevant technologies
      const techStack = getTechStackSuggestions(
        category !== "All" ? category : selectedIdea.category,
        subcategory !== "All" ? subcategory : (selectedIdea.subcategory || "All")
      );
      
      // Current year for updates
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      
      // Step 8: Create a customized idea based on user selections
      const customizedIdea: IdeaType = { 
        ...selectedIdea,
        // Override with user selections
        businessType: businessType,
        businessModel: businessModel,
        geographicFocus: geographicFocus,
        complexity: complexity,
        initialInvestment: investment,
        
        // Ensure subcategory is set if one was selected
        subcategory: subcategory !== "All" ? subcategory : selectedIdea.subcategory,
        
        // Update market validation with real-time data
        marketValidation: marketValidation,
        
        // Adjust pitch based on selections
        pitch: (() => {
          let enhancedPitch = selectedIdea.pitch;
          
          // Add category/subcategory context if needed
          if (subcategory !== "All" && !enhancedPitch.toLowerCase().includes(subcategory.toLowerCase())) {
            enhancedPitch += ` Specifically designed for the ${subcategory} segment of the ${category !== "All" ? category : selectedIdea.category} market.`;
          }
          
          // Add team size context
          if (teamSize[0] > 5) {
            enhancedPitch += ` Ideal for a team of ${teamSize[0]} with diverse expertise and scalable from day one.`;
          } else if (teamSize[0] <= 2) {
            enhancedPitch += ` Perfect for a solo founder or small team looking to validate quickly with minimal resources.`;
          }
          
          // Add geographic focus if not global
          if (geographicFocus !== "Global" && !enhancedPitch.toLowerCase().includes(geographicFocus.toLowerCase())) {
            enhancedPitch += ` Focused on the ${geographicFocus} market.`;
          }
          
          return enhancedPitch;
        })(),
        
        // Enhanced AI use case
        aiUseCase: (() => {
          let enhancedAI = selectedIdea.aiUseCase;
          
          // If subcategory is selected, integrate it into the AI use case
          if (subcategory !== "All" && !enhancedAI.toLowerCase().includes(subcategory.toLowerCase())) {
            if (category === "AI/ML") {
              enhancedAI = `Advanced ${subcategory} techniques: ${enhancedAI}`;
            } else if (!enhancedAI.includes("AI")) {
              enhancedAI = `AI-powered ${enhancedAI} with ${subcategory} optimization`;
            }
          }
          
          return enhancedAI;
        })(),
        
        // Update tech stack to be more relevant
        techStack: techStack,
      };
      
      setGeneratedIdea(customizedIdea);
      setActiveTab("results");
    } catch (err) {
      console.error("Error in idea generation:", err);
      setError("Failed to generate idea. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGenerator = () => {
    setCategory("All");
    setSubcategory("All");
    setBusinessType("online");
    setTeamSize([3]);
    setBusinessModel("SaaS");
    setGeographicFocus("Global");
    setComplexity("Moderate - MVP in 4-6 months");
    setInvestment("Seed ($25k-$100k)");
    setGeneratedIdea(null);
    setActiveTab("generate");
    setError(null);
  };

  const generateImplementationPrompt = (idea: IdeaType) => {
    return `Create a detailed implementation plan for ${idea.name}, a ${idea.businessType} ${idea.category} startup:

1. Product Description:
${idea.pitch}

2. Market Validation:
${idea.marketValidation}

3. Core Features:
${idea.mvpFeatures.map(f => '- ' + f).join('\n')}

4. Technical Requirements:
- Stack: ${idea.techStack.join(', ')}
- AI Integration: ${idea.aiUseCase}

5. Business Model:
${idea.businessModel} with ${idea.revenueModel}

6. Implementation Timeline:
- Complexity: ${idea.complexity}
- Team Size: ${teamSize[0]} people
- Geographic Focus: ${idea.geographicFocus}
- Initial Investment: ${idea.initialInvestment}

Please provide:
1. Detailed sitemap and user flow
2. Key pages wireframes
3. Core feature specifications
4. Technical architecture overview
5. Development milestones
6. Resource allocation plan`;
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      id="generator" 
      className="relative z-10"
    >
      <div className="max-w-5xl mx-auto">
        <Card className="border-idea-purple/20 shadow-xl bg-black/40 backdrop-blur-md border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          
          <CardContent className="p-6 md:p-8 relative z-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/60 border border-white/10">
                <TabsTrigger 
                  value="generate" 
                  className="data-[state=active]:bg-idea-purple/20 data-[state=active]:text-white text-white/70"
                >
                  Generate Idea
                </TabsTrigger>
                <TabsTrigger 
                  value="results" 
                  className="data-[state=active]:bg-idea-purple/20 data-[state=active]:text-white text-white/70"
                >
                  Results
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="generate" className="space-y-8">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                    <p className="text-red-400">{error}</p>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm">Use web data</span>
                    <button
                      className={`w-10 h-5 rounded-full flex items-center ${useWebSearch ? 'bg-idea-purple/80' : 'bg-white/10'} p-0.5 transition-colors`}
                      onClick={() => setUseWebSearch(!useWebSearch)}
                    >
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-white" 
                        animate={{ x: useWebSearch ? 20 : 0 }}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/70">Main Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full bg-black/50 border-white/10 text-white hover:bg-white/5">
                        <SelectValue placeholder="Select category" className="text-white" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="All" className="text-white hover:bg-white/10">All Categories</SelectItem>
                        {Object.keys(categories).map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-white hover:bg-white/10">{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/70">Sub Category</label>
                    <Select value={subcategory} onValueChange={setSubcategory}>
                      <SelectTrigger className="w-full bg-black/50 border-white/10">
                        <SelectValue placeholder="Select sub-category" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="All">All Sub-categories</SelectItem>
                        {category !== "All" && categories[category]?.map((subCat) => (
                          <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/70">Business Type</label>
                    <Select 
                      value={businessType} 
                      onValueChange={(value) => setBusinessType(value as "physical" | "online" | "hybrid")}
                    >
                      <SelectTrigger className="w-full bg-black/50 border-white/10">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        <SelectItem value="online">Online Only</SelectItem>
                        <SelectItem value="physical">Physical Location</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Online + Physical)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/70">Business Model</label>
                    <Select value={businessModel} onValueChange={setBusinessModel}>
                      <SelectTrigger className="w-full bg-black/50 border-white/10">
                        <SelectValue placeholder="Select business model" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        {businessModels.map((model) => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/70">Geographic Focus</label>
                    <Select value={geographicFocus} onValueChange={setGeographicFocus}>
                      <SelectTrigger className="w-full bg-black/50 border-white/10">
                        <SelectValue placeholder="Select geographic focus" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        {geographicFocuses.map((geo) => (
                          <SelectItem key={geo} value={geo}>{geo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/70">Project Complexity</label>
                    <Select value={complexity} onValueChange={setComplexity}>
                      <SelectTrigger className="w-full bg-black/50 border-white/10">
                        <SelectValue placeholder="Select complexity level" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        {complexityLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/70">Initial Investment</label>
                    <Select value={investment} onValueChange={setInvestment}>
                      <SelectTrigger className="w-full bg-black/50 border-white/10">
                        <SelectValue placeholder="Select investment range" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                        {investmentRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/70">Team Size</label>
                    <div className="pt-2">
                      <Slider
                        value={teamSize}
                        onValueChange={setTeamSize}
                        max={20}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="mt-2 text-sm text-white/60">
                        {teamSize[0]} {teamSize[0] === 1 ? 'person' : 'people'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col md:flex-row gap-4">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex-1 bg-idea-purple hover:bg-idea-purple/90 text-white"
                  >
                    {isGenerating ? (
                      <div className="flex items-center space-x-2">
                        <span>Generating</span>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Generate Startup Idea</span>
                      </div>
                    )}
                  </Button>
                  
                  <Button
                    onClick={resetGenerator}
                    variant="outline"
                    className="flex-1 border-white/10 text-white/80 hover:bg-white/5"
                  >
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset</span>
                    </div>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="space-y-8">
                {generatedIdea ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-idea-purple to-violet-300">
                            {generatedIdea.name}
                          </h2>
                          <p className="text-white/60 mt-2 text-lg italic">"{generatedIdea.slogan}"</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="bg-black/40 text-white/80 border-white/10">
                          {generatedIdea.category}
                        </Badge>
                          {generatedIdea.subcategory && (
                            <Badge variant="outline" className="bg-black/40 text-white/60 border-white/10 text-xs">
                              {generatedIdea.subcategory}
                            </Badge>
                          )}
                          {generatedIdea.originalCategory && generatedIdea.originalCategory !== generatedIdea.category && (
                            <Badge variant="outline" className="bg-black/40 text-white/60 border-white/10 text-xs">
                              From: {generatedIdea.originalCategory}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-black/40 border-white/10">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5 text-idea-purple" />
                              Business Overview
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm text-white/60 mb-1">Pitch</div>
                                <p className="text-white/90">{generatedIdea.pitch}</p>
                              </div>
                              <div>
                                <div className="text-sm text-white/60 mb-1">Market Validation</div>
                                <p className="text-white/90">{generatedIdea.marketValidation}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-black/40 border-white/10">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Activity className="w-5 h-5 text-idea-purple" />
                              Business Details
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-white/60">Type</span>
                                <Badge variant="outline" className="bg-black/40">
                                  {generatedIdea.businessType}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/60">Model</span>
                                <Badge variant="outline" className="bg-black/40">
                                  {generatedIdea.businessModel}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/60">Geographic Focus</span>
                                <Badge variant="outline" className="bg-black/40">
                                  {generatedIdea.geographicFocus}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/60">Initial Investment</span>
                                <Badge variant="outline" className="bg-black/40">
                                  {generatedIdea.initialInvestment}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/60">Complexity</span>
                                <Badge variant="outline" className="bg-black/40">
                                  {generatedIdea.complexity}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-black/40 border-white/10">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Briefcase className="w-5 h-5 text-idea-purple" />
                              MVP Features
                            </h3>
                            <ul className="space-y-2">
                              {generatedIdea.mvpFeatures.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <ChevronRight className="w-4 h-4 text-idea-purple" />
                                  <span className="text-white/90">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-black/40 border-white/10">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                              <Brain className="w-5 h-5 text-idea-purple" />
                              Technical Implementation
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm text-white/60 mb-2">Tech Stack</div>
                                <div className="flex flex-wrap gap-2">
                                  {generatedIdea.techStack.map((tech, index) => (
                                    <Badge key={index} variant="outline" className="bg-black/40 text-white">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-white/60 mb-2">AI Integration</div>
                                <p className="text-white/90">{generatedIdea.aiUseCase}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* New Motivation Section */}
                        <Card className="bg-black/40 border-white/10">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                              <Sparkles className="w-5 h-5 text-idea-purple" />
                              Motivation & Next Steps
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm text-white/60 mb-2">Why This Matters</div>
                                <p className="text-white/90">
                                  This idea addresses a significant market need with strong growth potential. 
                                  The combination of {generatedIdea.category} and {generatedIdea.businessModel} 
                                  model creates a unique value proposition in a {generatedIdea.competitiveLandscape} market.
                                </p>
                              </div>
                              <div>
                                <div className="text-sm text-white/60 mb-2">Key Success Factors</div>
                                <ul className="space-y-2">
                                  <li className="flex items-center gap-2 text-white/90">
                                    <ChevronRight className="w-4 h-4 text-idea-purple" />
                                    <span>Market timing is optimal with {generatedIdea.marketValidation}</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-white/90">
                                    <ChevronRight className="w-4 h-4 text-idea-purple" />
                                    <span>Team size of {teamSize[0]} is well-suited for the {generatedIdea.complexity}</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-white/90">
                                    <ChevronRight className="w-4 h-4 text-idea-purple" />
                                    <span>{generatedIdea.initialInvestment} funding requirement is realistic for the scope</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* New Delegate Prompt Section */}
                        <Card className="bg-black/40 border-white/10 col-span-2">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                              <Zap className="w-5 h-5 text-idea-purple" />
                              Implementation Prompt
                            </h3>
                            <div className="space-y-4">
                              <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                                <pre className="text-white/90 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                  {generateImplementationPrompt(generatedIdea)}
                                </pre>
                              </div>
                              <div className="flex gap-4">
                                <Button 
                                  onClick={() => {
                                    const prompt = generateImplementationPrompt(generatedIdea);
                                    onNavigateToSitemap(prompt);
                                  }}
                                  className="flex-1 bg-idea-purple/20 hover:bg-idea-purple/30 text-white border border-idea-purple/30"
                                >
                                  <div className="flex items-center space-x-2">
                                    <span>Create Sitemap</span>
                                    <ChevronRight className="w-4 h-4" />
                                  </div>
                                </Button>
                                <Button 
                                  onClick={() => navigate("/wireframe")}
                                  className="flex-1 bg-idea-purple/20 hover:bg-idea-purple/30 text-white border border-idea-purple/30"
                                >
                                  <div className="flex items-center space-x-2">
                                    <span>Create Wireframe</span>
                                    <ChevronRight className="w-4 h-4" />
                                  </div>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={() => setActiveTab("generate")}
                        className="bg-idea-purple hover:bg-idea-purple/90 text-white"
                      >
                        Generate Another Idea
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/60">Generate an idea to see results</p>
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
