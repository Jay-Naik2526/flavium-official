import React from 'react';
import { Phone, Users, UserCircle, Star, ShieldCheck } from 'lucide-react';

const Contact = () => {
  // Data derived from FLAVIUM 2026 all sports guidelines.pdf
  const committee = [
    {
      role: "General Heads",
      icon: Star,
      isHead: true,
      members: [
        { name: "Deshna Sancheti", phone: "92255 68120" },
        { name: "Arnab Chowdhury", phone: "77159 37388" }
      ]
    },
    {
      role: "Cricket, Box Cricket & Football",
      icon: Users,
      members: [
        { name: "Lokesh Chaudhari", phone: "86693 26403" },
        { name: "Vaibhav Gujarathi", phone: "93567 19057" },
        { name: "Manav Goyal", phone: "70165 61558" },
        { name: "Neel Madhav", phone: "85888 66903" },
        { name: "Piyush Jadhav", phone: "80100 57715" },
        { name: "Khushi Surana", phone: "84830 18551", note: "(Girls Box Cricket)" },
        { name: "Tanishq Nandwana", phone: "79841 81918" }
      ]
    },
    {
      role: "Basketball",
      icon: Users,
      members: [
        { name: "Shruti Mishra", phone: "94074 87672" },
        { name: "Rakshit Rajput", phone: "96990 65304" }
      ]
    },
    {
      role: "Volleyball",
      icon: Users,
      members: [
        { name: "Vedashree Lade", phone: "84849 42442" },
        { name: "Tejas Patil", phone: "86687 02593" }
      ]
    },
    {
      role: "Badminton",
      icon: Users,
      members: [
        { name: "Bijal Jain", phone: "97670 72802" },
        { name: "Soham Lashkary", phone: "97846 78030" },
        { name: "Vedant Bhatt", phone: "79847 45445" }
      ]
    },
    {
      role: "Tug of War",
      icon: Users,
      members: [
        { name: "Dev Shah", phone: "84880 04462" },
        { name: "Aditya Faujdaar", phone: "83063 52264" }
      ]
    },
    {
      role: "Indoor (TT, Chess, Pool, Carrom)",
      icon: Users,
      members: [
        { name: "Niyati Sabalpara", phone: "84889 33453" },
        { name: "Divyanshu Kumbe", phone: "75818 50015" }
      ]
    },
    {
      role: "Gym Events (Powerlifting)",
      icon: Users,
      members: [
        { name: "Bhavesh Supe", phone: "93707 44521" },
        { name: "Aditya Faujdaar", phone: "83063 52264" }
      ]
    },
    {
      role: "Swimming",
      icon: Users,
      members: [
        { name: "Ishita Tripathi", phone: "84709 87417" },
        { name: "Arjun Pakhan", phone: "88509 20026" }
      ]
    },
    {
      role: "Lawn Tennis",
      icon: Users,
      members: [
        { name: "Harsh Bansal", phone: "78285 24405" }
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="flex items-center gap-6 mb-16 border-b border-white/10 pb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#fbbf24] blur-2xl opacity-20"></div>
            <div className="relative p-4 bg-zinc-900 border border-[#fbbf24]/30 rounded-2xl text-[#fbbf24]">
               <ShieldCheck size={40} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h1 className="font-teko text-7xl text-white uppercase tracking-tight leading-none">
              Committee
            </h1>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em]">
              Organizing Team • 2026
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committee.map((group, i) => (
            <div 
              key={i} 
              className={`border rounded-3xl p-8 transition-all group relative overflow-hidden
                ${group.isHead 
                  ? 'bg-[#fbbf24] border-[#fbbf24] col-span-1 md:col-span-2 lg:col-span-3 shadow-[0_0_40px_-10px_rgba(251,191,36,0.4)]' 
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-[#fbbf24]/30'
                }`}
            >
              {/* Background Glow for Heads */}
              {group.isHead && (
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Star size={200} fill="black" stroke="none" />
                </div>
              )}

              <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${group.isHead ? 'border-black/10' : 'border-white/5'}`}>
                <group.icon className={group.isHead ? 'text-black' : 'text-[#fbbf24] opacity-50'} size={group.isHead ? 28 : 20} />
                <h3 className={`font-teko text-3xl uppercase transition-colors ${group.isHead ? 'text-black font-bold' : 'text-white group-hover:text-[#fbbf24]'}`}>
                  {group.role}
                </h3>
              </div>
              
              <div className={`grid gap-4 ${group.isHead ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {group.members.map((member, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg mt-1 ${group.isHead ? 'bg-black/10 text-black' : 'bg-black text-zinc-500'}`}>
                      <UserCircle size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`font-bold leading-none ${group.isHead ? 'text-black text-xl' : 'text-zinc-200'}`}>{member.name}</p>
                        {member.note && <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded text-black font-bold uppercase">{member.note}</span>}
                      </div>
                      <a 
                        href={`tel:${member.phone.replace(/\s/g, '')}`} 
                        className={`text-xs font-mono flex items-center gap-2 transition-colors mt-1 font-bold
                          ${group.isHead ? 'text-black/60 hover:text-black' : 'text-zinc-500 hover:text-[#fbbf24]'}`}
                      >
                        <Phone size={12} /> +91 {member.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Contact;