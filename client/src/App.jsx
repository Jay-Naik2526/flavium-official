import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react"; // Correct Vercel Analytics import

// Pages
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Rules from './pages/Rules';
import Contact from './pages/Contact';
import Results from './pages/Results';

// Components
import Header from './components/Header';
import Footer from './components/Footer'; 
import LoadingScreen from './components/LoadingScreen';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      direction: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="relative min-h-screen text-white selection:bg-[#fbbf24] selection:text-black font-sans">
      
      {/* Vercel Analytics Component */}
      <Analytics />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Visual Overlays */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')]"></div>
      <div className="fixed inset-0 bg-zinc-950 -z-20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black -z-10" />

      {!isLoading && (
        <>
          <Header />
          
          <div className="flex flex-col min-h-screen">
            <main className="relative z-10 pt-24 px-4 md:px-8 max-w-7xl mx-auto flex-grow w-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/results" element={<Results />} />
                <Route path="/admin-flavium-secret" element={<Admin />} />
              </Routes>
            </main>
            
            <Footer /> 
          </div>
        </>
      )}

    </div>
  );
}

export default App;