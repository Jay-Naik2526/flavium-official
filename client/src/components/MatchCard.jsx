import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Trophy, Medal, Percent } from 'lucide-react';
import axios from 'axios';
import { VOTE_URL } from '../config';
const MatchCard = ({ match }) => {
  const isLive = match.status === 'Live';
  const isFinished = match.status === 'Finished';
  const isUpcoming = match.status === 'Upcoming';
  
  // Voting State
  const [hasVoted, setHasVoted] = useState(false);
  const [voting, setVoting] = useState(false);

  // Check Local Storage to persist vote state
  useEffect(() => {
    const votedMatches = JSON.parse(localStorage.getItem('votedMatches') || '{}');
    if (votedMatches[match._id]) setHasVoted(true);
  }, [match._id]);

  // Handle Vote
  const handleVote = async (team) => {
    if (hasVoted || voting) return;
    setVoting(true);

    try {
        await axios.post(VOTE_URL(match._id), { team });
      
      const votedMatches = JSON.parse(localStorage.getItem('votedMatches') || '{}');
      votedMatches[match._id] = true;
      localStorage.setItem('votedMatches', JSON.stringify(votedMatches));
      
      setHasVoted(true);
    } catch (err) {
      console.error("Vote failed", err);
    } finally {
      setVoting(false);
    }
  };

  // Safe Calculation of Percentages
  const votesA = match.votes?.teamA || 0;
  const votesB = match.votes?.teamB || 0;
  const totalVotes = votesA + votesB;
  
  const teamAPercent = totalVotes === 0 ? 50 : Math.round((votesA / totalVotes) * 100);
  const teamBPercent = totalVotes === 0 ? 50 : Math.round((votesB / totalVotes) * 100);

  return (
    <motion.div
      layout
      className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all flex flex-col justify-between min-h-[220px]
        ${isLive 
          ? 'border-red-500/50 bg-zinc-900/80 shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]' 
          : isFinished
            ? 'border-[#fbbf24]/20 bg-zinc-900/40 opacity-80'
            : 'border-zinc-800 bg-zinc-900/40'
        }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700">
              {match.sportName}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700">
              {match.gender}
            </span>
          </div>
          {match.roundName && (
             <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1">{match.roundName}</span>
          )}
        </div>
        
        {isLive ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> LIVE
          </div>
        ) : isFinished ? (
           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/20 text-[#fbbf24] text-[10px] font-black uppercase tracking-widest">
            <Medal size={10} /> FINISHED
          </div>
        ) : (
          <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
            <Clock size={12} /> {match.time}
          </div>
        )}
      </div>

      {/* TEAMS */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-left w-1/3 truncate">
          <h3 className={`font-teko text-3xl leading-none tracking-wide truncate ${match.winner === match.teamA.name ? 'text-[#fbbf24]' : 'text-white'}`}>
            {match.teamA.name}
          </h3>
        </div>

        <div className="bg-black/50 px-3 py-1 rounded-xl border border-zinc-800 font-teko text-4xl text-white tracking-widest min-w-[80px] text-center">
          {isLive || isFinished ? (
            <div className="flex gap-2 justify-center">
               <span className={match.teamA.score > match.teamB.score ? 'text-[#fbbf24]' : 'text-zinc-400'}>{match.teamA.score}</span>
               <span className="text-zinc-700">:</span>
               <span className={match.teamB.score > match.teamA.score ? 'text-[#fbbf24]' : 'text-zinc-400'}>{match.teamB.score}</span>
            </div>
          ) : (
            <span className="text-zinc-700 text-2xl">VS</span>
          )}
        </div>

        <div className="text-right w-1/3 truncate">
          <h3 className={`font-teko text-3xl leading-none tracking-wide truncate ${match.winner === match.teamB.name ? 'text-[#fbbf24]' : 'text-white'}`}>
            {match.teamB.name}
          </h3>
        </div>
      </div>

      {/* --- PREDICTION WIDGET (Only Visible if Upcoming) --- */}
      {isUpcoming && (
        <div className="mt-auto pt-4 border-t border-white/5">
          {!hasVoted ? (
            <div className="flex gap-2">
              <button 
                onClick={() => handleVote('teamA')}
                disabled={voting}
                className="flex-1 py-2 bg-zinc-800 hover:bg-[#fbbf24] hover:text-black text-zinc-400 text-[10px] font-bold uppercase rounded transition-colors flex items-center justify-center gap-1 group"
              >
                 Vote {match.teamA.name}
              </button>
              <button 
                onClick={() => handleVote('teamB')}
                disabled={voting}
                className="flex-1 py-2 bg-zinc-800 hover:bg-[#fbbf24] hover:text-black text-zinc-400 text-[10px] font-bold uppercase rounded transition-colors flex items-center justify-center gap-1 group"
              >
                 Vote {match.teamB.name}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-500 mb-1">
                <span>{match.teamA.name} {teamAPercent}%</span>
                <span>{teamBPercent}% {match.teamB.name}</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${teamAPercent}%` }} 
                  className="h-full bg-[#fbbf24]" 
                />
                <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: `${teamBPercent}%` }} 
                   className="h-full bg-zinc-700" 
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER (Venue) - Hidden if Upcoming because Prediction takes space */}
      {!isUpcoming && (
        <div className="pt-3 border-t border-zinc-800/50 text-[10px] text-zinc-500 font-mono uppercase flex items-center gap-2">
          <MapPin size={12} /> {match.venue}
        </div>
      )}
    </motion.div>
  );
};

export default MatchCard;