import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, Trash2, Trophy, Plus, Calendar, Medal, Lock, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';

import { API_URL, ADMIN_AUTH_URL } from '../config';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [matches, setMatches] = useState([]);
  const [form, setForm] = useState({
    sportName: 'Cricket', category: 'Team', gender: 'Boys', date: 'Jan 24',
    time: '10:00 AM', venue: 'Ground A', 
    teamA: {name: '', score: 0}, teamB: {name: '', score: 0},
    status: 'Upcoming', roundName: 'League', medalRound: 'None'
  });

  useEffect(() => {
    const session = localStorage.getItem('adminToken');
    if (session === 'admin-access-granted') setIsAuthenticated(true);
  }, []);

  const fetchMatches = () => axios.get(API_URL).then(res => setMatches(res.data));
  useEffect(() => { if(isAuthenticated) fetchMatches(); }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(ADMIN_AUTH_URL, { password });
      if (res.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', 'admin-access-granted');
        setAuthError('');
      }
    } catch (err) {
      setAuthError('Access Denied');
      setPassword('');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    fetchMatches();
    alert("Match Scheduled");
  };

  const handleUpdate = async (id, data) => {
    await axios.patch(`${API_URL}/${id}`, data);
    fetchMatches();
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchMatches();
    }
  };

  const groupedMatches = matches.reduce((groups, match) => {
    const date = match.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(match);
    return groups;
  }, {});
  const sortedDates = Object.keys(groupedMatches).sort();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-center">
          <div className="bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"><Lock className="text-[#fbbf24]" size={32} /></div>
          <h1 className="font-teko text-4xl text-white uppercase mb-2">Restricted Area</h1>
          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            <input type="password" placeholder="Access Key" className="w-full bg-black border border-zinc-700 p-3 rounded-xl text-center text-white focus:border-[#fbbf24] outline-none" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {authError && <p className="text-red-500 text-xs font-bold">{authError}</p>}
            <button className="w-full bg-[#fbbf24] text-black font-black uppercase py-3 rounded-xl flex items-center justify-center gap-2"><Unlock size={18} /> Authenticate</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 max-w-7xl mx-auto px-4 pt-24 md:pt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-zinc-800 pb-6 gap-4">
        <div>
          <h1 className="font-teko text-4xl md:text-5xl text-white uppercase">Command Center</h1>
          <p className="text-[#fbbf24] font-mono text-xs md:text-sm uppercase tracking-widest">Admin Dashboard</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <button onClick={fetchMatches} className="flex-1 md:flex-none p-3 bg-zinc-900 border border-zinc-800 rounded hover:text-[#fbbf24] flex justify-center"><RefreshCw size={20}/></button>
           <button onClick={() => { setIsAuthenticated(false); localStorage.removeItem('adminToken'); }} className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 font-bold uppercase text-xs rounded hover:bg-red-500 hover:text-white">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl sticky top-24">
            <h2 className="font-teko text-3xl text-white uppercase mb-6 flex items-center gap-2"><Plus className="text-[#fbbf24]" size={20} /> Schedule Match</h2>
            <form onSubmit={handleCreate} className="space-y-4">
               <div className="grid grid-cols-2 gap-3">
                 <input className="input-field" placeholder="Sport" value={form.sportName} onChange={e => setForm({...form, sportName: e.target.value})} />
                 <select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                   <option value="Team">Team</option>
                   <option value="Racket">Racket</option>
                   <option value="Athletics">Athletics</option>
                   <option value="Indoor">Indoor</option>
                   <option value="Other">Other</option>
                 </select>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <select className="input-field" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                   <option value="Boys">Boys</option><option value="Girls">Girls</option>
                 </select>
                 <input className="input-field" placeholder="Round" value={form.roundName} onChange={e => setForm({...form, roundName: e.target.value})} />
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                  <input className="input-field" placeholder="Time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
               </div>
               <div className="bg-black/30 p-3 rounded border border-zinc-800">
                  <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Team Names</label>
                  <input className="input-field mb-2" placeholder="Team A (e.g. SY CS)" value={form.teamA.name} onChange={e => setForm({...form, teamA: {...form.teamA, name: e.target.value}})} />
                  <input className="input-field" placeholder="Team B (e.g. TY IT)" value={form.teamB.name} onChange={e => setForm({...form, teamB: {...form.teamB, name: e.target.value}})} />
               </div>
               <input className="input-field" placeholder="Venue" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} />
               <button className="w-full bg-[#fbbf24] py-3 text-black font-black uppercase rounded">Publish</button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {sortedDates.map(date => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-[#fbbf24]" />
                <h3 className="font-teko text-2xl text-white uppercase tracking-wide">{date}</h3>
                <div className="h-[1px] flex-1 bg-zinc-800" />
              </div>
              <div className="space-y-4">
                {groupedMatches[date].map(m => (
                  <div key={m._id} className={`p-4 rounded-xl border ${m.status === 'Live' ? 'bg-zinc-900 border-red-500/30' : 'bg-zinc-900/50 border-zinc-800'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                         <span className="text-[#fbbf24] font-bold text-xs uppercase bg-[#fbbf24]/10 px-2 py-0.5 rounded">{m.sportName}</span>
                         <span className="text-white font-mono text-xs border border-zinc-700 px-2 rounded bg-black">{m.roundName}</span>
                      </div>
                      <button onClick={() => handleDelete(m._id)}><Trash2 size={16} className="text-zinc-600 hover:text-red-500"/></button>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-zinc-800/50">
                       <div className="flex-1 text-right">
                          <div className="text-zinc-300 font-bold text-xs truncate mb-1">{m.teamA.name}</div>
                          <input type="number" className="w-8 md:w-12 bg-zinc-800 text-center text-white rounded p-1 text-sm" value={m.teamA.score} onChange={(e) => handleUpdate(m._id, { teamA: { ...m.teamA, score: e.target.value }})} />
                       </div>
                       <span className="font-teko text-lg text-zinc-600">VS</span>
                       <div className="flex-1 text-left">
                          <div className="text-zinc-300 font-bold text-xs truncate mb-1">{m.teamB.name}</div>
                          <input type="number" className="w-8 md:w-12 bg-zinc-800 text-center text-white rounded p-1 text-sm" value={m.teamB.score} onChange={(e) => handleUpdate(m._id, { teamB: { ...m.teamB, score: e.target.value }})} />
                       </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-4 pt-3 border-t border-white/5">
                       <select className={`status-select w-full ${m.status === 'Live' ? 'text-red-500 border-red-500/50' : 'text-zinc-400 border-zinc-700'}`} value={m.status} onChange={(e) => handleUpdate(m._id, { status: e.target.value })}>
                         <option value="Upcoming">Upcoming</option><option value="Live">Live</option><option value="Finished">Finished</option>
                       </select>
                       {m.status === 'Finished' && (
                         <div className="flex gap-2 w-full">
                           <div className="flex items-center gap-2 bg-[#fbbf24]/10 px-3 rounded border border-[#fbbf24]/30 flex-1">
                             <Trophy size={14} className="text-[#fbbf24]"/>
                             <select className="bg-transparent text-[#fbbf24] text-xs font-bold outline-none w-full" value={m.winner} onChange={(e) => handleUpdate(m._id, { winner: e.target.value })}>
                               <option value="">Winner</option><option value={m.teamA.name}>A</option><option value={m.teamB.name}>B</option>
                             </select>
                           </div>
                           <div className="flex items-center gap-2 bg-blue-500/10 px-3 rounded border border-blue-500/30 flex-1">
                             <Medal size={14} className="text-blue-400"/>
                             <select className="bg-transparent text-blue-400 text-xs font-bold outline-none w-full" value={m.medalRound || 'None'} onChange={(e) => handleUpdate(m._id, { medalRound: e.target.value })}>
                               <option value="None">Regular</option><option value="Final">Gold/Silver</option>
                             </select>
                           </div>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .input-field { width: 100%; background: #000; border: 1px solid #27272a; padding: 0.75rem; color: white; border-radius: 0.5rem; outline: none; }
        .input-field:focus { border-color: #fbbf24; }
        .status-select { background: #000; border: 1px solid; padding: 0.5rem; border-radius: 0.5rem; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; outline: none; }
      `}</style>
    </div>
  );
};
export default Admin;