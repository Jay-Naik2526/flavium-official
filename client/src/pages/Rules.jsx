import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, ShieldAlert, ScrollText, CheckCircle2 } from 'lucide-react';

const Rules = () => {
  const [activeTab, setActiveTab] = useState('Cricket (Boys)');

  const ruleBook = {
    "Cricket (Boys)": [
      "Registration: One team per batch.",
      "Squad Size: Minimum 11, Maximum 15 players.",
      "Format: 8 overs per match (League/Knockout).",
      "Rules: Standard ICC rules. Powerplay applicable for first 2 overs.",
      "Tie-Breaker: Super Over or Coin Toss depending on stage."
    ],
    "Box Cricket (Girls)": [
      "Registration: One team per batch.",
      "Squad Size: Minimum 7, Maximum 9 players.",
      "Bowling: Underarm bowling is compulsory.",
      "Umpire's decision is final and binding."
    ],
    "Football": [
      "Format: 7-a-side game (9 playing + 3 subs = Max 12 squad).",
      "Substitutions: Rolling substitutions allowed.",
      "Rules: Standard FIFA rules apply.",
      "Discipline: Red card leads to immediate suspension.",
      "Tie-Breaker: Penalty shootout (3 kicks) in knockouts."
    ],
    "Basketball": [
      "Squad: 5 on court + subs (Max 12 total).",
      "Duration: 4 quarters of 10 minutes (or 8 mins as per schedule).",
      "Timeouts: Allowed as per FIBA rules.",
      "Tie-Breaker: Extra time period of 5 minutes."
    ],
    "Volleyball": [
      "Squad: 6 playing + 6 substitutes (Max 12).",
      "Format: Best of 3 sets for knockouts.",
      "Rotation: Standard clockwise rotation rules apply."
    ],
    "Badminton": [
      "Entry Limit: Max 3 teams per branch.",
      "Team Composition: 3-4 players per team.",
      "Format: Singles → Doubles → Singles.",
      "Scoring: Best of 3 games (Points 15/21 decided by referee).",
      "Restriction: A player can play only 1 Singles and 1 Doubles."
    ],
    "Lawn Tennis": [
      "Entry Limit: Max 3 teams per batch.",
      "Squad: 4 players per team.",
      "Events: Singles and Doubles matches.",
      "Restriction: Player can play max 1 Singles and 1 Doubles."
    ],
    "Table Tennis": [
      "Entry Limit: Max 3 teams per branch.",
      "Squad: 4 fixed members.",
      "Format: 2 Singles + 1 Doubles.",
      "Restriction: One player can play both Singles and Doubles."
    ],
    "Athletics": [
      "Track Events: 100m, 200m, 400m Sprints.",
      "Field Events: Shot Put.",
      "Relay: 4x100m (Separate team event).",
      "Limit: A participant can do max 2 individual events."
    ],
    "Swimming": [
      "Boys Events: Freestyle, Backstroke, Breaststroke, Butterfly.",
      "Girls Events: Freestyle only.",
      "Distances: 50m / 25m.",
      "Limits (Boys): Max 2 individual + 1 relay.",
      "Limits (Girls): Max 2 individual + 1 relay."
    ],
    "Powerlifting": [
      "Lifts: Squat, Bench Press, Deadlift.",
      "Attempts: 3 attempts per lift type.",
      "Scoring: Best successful attempt counts towards total."
    ],
    "Tug of War": [
      "Squad: 8 playing + 3 substitutes.",
      "Technique: Rope must be held with hands only (no wrapping around body).",
      "Gear: Bare feet or sports shoes required (No spikes)."
    ],
    "Chess": [
      "Format: Individual event open to all batches.",
      "Rules: FIDE rules (Touch-and-move) apply.",
      "Clock: Rapid format (10/15 mins) may apply."
    ],
    "Carrom": [
      "Format: Singles and Doubles.",
      "Fouls: Striking before referee signal is a foul.",
      "Progression: Winner promoted, loser eliminated."
    ],
    "8 Ball Pool": [
      "Eligibility: Boys only.",
      "Entry Limit: Max 3 entries per branch.",
      "Format: Knockout basis."
    ]
  };

  const currentRules = ruleBook[activeTab] || [];

  return (
    <div className="min-h-screen pb-20 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 md:mb-12 border-b border-white/10 pb-6">
          <div className="p-3 bg-[#fbbf24] rounded-xl text-black w-fit">
             <Gavel size={32} />
          </div>
          <div>
            <h1 className="font-teko text-5xl md:text-6xl text-white uppercase tracking-wide leading-none">
              Official Rulebook
            </h1>
            <p className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest">
              Flavium 2026 Guidelines
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* NAVIGATION */}
          {/* MOBILE: Horizontal Scroll | DESKTOP: Vertical Sidebar */}
          <div className="lg:col-span-1">
             <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-3 px-1">
                Select Sport
             </h3>
             <div 
               className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[70vh] pb-4 lg:pb-0 pr-2 snap-x scrollbar-hide"
               data-lenis-prevent="true"
             >
               {Object.keys(ruleBook).map((category) => (
                 <button
                   key={category}
                   onClick={() => setActiveTab(category)}
                   className={`
                     relative flex-shrink-0 snap-start transition-all duration-300 group overflow-hidden border
                     /* Mobile Styles (Pill) */
                     px-6 py-2 rounded-full text-sm font-bold uppercase whitespace-nowrap
                     /* Desktop Styles (Card) */
                     lg:w-full lg:text-left lg:px-4 lg:py-4 lg:rounded-xl lg:text-lg lg:whitespace-normal
                     ${
                       activeTab === category 
                         ? 'bg-[#fbbf24] text-black border-[#fbbf24] lg:bg-zinc-800 lg:text-white lg:border-zinc-700' 
                         : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-white'
                     }
                   `}
                 >
                   <div className="relative z-10 flex justify-between items-center gap-3">
                     <span className="font-teko tracking-wide">{category}</span>
                     {/* Check Icon only on Desktop */}
                     {activeTab === category && <CheckCircle2 size={16} className="text-[#fbbf24] hidden lg:block" />}
                   </div>
                   
                   {/* Desktop Active Bar */}
                   {activeTab === category && (
                     <motion.div
                       layoutId="activeTab"
                       className="absolute left-0 top-0 bottom-0 w-1 bg-[#fbbf24] hidden lg:block"
                     />
                   )}
                 </button>
               ))}
             </div>
          </div>

          {/* CONTENT AREA */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[400px]"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 text-zinc-800/20 pointer-events-none">
                  <ShieldAlert size={150} />
                </div>

                <h2 className="font-teko text-4xl md:text-5xl text-[#fbbf24] mb-8 uppercase tracking-wide flex flex-col md:flex-row md:items-center gap-2 md:gap-3 relative z-10">
                  {activeTab} <span className="text-zinc-600 text-2xl md:text-3xl">// Protocols</span>
                </h2>

                <div className="space-y-3 relative z-10">
                  {currentRules.length > 0 ? (
                    currentRules.map((rule, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 bg-black/20"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[#fbbf24] font-mono text-xs border border-zinc-700 mt-1">
                          {index + 1}
                        </span>
                        <p className="text-zinc-300 text-sm md:text-lg font-light leading-relaxed">
                          {rule}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-zinc-500 font-mono italic">No specific rules listed.</div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-zinc-500 text-xs font-mono">
                  <ScrollText size={14} />
                  <span>Official Disputes? Contact Committee.</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Rules;