import { Link } from 'react-router-dom';
import { Gem } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] py-10 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <Link to="/" className="flex items-center gap-3 justify-center md:justify-start" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-white p-1.5 rounded-xl flex items-center justify-center w-10 h-10 border border-slate-700/30">
              <Gem className="w-5.5 h-5.5 text-[#0F172A] stroke-[2]" />
            </div>
            <div className="flex flex-col text-left">
              <div className="leading-none mb-0.5 flex items-baseline gap-1.5">
                <span className="font-display font-black text-xl tracking-tight text-white">AP</span>
                <span className="text-[#0EA5E9] font-light text-base opacity-60">|</span>
                <span className="font-display font-semibold text-sm tracking-tight text-slate-100">Akun Premium</span>
              </div>
              <span className="text-[8.5px] font-extrabold tracking-[0.16em] text-slate-300 uppercase leading-none">PREMIUM - DIGITAL - STORE</span>
            </div>
          </Link>
          <p className="text-[#94A3B8] text-xs font-semibold mt-2.5">Terpercaya sejak 2024</p>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
          </a>
          <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
