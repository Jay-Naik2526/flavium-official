import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Crown, Medal, TrendingUp } from 'lucide-react';

const BranchWar = ({ matches }) => {
  
  // --- CONFIGURATION: SUPER TEAMS ---
  // If "TY GIRLS" wins, ALL these branches get the medal.
  const SUPER_TEAMS = {
    "TY GIRLS": ["TY CS", "TY CE", "TY IT", "TY MBA TECH", "TY AIML"],
    // You can add more combined teams here if needed, e.g.:
    // "FY COMMON": ["FY CS", "FY MECH"] 
  };

  const getTeamEntity = (teamName) => {
    if (!teamName) return 'UNKNOWN';
    const raw = teamName.toUpperCase().trim();
    
    // Normalize Years
    let norm = raw
      .replace(/\bFIRST YEAR\b/g, 'FY')
      .replace(/\bSECOND YEAR\b/g, 'SY')
      .replace(/\bTHIRD YEAR\b/g, 'TY')
      .replace(/\bFINAL YEAR\b/g, 'LY')
      .replace(/\bFINAL\b/g, 'LY');

    // Pattern: "TY CS"
    const prefixMatch = norm.match(/^(FY|SY|TY|LY|BTECH|MBA|MTECH)[\s-]+([A-Z0-9]+)/);
    if (prefixMatch) return `${prefixMatch[1]} ${prefixMatch[2]}`;

    // Pattern: "CS TY"
    const suffixMatch = norm.match(/^([A-Z0-9]+)[\s-]+(FY|SY|TY|LY|BTECH|MBA|MTECH)/);
    if (suffixMatch) return `${suffixMatch[2]} ${suffixMatch[1]}`;

    return norm.split(/[\s-]/)[0];
  };

  const standings = useMemo(() => {
    const tally = {};

    // Helper to add points
    const addPoints = (teamName, type) => {
      // Check if this team is a "Super Team" (e.g., TY GIRLS)
      const subTeams = SUPER_TEAMS[teamName];

      if (subTeams) {
        // If it's a super team, distribute medals to ALL sub-branches
        subTeams.forEach(sub => {
          if (!tally[sub]) tally[sub] = { G: 0, S: 0 };
          if (type === 'G') tally[sub].G += 1;
          if (type === 'S') tally[sub].S += 1;
        });
      } else {
        // Normal single team
        if (!tally[teamName]) tally[teamName] = { G: 0, S: 0 };
        if (type === 'G') tally[teamName].G += 1;
        if (type === 'S') tally[teamName].S += 1;
      }
    };

    matches.forEach(match => {
      // Logic: Only count 'Final' matches (Gold/Silver)
      if (match.status === 'Finished' && match.winner && match.medalRound === 'Final') {
        
        const winnerEntity = getTeamEntity(match.winner);
        const loserName = match.winner === match.teamA.name ? match.teamB.name : match.teamA.name;
        const loserEntity = getTeamEntity(loserName);

        // Distribute Medals (Handles both regular and super teams)
        addPoints(winnerEntity, 'G');
        addPoints(loserEntity, 'S');
      }
    });

    // Sort: Gold > Silver
    return Object.entries(tally)
      .map(([name, medals]) => ({ name, ...medals }))
      .sort((a, b) => {
        if (b.G !== a.G) return b.G - a.G;
        return b.S - a.S;
      })
      .slice(0, 10);
  }, [matches]);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#fbbf24] rounded-lg text-black">
          <Crown size={24} strokeWidth={2.5} />
        </div>
        <h2 className="font-teko text-4xl text-white uppercase tracking-wide">
          Medal Tally <span className="text-zinc-600">// Year-Wise</span>
        </h2>
      </div>

      {standings.length > 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr] md:grid-cols-5 bg-black/40 p-3 md:p-4 border-b border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center items-center">
            <div className="md:col-span-3 text-left pl-2 md:pl-4 truncate">Class / Branch</div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 text-[#fbbf24]">
              <Medal size={12} md:size={14} /> 
              <span className="hidden md:inline">Gold</span>
              <span className="md:hidden">G</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 text-zinc-300">
              <Medal size={12} md:size={14} /> 
              <span className="hidden md:inline">Silver</span>
              <span className="md:hidden">S</span>
            </div>
          </div>

          {/* List */}
          {standings.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`grid grid-cols-[2fr_1fr_1fr] md:grid-cols-5 p-3 md:p-4 items-center text-center border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors
                ${index === 0 ? 'bg-gradient-to-r from-[#fbbf24]/10 to-transparent' : ''}`}
            >
              <div className="md:col-span-3 flex items-center gap-2 md:gap-4 pl-2 md:pl-4 overflow-hidden">
                <span className={`text-[10px] md:text-xs font-mono font-bold w-4 md:w-6 text-left flex-shrink-0 ${index === 0 ? 'text-[#fbbf24]' : 'text-zinc-600'}`}>
                  #{index + 1}
                </span>
                <span className="font-teko text-xl md:text-2xl text-white tracking-wide truncate">
                  {team.name}
                </span>
              </div>
              
              <div className="font-teko text-xl md:text-2xl text-[#fbbf24] font-bold">{team.G}</div>
              <div className="font-teko text-xl md:text-2xl text-zinc-400 font-bold">{team.S}</div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-10 text-center flex flex-col items-center">
          <div className="p-4 bg-zinc-900 rounded-full mb-4">
            <TrendingUp className="text-zinc-700" size={32} />
          </div>
          <h3 className="text-zinc-500 font-teko text-3xl uppercase tracking-wide">Competition Has Begun</h3>
          <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest mt-2 max-w-md">
            Medal standings will populate automatically after the first Final match concludes.
          </p>
        </div>
      )}
    </div>
  );
};

export default BranchWar;