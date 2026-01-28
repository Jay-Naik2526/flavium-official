import React from 'react';
import { motion } from 'framer-motion';

const BroadcastHero = () => {
  return (
    <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden mb-8 md:mb-12 border-b border-white/5">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 z-10" />
      
      {/* Main Glitch Text */}
      <div className="relative z-20 text-center w-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative"
        >
          {/* Shadow/Glitch Layer */}
          <h1 className="font-teko text-[6rem] sm:text-[10rem] md:text-[16rem] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-950 select-none absolute top-1 left-1 md:top-2 md:left-2 blur-sm opacity-50 w-full text-center">
            FLAVIUM
          </h1>
          
          {/* Real Text */}
          <h1 className="font-teko text-[6rem] sm:text-[10rem] md:text-[16rem] leading-[0.8] tracking-tighter text-white mix-blend-overlay w-full text-center">
            FLAVIUM
          </h1>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4 md:gap-6 mt-4 md:mt-8"
        >
          <div className="h-[1px] w-12 md:w-24 bg-[#fbbf24]" />
          <p className="font-mono text-[#fbbf24] tracking-[0.2em] md:tracking-[0.5em] text-[10px] md:text-sm uppercase">
            Official Broadcast • 2026
          </p>
          <div className="h-[1px] w-12 md:w-24 bg-[#fbbf24]" />
        </motion.div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20" />
         <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/20" />
      </div>
    </section>
  );
};

export default BroadcastHero;