
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import IdeaGeneratorSection from "@/components/sections/IdeaGeneratorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <IdeaGeneratorSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
