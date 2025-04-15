
import Layout from "@/components/layout/Layout";
import IdeaGeneratorSection from "@/components/sections/IdeaGeneratorSection";

const Generator = () => {
  return (
    <Layout>
      <div className="py-16 bg-[#030303] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-idea-purple via-white/90 to-violet-300">
            Generate Your Next Big Idea
          </h1>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Use our AI-powered idea generator to create validated startup ideas based on your preferences and market trends.
          </p>
          
          <IdeaGeneratorSection />
        </div>
      </div>
    </Layout>
  );
};

export default Generator;
