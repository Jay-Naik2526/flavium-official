import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Results', path: '/results' },
    { name: 'Rules', path: '/rules' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <img 
                src="/images/flavium-logo.png" 
                alt="Flavium" 
                className="w-12 h-12 object-contain transition-transform group-hover:rotate-12" 
              />
              <h2 className="font-teko text-4xl tracking-wide text-white">FLAVIUM</h2>
            </Link>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              The ultimate arena where passion meets performance. Chase the glory, feel the heat, and leave your mark on the field.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/flavium.mpstme/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 border border-white/5 rounded-full text-zinc-400 hover:text-[#fbbf24] hover:border-[#fbbf24]/30 transition-all flex items-center gap-2 group/link"
              >
                <Instagram size={20} />
                <span className="text-xs font-mono uppercase tracking-widest hidden group-hover/link:block transition-all">Follow the Heat</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-[#fbbf24] font-mono text-sm tracking-[0.2em] uppercase">The Circuit</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-zinc-500 hover:text-white flex items-center gap-2 group transition-colors"
                  >
                    <ChevronRight size={14} className="text-[#fbbf24] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location/Campus */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-[#fbbf24] font-mono text-sm tracking-[0.2em] uppercase">Base of Operations</h3>
            <div className="space-y-4">
              <div className="flex gap-3 text-zinc-400">
                <MapPin size={20} className="shrink-0 text-[#fbbf24]" />
                <p>NMIMS Shirpur Campus,<br />Maharashtra, India</p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest leading-loose">
                  Official Sportfest Broadcast Platform <br />
                  Shirpur Campus • 2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
            © {currentYear} Flavium. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3 px-5 py-2.5 bg-zinc-900/50 border border-white/5 rounded-full group hover:border-[#fbbf24]/20 transition-all">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fbbf24]"></span>
              </span>
              <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-tighter">Designed and Developed By</span>
            </div>
            <span className="text-white font-bold text-xs tracking-widest uppercase group-hover:text-[#fbbf24] transition-colors">
              Jay Naik
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;