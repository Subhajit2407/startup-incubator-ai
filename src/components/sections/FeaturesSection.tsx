
import { LightbulbIcon, LineChart, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

function FeatureCard({ title, description, icon, color, index }: FeatureCardProps) {
  return (
    <div className={cn(
      "relative rounded-2xl p-8 shadow-lg transition-all hover:shadow-xl border bg-card animate-fade-up",
      `animation-delay-${index * 100}`
    )}>
      <div className={cn("absolute inset-0 rounded-2xl opacity-10", color)} />
      <div className={cn("mb-6 flex h-14 w-14 items-center justify-center rounded-xl", color)}>
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      title: "Smart Idea Engine",
      description: "AI-powered algorithm suggests high-potential startup ideas based on trends and your interests.",
      icon: <LightbulbIcon size={28} className="text-white" />,
      color: "bg-idea-purple",
    },
    {
      title: "Market Validation",
      description: "Get real-time insights, data-backed validation, and industry alignment for every idea.",
      icon: <LineChart size={28} className="text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Instant MVP Blueprint",
      description: "We provide tech stacks, revenue plans, and launch strategies—all in one click.",
      icon: <Rocket size={28} className="text-white" />,
      color: "bg-pink-500",
    },
  ];

  return (
    <section id="features" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">Turn AI Insights Into Startup Success</h2>
          <p className="text-xl text-foreground/70 animate-fade-up animation-delay-100">
            Our platform combines cutting-edge AI with market data to generate validated startup ideas tailored to your strengths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              index={index + 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
