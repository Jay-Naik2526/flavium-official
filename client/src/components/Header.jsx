import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Results', path: '/results' },
    { name: 'Rules', path: '/rules' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 h-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex justify-between items-center">
          
          {/* --- LEFT: FLAVIUM LOGO --- */}
          <Link to="/" className="flex items-center gap-3 md:gap-4 group z-50 shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-[#fbbf24] blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              {/* Responsive Size: w-10 on mobile, w-16 on desktop */}
              <img 
                src="/images/flavium-logo.png" 
                alt="Flavium" 
                className="w-10 h-10 md:w-16 md:h-16 object-contain relative z-10 transition-transform group-hover:scale-105" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-teko text-3xl md:text-4xl leading-none tracking-wide text-white group-hover:text-[#fbbf24] transition-colors mt-1">
                FLAVIUM
              </h1>
              <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase hidden sm:block">
                Broadcast
              </span>
            </div>
          </Link>

          {/* --- CENTER: NAVIGATION (Desktop Only) --- */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold uppercase tracking-widest hover:text-[#fbbf24] transition-colors relative py-2 ${
                    isActive(link.path) ? 'text-[#fbbf24]' : 'text-zinc-400'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#fbbf24] shadow-[0_0_10px_#fbbf24]" />
                  )}
                </Link>
              ))}
            </nav>
            <div className="w-[1px] h-10 bg-zinc-800"></div>
          </div>

          {/* --- RIGHT: NMIMS LOGO & TOGGLE --- */}
          <div className="flex items-center gap-4">
            
            {/* NMIMS Logo (Visible on BOTH Mobile & Desktop) */}
            <div className="flex items-center opacity-90 mix-blend-screen hover:opacity-100 transition-opacity">
              {/* Responsive Size: h-10 on mobile, h-14 on desktop */}
              <img 
                src="/images/nmims-logo.png" 
                alt="NMIMS" 
                className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all" 
              />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-1 z-50 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} className="text-[#fbbf24]" /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#fbbf24] rounded-full blur-[100px]" />
            </div>

            {/* Menu Links */}
            <div className="flex flex-col items-center gap-8 z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-5xl font-teko uppercase tracking-wider transition-all ${
                      isActive(link.path) 
                        ? 'text-[#fbbf24] scale-110' 
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer info in Menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <p className="text-zinc-700 text-[10px] font-mono uppercase tracking-[0.3em]">
                Shirpur Campus • 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;