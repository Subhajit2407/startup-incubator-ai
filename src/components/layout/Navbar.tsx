import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 17L12 22L22 17" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 12L12 17L22 12" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <Link to="/" className="text-xl font-bold text-white">IdeasAI</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button variant={isActive('/') ? 'secondary' : 'ghost'}>
                Home
              </Button>
            </Link>
            <Link to="/generator">
              <Button variant={isActive('/generator') ? 'secondary' : 'ghost'}>
                Generator
              </Button>
            </Link>
            <Link to="/sitemap">
              <Button variant={isActive('/sitemap') ? 'secondary' : 'ghost'}>
                Sitemap
              </Button>
            </Link>
            <Link to="/wireframe">
              <Button variant={isActive('/wireframe') ? 'secondary' : 'ghost'}>
                Wireframe
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/generator">
              <Button variant="default" className="glow-effect">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
