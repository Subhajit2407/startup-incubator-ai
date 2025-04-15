
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FileText, Layers, Download } from "lucide-react";

const SitemapGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = () => {
    // This is a placeholder for future functionality
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
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
              Generate Your Website Sitemap
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Describe your product or business, and we'll generate a complete sitemap structure for your website.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-idea-purple/20 shadow-xl bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Describe your product or business</label>
                    <Textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., A SaaS platform that helps freelancers manage their clients, invoices, and projects in one place."
                      className="min-h-32 bg-black/60 border-white/10 text-white"
                    />
                  </div>
                  
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full py-6 text-lg bg-gradient-to-r from-idea-purple to-violet-500 hover:from-idea-purple hover:to-violet-600 border-none shadow-lg shadow-idea-purple/20"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Sitemap...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Layers size={20} />
                        Generate Sitemap
                      </span>
                    )}
                  </Button>
                  
                  <div className="mt-8 p-8 rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center">
                    <FileText className="h-12 w-12 text-white/30" />
                    <p className="text-white/60 mt-4 text-center">
                      Your generated sitemap will appear here.
                      <br />
                      Coming soon!
                    </p>
                    <Button variant="outline" disabled className="mt-4 border-white/10 bg-black/40 text-white/50">
                      <Download className="h-4 w-4 mr-2" />
                      Download Sitemap
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/30 pointer-events-none" />
      </div>
    </Layout>
  );
};

export default SitemapGenerator;
