import { Link, NavLink } from 'react-router-dom';
import { Gem, MessageCircle, ShieldCheck } from 'lucide-react';
import { ADMIN_WA } from '../utils/config';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-white p-1.5 rounded-xl flex items-center justify-center w-10 h-10 border border-slate-700/30">
                <Gem className="w-5 h-5 text-[#0F172A] stroke-[2]" />
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
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Platform penjualan akun premium digital terpercaya. Proses instan, bergaransi, dan layanan pelanggan responsif via WhatsApp.
            </p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-slate-400 font-semibold">Transaksi Aman &amp; Terpercaya Sejak 2024</span>
            </div>
            {/* WhatsApp */}
            <div className="flex gap-3 mt-1">
              <a
                href={`https://wa.me/${ADMIN_WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/60 hover:bg-emerald-800/40 transition-all"
                aria-label="WhatsApp Admin"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm tracking-wide">Navigasi</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-slate-400 hover:text-[#0EA5E9] text-xs font-semibold transition-colors">Produk Akun Premium</Link>
              <Link to="/jasa" className="text-slate-400 hover:text-[#0EA5E9] text-xs font-semibold transition-colors flex items-center gap-1.5">
                Jasa Tugas &amp; Skripsi
                <span className="text-[7px] bg-sky-500 text-white font-black px-1 rounded-full">LIVE</span>
              </Link>
              <Link to="/cara-order" className="text-slate-400 hover:text-[#0EA5E9] text-xs font-semibold transition-colors">Cara Order</Link>
              <a href={`https://wa.me/${ADMIN_WA}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0EA5E9] text-xs font-semibold transition-colors">Hubungi Kami</a>
            </div>
          </div>

          {/* Legal & Contact Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm tracking-wide">Legal &amp; Bantuan</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/privacy" className="text-slate-400 hover:text-[#0EA5E9] text-xs font-semibold transition-colors">Kebijakan Privasi</Link>
              <Link to="/terms" className="text-slate-400 hover:text-[#0EA5E9] text-xs font-semibold transition-colors">Syarat &amp; Ketentuan</Link>
            </div>
            <div className="mt-2 pt-4 border-t border-slate-800">
              <p className="text-slate-500 text-[10px] mb-2 font-semibold uppercase tracking-wider">Kontak Langsung</p>
              <a
                href={`https://wa.me/${ADMIN_WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Admin
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-[10px] font-medium">
            &copy; {new Date().getFullYear()} <span className="text-slate-400 font-bold">AkunPremium</span>. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <NavLink to="/privacy" className={({ isActive }) => `text-[10px] font-semibold transition-colors ${isActive ? 'text-[#0EA5E9]' : 'text-slate-600 hover:text-slate-400'}`}>
              Privasi
            </NavLink>
            <span className="text-slate-700">-</span>
            <NavLink to="/terms" className={({ isActive }) => `text-[10px] font-semibold transition-colors ${isActive ? 'text-[#0EA5E9]' : 'text-slate-600 hover:text-slate-400'}`}>
              S&amp;K
            </NavLink>
            <span className="text-slate-700">-</span>
            <a href={`https://wa.me/${ADMIN_WA}`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold text-slate-600 hover:text-slate-400 transition-colors">
              Kontak
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
