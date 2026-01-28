import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2500; // Slightly longer to appreciate the logos
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden cursor-wait"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Background Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* --- 1. NMIMS LOGO (Top Left Authority Badge) --- */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          {/* Using mix-blend-screen to make white logo pop on dark bg */}
          <img 
            src="/images/nmims-logo.png" 
            alt="NMIMS" 
            className="h-12 md:h-16 w-auto object-contain opacity-90 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-500" 
          />
          <div className="h-8 w-[1px] bg-zinc-800 hidden md:block"></div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden md:block">
            Deemed University
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* --- 2. FLAVIUM LOGO (Center Hero) --- */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="relative w-32 h-32 md:w-48 md:h-48"
        >
           {/* Glow Effect behind logo */}
           <div className="absolute inset-0 bg-[#fbbf24] blur-[50px] opacity-20 animate-pulse rounded-full"></div>
           
           <img 
             src="/images/flavium-logo.png" 
             alt="Flavium" 
             className="w-full h-full object-contain drop-shadow-2xl relative z-10" 
           />
        </motion.div>

        {/* GLITCH TEXT EFFECT */}
        <div className="relative -mt-4">
          <motion.div
            className="absolute inset-0 text-[#fbbf24] blur-[2px] opacity-70"
            animate={{ 
              x: [-2, 2, -1, 0], 
              y: [1, -1, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 0.2, repeatType: "mirror" }}
          >
            <h1 className="font-teko text-8xl md:text-[10rem] leading-none tracking-tighter">
              FLAVIUM
            </h1>
          </motion.div>
          <h1 className="relative font-teko text-8xl md:text-[10rem] leading-none tracking-tighter text-white mix-blend-overlay">
            FLAVIUM
          </h1>
        </div>

        {/* LOADING BAR */}
        <div className="w-64 md:w-96 flex flex-col gap-2 mt-4">
          <div className="flex justify-between items-end border-b border-zinc-800 pb-1 mb-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Initializing Broadcast
            </span>
            <span className="text-2xl font-teko text-[#fbbf24] leading-none">
              {Math.round(count)}%
            </span>
          </div>
          
          <div className="h-1 w-full bg-zinc-900 overflow-hidden relative rounded-full">
            <motion.div 
              className="h-full bg-[#fbbf24]" 
              style={{ width: `${count}%` }}
            />
          </div>
        </div>

      </div>

      {/* FOOTER DECORATION */}
      <div className="absolute bottom-8 w-full flex justify-center items-center gap-4">
        <div className="h-[1px] w-12 bg-zinc-800" />
        <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.3em]">
          EST. 2026
        </p>
        <div className="h-[1px] w-12 bg-zinc-800" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;