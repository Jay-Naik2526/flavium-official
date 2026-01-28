import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Calendar } from 'lucide-react';
import MatchCard from '../components/MatchCard';

// Ensure this matches your backend port (5000 based on your settings)
import { API_URL } from '../config';

const Results = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(API_URL);
        // Filter ONLY for 'Finished' matches and reverse (newest first)
        const finishedMatches = res.data
          .filter(m => m.status === 'Finished')
          .reverse();
        
        setMatches(finishedMatches);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* PAGE HEADER */}
        <div className="flex items-center gap-6 mb-16 border-b border-white/10 pb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#fbbf24] blur-2xl opacity-20"></div>
            <div className="relative p-4 bg-zinc-900 border border-[#fbbf24]/30 rounded-2xl text-[#fbbf24]">
               <Trophy size={40} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h1 className="font-teko text-7xl text-white uppercase tracking-tight leading-none">
              Match Results
            </h1>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em] flex items-center gap-2">
              <Crown size={14} className="text-[#fbbf24]" />
              Official Hall of Fame
            </p>
          </div>
        </div>

        {/* RESULTS GRID */}
        {loading ? (
           <div className="text-zinc-600 font-mono animate-pulse">Loading Archives...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {matches.length > 0 ? (
                matches.map((match, index) => (
                  <motion.div
                    key={match._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MatchCard match={match} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-32 text-center bg-zinc-900/30 rounded-3xl border border-white/5"
                >
                  <div className="inline-block p-4 rounded-full bg-zinc-900 mb-4 text-zinc-700">
                    <Calendar size={32} />
                  </div>
                  <h3 className="font-teko text-4xl text-zinc-600 uppercase">No Results Yet</h3>
                  <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mt-2">
                    Matches are currently in progress
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
};

export default Results;