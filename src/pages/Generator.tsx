import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImplementationContext } from "../App";
import Layout from "@/components/layout/Layout";
import IdeaGeneratorSection from "@/components/sections/IdeaGeneratorSection";
import { motion } from "framer-motion";

const Generator = () => {
  const navigate = useNavigate();
  const { setImplementationPrompt } = useContext(ImplementationContext);

  const handleNavigateToSitemap = (prompt: string) => {
    setImplementationPrompt(prompt);
    navigate("/sitemap");
  };

  return (
    <Layout>
      <div className="relative min-h-screen w-full bg-[#030303] overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-purple-500/[0.03] blur-3xl" />
        
        <div className="absolute inset-0 bg-dot-pattern opacity-20 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-idea-purple via-white/90 to-violet-300">
              Generate Your Next Big Idea
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Use our AI-powered idea generator to create validated startup ideas based on your preferences and market trends.
            </p>
          </motion.div>
          
          <IdeaGeneratorSection onNavigateToSitemap={handleNavigateToSitemap} />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/30 pointer-events-none" />
      </div>
    </Layout>
  );
};

export default Generator;
