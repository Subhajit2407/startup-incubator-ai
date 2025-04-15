
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-primary">IdeasAI</span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="#features" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#generator" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Generator
              </a>
              <a href="#testimonials" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Testimonials
              </a>
              <Button variant="outline" className="ml-4">
                Sign In
              </Button>
              <Button>
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
              Features
            </a>
            <a href="#generator" className="block text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
              Generator
            </a>
            <a href="#testimonials" className="block text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
              Testimonials
            </a>
            <div className="pt-4 pb-2 space-y-2">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full mt-2">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
