import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import Index from './pages/Index';
import Generator from './pages/Generator';
import SitemapGenerator from './pages/SitemapGenerator';
import WireframeGenerator from './pages/WireframeGenerator';
import NotFound from './pages/NotFound';
import './App.css';

// Create a context for sharing the implementation prompt
export const ImplementationContext = createContext<{
  implementationPrompt: string;
  setImplementationPrompt: (prompt: string) => void;
}>({
  implementationPrompt: '',
  setImplementationPrompt: () => {},
});

function App() {
  const [implementationPrompt, setImplementationPrompt] = useState('');

  return (
    <ImplementationContext.Provider value={{ implementationPrompt, setImplementationPrompt }}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/sitemap" element={<SitemapGenerator />} />
          <Route path="/wireframe" element={<WireframeGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ImplementationContext.Provider>
  );
}

export default App;
