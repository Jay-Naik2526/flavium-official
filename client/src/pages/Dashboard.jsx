import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import axios from 'axios';
import { Users, Trophy, Activity, Zap, CalendarDays, Dumbbell } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import BroadcastHero from '../components/BroadcastHero';
import BranchWar from '../components/BranchWar';

import { API_URL, SOCKET_URL } from '../config';

const CATEGORIES = [
  { id: 'Team', label: 'Team Sports', icon: Users },
  { id: 'Racket', label: 'Racket Sports', icon: Activity },
  { id: 'Athletics', label: 'Athletics', icon: Zap },
  { id: 'Indoor', label: 'Indoor', icon: Trophy },
  { id: 'Other', label: 'Other Sports', icon: Dumbbell },
];

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [activeGender, setActiveGender] = useState('Boys');
  const [activeCategory, setActiveCategory] = useState('Team');

  useEffect(() => {
    axios.get(API_URL).then(res => setMatches(res.data)).catch(console.error);
    const socket = io(SOCKET_URL);
    socket.on('matchUpdated', (updated) => setMatches(prev => prev.map(m => m._id === updated._id ? updated : m)));
    socket.on('matchCreated', (m) => setMatches(prev => [...prev, m]));
    socket.on('matchDeleted', (id) => setMatches(prev => prev.filter(m => m._id !== id)));
    return () => socket.disconnect();
  }, []);

  const filteredMatches = matches.filter(m => 
    m.gender === activeGender && 
    m.category === activeCategory &&
    m.status !== 'Finished'
  );

  const liveMatches = filteredMatches.filter(m => m.status === 'Live');
  const upcomingMatches = filteredMatches.filter(m => m.status === 'Upcoming');

  const groupedUpcoming = upcomingMatches.reduce((groups, match) => {
    const date = match.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(match);
    return groups;
  }, {});
  const sortedDates = Object.keys(groupedUpcoming).sort();

  return (
    <div className="min-h-screen pb-20">
      <BroadcastHero />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* BRANCH WAR WIDGET */}
        <BranchWar matches={matches} />

        {/* CONTROLS - MOBILE OPTIMIZED */}
        <div className="sticky top-20 z-40 bg-zinc-950/90 backdrop-blur-lg border-y border-white/5 py-4 mb-8 -mx-4 px-4 md:mx-0 md:rounded-2xl md:border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Gender Toggle */}
            <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5 relative w-full md:w-auto">
              {['Boys', 'Girls'].map(g => (
                <button 
                  key={g} onClick={() => setActiveGender(g)} 
                  className={`relative z-10 flex-1 px-6 py-2 rounded-lg text-sm font-black uppercase tracking-wider transition-all ${activeGender === g ? 'text-black' : 'text-zinc-500'}`}
                >
                  {g}
                  {activeGender === g && <motion.div layoutId="genderHighlight" className="absolute inset-0 bg-[#fbbf24] rounded-lg -z-10" />}
                </button>
              ))}
            </div>

            {/* Category Scroll */}
            <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide snap-x">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 text-sm font-black uppercase italic tracking-wider px-2 pb-1 border-b-2 transition-all whitespace-nowrap snap-start flex-shrink-0 ${activeCategory === cat.id ? 'border-[#fbbf24] text-[#fbbf24]' : 'border-transparent text-zinc-600'}`}
                >
                  <cat.icon size={14} /> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LIVE MATCHES */}
        {liveMatches.length > 0 && (
          <div className="mb-16">
            <h2 className="font-teko text-4xl text-white mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"/> Live Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.map(m => <MatchCard key={m._id} match={m} />)}
            </div>
          </div>
        )}

        {/* UPCOMING MATCHES */}
        {sortedDates.length > 0 ? (
          sortedDates.map(date => (
            <div key={date} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-[#fbbf24]">
                  <CalendarDays size={20} />
                </div>
                <h2 className="font-teko text-3xl text-white uppercase tracking-wide">
                  {date} <span className="text-zinc-600">// Schedule</span>
                </h2>
                <div className="h-[1px] flex-1 bg-zinc-800"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedUpcoming[date].map(m => <MatchCard key={m._id} match={m} />)}
              </div>
            </div>
          ))
        ) : (
          !liveMatches.length && (
            <div className="py-20 text-center text-zinc-600 font-mono">
              No scheduled matches found for this category.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;