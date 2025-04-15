
import { LightbulbIcon, LineChart, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

function FeatureCard({ title, description, icon, index }: FeatureCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative rounded-2xl p-8 shadow-lg hover:shadow-xl 
                border border-white/10 bg-black/30 backdrop-blur-sm 
                transition-all duration-300 hover:translate-y-[-5px]"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-idea-purple/20">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      title: "Smart Idea Engine",
      description: "AI-powered algorithm suggests high-potential startup ideas based on trends and your interests.",
      icon: <LightbulbIcon size={28} className="text-idea-purple" />,
    },
    {
      title: "Market Validation",
      description: "Get real-time insights, data-backed validation, and industry alignment for every idea.",
      icon: <LineChart size={28} className="text-idea-purple" />,
    },
    {
      title: "Instant MVP Blueprint",
      description: "We provide tech stacks, revenue plans, and launch strategies—all in one click.",
      icon: <Rocket size={28} className="text-idea-purple" />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#030303] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.05),transparent_70%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Turn AI Insights Into Startup Success
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-white/70"
          >
            Our platform combines cutting-edge AI with market data to generate validated startup ideas tailored to your strengths.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
