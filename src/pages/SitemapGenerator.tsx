import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImplementationContext } from "../App";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FileText, Layers, Download, ChevronRight, ChevronDown, Folder, File, Zap, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type SitemapNode = {
  name: string;
  type: 'page' | 'section';
  path: string;
  children?: SitemapNode[];
};

const SitemapGenerator = () => {
  const navigate = useNavigate();
  const { implementationPrompt } = useContext(ImplementationContext);
  const [prompt, setPrompt] = useState(implementationPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sitemap, setSitemap] = useState<SitemapNode[] | null>(null);
  
  useEffect(() => {
    // Update prompt when implementationPrompt changes
    setPrompt(implementationPrompt);
  }, [implementationPrompt]);

  const generateBasicSitemap = (description: string) => {
    // This is a basic implementation that generates a standard sitemap structure
    // In a real implementation, this would use an AI service to generate a custom structure
    const commonPages = [
      { name: "Home", type: "page" as const, path: "/" },
      {
        name: "Product", 
        type: "section" as const, 
        path: "/product",
        children: [
          { name: "Features", type: "page" as const, path: "/product/features" },
          { name: "Pricing", type: "page" as const, path: "/product/pricing" },
          { name: "Documentation", type: "page" as const, path: "/product/docs" },
        ]
      },
      {
        name: "Company",
        type: "section" as const,
        path: "/company",
        children: [
          { name: "About", type: "page" as const, path: "/company/about" },
          { name: "Contact", type: "page" as const, path: "/company/contact" },
          { name: "Blog", type: "page" as const, path: "/company/blog" },
        ]
      },
      {
        name: "User",
        type: "section" as const,
        path: "/user",
        children: [
          { name: "Dashboard", type: "page" as const, path: "/user/dashboard" },
          { name: "Settings", type: "page" as const, path: "/user/settings" },
          { name: "Profile", type: "page" as const, path: "/user/profile" },
        ]
      },
      { name: "Login", type: "page" as const, path: "/login" },
      { name: "Register", type: "page" as const, path: "/register" },
    ];

    return commonPages;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const generatedSitemap = generateBasicSitemap(prompt);
      setSitemap(generatedSitemap);
      
      // Save sitemap to localStorage for the wireframe generator to use
      localStorage.setItem('sitemapData', JSON.stringify(generatedSitemap));
      
      setIsGenerating(false);
    }, 2000);
  };

  const SitemapNode = ({ node, level = 0 }: { node: SitemapNode; level?: number }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    
    return (
      <div className="text-white">
        <div 
          className={`flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-white/5 ${node.children ? 'cursor-pointer' : ''}`}
          onClick={() => node.children && setIsExpanded(!isExpanded)}
          style={{ marginLeft: `${level * 20}px` }}
        >
          {node.children ? (
            isExpanded ? <ChevronDown className="w-4 h-4 text-idea-purple" /> : <ChevronRight className="w-4 h-4 text-idea-purple" />
          ) : (
            <File className="w-4 h-4 text-idea-purple" />
          )}
          <span className="flex-1">{node.name}</span>
          <Badge variant="outline" className="bg-black/40 text-white/70 text-xs">
            {node.path}
          </Badge>
        </div>
        {node.children && isExpanded && (
          <div className="ml-4">
            {node.children.map((child, index) => (
              <SitemapNode key={index} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
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
              Paste your implementation prompt or describe your product, and we'll generate a complete sitemap structure for your website.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-idea-purple/20 shadow-xl bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Implementation Prompt or Description</label>
                    <Textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Paste your implementation prompt here or describe your product..."
                      className="min-h-32 bg-black/60 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      className="flex-1 py-6 text-lg bg-gradient-to-r from-idea-purple to-violet-500 hover:from-idea-purple hover:to-violet-600 border-none shadow-lg shadow-idea-purple/20 text-white"
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
                    <Button
                      onClick={() => {
                        // Navigate to wireframe page but make sure sitemap is saved
                        if (sitemap && sitemap.length > 0) {
                          localStorage.setItem('sitemapData', JSON.stringify(sitemap));
                        }
                        navigate("/wireframe");
                      }}
                      className="bg-black/40 hover:bg-black/50 text-white border border-white/10"
                    >
                      <Layers className="h-4 w-4 mr-2" />
                      Go to Wireframe
                    </Button>
                  </div>
                  
                  {sitemap ? (
                    <div className="mt-8 space-y-6">
                      <div className="rounded-lg border border-white/10 bg-black/20 overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                          <h3 className="text-white font-medium flex items-center gap-2">
                            <Folder className="w-4 h-4 text-idea-purple" />
                            Website Structure
                          </h3>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/10 bg-black/40 text-white hover:bg-white/5"
                              onClick={() => {
                                // Save the current sitemap data before navigating
                                if (sitemap) {
                                  localStorage.setItem('sitemapData', JSON.stringify(sitemap));
                                  console.log('Sitemap data saved to localStorage');
                                }
                                navigate("/wireframe");
                              }}
                            >
                              <Layers className="h-4 w-4 mr-2" />
                              Create Wireframe
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/10 bg-black/40 text-white hover:bg-white/5"
                              onClick={() => {
                                // In a real implementation, this would generate and download a sitemap file
                                alert('Download functionality coming soon!');
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          {sitemap.map((node, index) => (
                            <SitemapNode key={index} node={node} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 p-8 rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-white/30" />
                      <p className="text-white/60 mt-4 text-center">
                        Your generated sitemap will appear here.
                        <br />
                        Start by entering your implementation prompt or description above.
                      </p>
                    </div>
                  )}
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
