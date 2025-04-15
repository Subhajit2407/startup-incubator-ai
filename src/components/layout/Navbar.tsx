
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-white">IdeasAI</Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/generator" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Generator
              </Link>
              <Link to="/pricing" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Pricing
              </Link>
              <Button variant="outline" className="ml-4 border-white/10 text-white bg-white/5 hover:bg-white/10">
                Sign In
              </Button>
              <Button asChild>
                <Link to="/generator">Get Started</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-white/80 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/generator" className="block text-white/80 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Generator
            </Link>
            <Link to="/pricing" className="block text-white/80 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Pricing
            </Link>
            <div className="pt-4 pb-2 space-y-2">
              <Button variant="outline" className="w-full border-white/10 text-white bg-white/5 hover:bg-white/10">
                Sign In
              </Button>
              <Button className="w-full mt-2" asChild>
                <Link to="/generator">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
