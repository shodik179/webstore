import { NavLink, Link } from 'react-router-dom';
import { ADMIN_WA } from '../utils/config';
import { MessageCircle, Menu, X, HelpCircle, Gem, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleContact = () => {
    window.open(`https://wa.me/${ADMIN_WA}`, "_blank");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-4 flex items-center justify-between h-[64px]">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0" onClick={() => setMobileOpen(false)}>
          <div className="bg-white p-1 sm:p-1.5 rounded-xl flex items-center justify-center w-8.5 h-8.5 sm:w-10 sm:h-10 border border-slate-700/30">
            <Gem className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-[#0F172A] stroke-[2]" />
          </div>
          <div className="flex flex-col text-left">
            <div className="leading-none mb-0.5 flex items-baseline gap-1 sm:gap-1.5">
              <span className="font-display font-black text-base sm:text-xl tracking-tight text-white">AP</span>
              <span className="text-[#0EA5E9] font-light text-xs sm:text-base opacity-60">|</span>
              <span className="font-display font-semibold text-xs sm:text-sm tracking-tight text-slate-100">Akun Premium</span>
            </div>
            <span className="text-[7.5px] sm:text-[8.5px] font-extrabold tracking-[0.14em] sm:tracking-[0.16em] text-slate-300 uppercase leading-none">PREMIUM - DIGITAL - STORE</span>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden sm:flex gap-6 items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-semibold transition-all relative py-1 ${
                isActive
                  ? 'text-[#0EA5E9] font-bold after:content-[""] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#0EA5E9] after:rounded-full after:shadow-[0_0_8px_rgba(14,165,233,0.8)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`
            }
          >
            Produk
          </NavLink>
          <NavLink
            to="/jasa"
            className={({ isActive }) =>
              `text-xs font-bold px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 border relative ${isActive
                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#0284c7] border-transparent text-white shadow-md shadow-[#0EA5E9]/20'
                : 'border-[#0EA5E9]/30 text-slate-200 hover:text-white hover:border-[#0EA5E9]/60 hover:bg-[#0EA5E9]/5'
              }`
            }
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Jasa Tugas &amp; Skripsi</span>
            <span className="absolute -top-1.5 -right-2 text-[8px] bg-sky-500 text-white font-extrabold px-1 rounded-full animate-bounce scale-90">LIVE</span>
          </NavLink>
          <NavLink
            to="/cara-order"
            className={({ isActive }) =>
              `text-xs font-bold px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 border ${isActive
                ? 'bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/20'
                : 'border-[#0EA5E9]/30 text-[#0EA5E9] hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/10'
              }`
            }
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Cara Order
          </NavLink>

          <button
            onClick={handleContact}
            className="bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#0EA5E9]/20"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi Kami
          </button>
        </div>
        <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
          <NavLink
            to="/cara-order"
            className={({ isActive }) =>
              `text-[10.5px] font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 border ${isActive
                ? 'bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-sm'
                : 'border-[#0EA5E9]/40 text-[#0EA5E9] hover:bg-[#0EA5E9]/10'
              }`
            }
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Cara Order
          </NavLink>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-1 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-[#0F172A] border-t border-slate-800 px-4 py-4 flex flex-col gap-3">
          <NavLink
            to="/"
            end
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `text-sm font-semibold py-2.5 px-3 rounded-lg transition-all flex items-center gap-2.5 border-l-2 ${
                isActive
                  ? 'border-[#0EA5E9] bg-[#0EA5E9]/5 text-[#0EA5E9] font-bold'
                  : 'border-transparent text-[#94A3B8] hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            Produk Akun
          </NavLink>
          <NavLink
            to="/jasa"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `text-sm font-semibold py-2.5 px-3 rounded-lg transition-all flex items-center justify-between border-l-2 ${
                isActive
                  ? 'border-[#0EA5E9] bg-gradient-to-r from-[#0EA5E9]/10 to-transparent text-white font-bold'
                  : 'border-transparent text-[#94A3B8] hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Layanan Jasa</span>
            </div>
            <span className="text-[7.5px] bg-[#0EA5E9] text-white font-black px-1.5 py-0.5 rounded-full animate-pulse">NEW LIVE</span>
          </NavLink>
          <NavLink
            to="/cara-order"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all border ${isActive
                ? 'bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/20'
                : 'bg-slate-800/40 border-slate-700 text-[#0EA5E9] hover:bg-slate-800'
              }`
            }
          >
            <HelpCircle className="w-4 h-4" />
            Cara Order
          </NavLink>

          {/* Footer links accessible from mobile menu too */}
          <div className="border-t border-slate-800 pt-3 mt-1 flex gap-4">
            <NavLink
              to="/privacy"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-[#0EA5E9]' : 'text-slate-500 hover:text-slate-300'
                }`
              }
            >
              Kebijakan Privasi
            </NavLink>
            <span className="text-slate-700 text-xs">-</span>
            <NavLink
              to="/terms"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-[#0EA5E9]' : 'text-slate-500 hover:text-slate-300'
                }`
              }
            >
              Syarat &amp; Ketentuan
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
