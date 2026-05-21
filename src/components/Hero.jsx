import { ShieldCheck, Zap, Star, MessageSquare, Sparkles, Heart, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const apps = [
  {
    name: 'Netflix',
    category: 'Streaming',
    color: 'from-red-500/10 to-red-500/5 hover:border-red-500/40 hover:shadow-red-500/5',
    tagColor: 'bg-red-50 text-red-600 border-red-100',
    delay: 0,
    duration: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#E50914] w-8 h-8">
        <path d="M4 2v20h4V9l8 13h4V2h-4v13L8 2z" />
      </svg>
    )
  },
  {
    name: 'Spotify',
    category: 'Musik',
    color: 'from-emerald-500/10 to-emerald-500/5 hover:border-emerald-500/40 hover:shadow-emerald-500/5',
    tagColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    delay: 0.8,
    duration: 5.5,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#1DB954] w-8 h-8">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.075-.67-.136-.747-.472-.077-.337.136-.67.472-.747 3.852-.876 7.144-.497 9.82 1.142.296.18.387.564.207.862zm1.226-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.077-1.182-.413.125-.845-.107-.97-.52-.125-.413.107-.845.52-.97 3.673-1.114 8.243-.57 11.343 1.336.366.226.486.706.258 1.076zm.106-2.825C14.398 8.66 8.566 8.467 5.185 9.493c-.52.157-1.073-.14-1.23-.66-.157-.52.14-1.073.66-1.23 3.882-1.178 10.316-.957 14.37 1.45.467.278.62.883.343 1.35-.277.467-.882.62-1.35.343z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    category: 'Hiburan',
    color: 'from-rose-500/10 to-rose-500/5 hover:border-rose-500/40 hover:shadow-rose-500/5',
    tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
    delay: 0.4,
    duration: 4.8,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#FF0000] w-8 h-8">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  {
    name: 'ChatGPT',
    category: 'AI / Kerja',
    color: 'from-cyan-500/10 to-cyan-500/5 hover:border-cyan-500/40 hover:shadow-cyan-500/5',
    tagColor: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    delay: 1.2,
    duration: 5.8,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#10a37f] w-8 h-8">
        <path d="M21.74 11.64a4.19 4.19 0 0 0-.2-1.8c-.46-1.12-1.39-1.94-2.5-2.2a4.42 4.42 0 0 0-3.32.32 4.14 4.14 0 0 0-3.13-1.46c-1.15.02-2.18.6-2.75 1.58a4.4 4.4 0 0 0-2.39-.77 4.19 4.19 0 0 0-3.2 1.5c-.75.87-.99 2.08-.66 3.16a4.42 4.42 0 0 0-.32 3.32 4.14 4.14 0 0 0 1.46 3.13c.87.75 2.08.99 3.16.66a4.4 4.4 0 0 0 3.16.66 4.19 4.19 0 0 0 3.2-1.5c.75-.87.99-2.08.66-3.16a4.42 4.42 0 0 0 .32-3.32c.3-.92.17-1.94-.37-2.75zm-6.19 4.88l-3.3-1.9v-3.8l3.3 1.9v3.8zm-1.15-5.8l-3.3-1.9 3.3-1.9 3.3 1.9-3.3 1.9zm-4.45 1.92L6.8 10.74l3.3-1.9v3.8zm0 1.96v3.8l-3.3-1.9 3.3-1.9zm4.45 3.86l-3.3-1.9 3.3-1.9 3.3 1.9-3.3 1.9zm1.15-5.82l3.3 1.9-3.3 1.9-3.3-1.9 3.3-1.9z" />
      </svg>
    )
  },
  {
    name: 'Canva Pro',
    category: 'Desain',
    color: 'from-violet-500/10 to-violet-500/5 hover:border-violet-500/40 hover:shadow-violet-500/5',
    tagColor: 'bg-violet-50 text-violet-600 border-violet-100',
    delay: 0.2,
    duration: 5.2,
    icon: (
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7d2ae8] to-[#00c4cc] flex items-center justify-center text-white font-display font-extrabold text-xs">
        C
      </div>
    )
  },
  {
    name: 'Disney+',
    category: 'Streaming',
    color: 'from-sky-500/10 to-sky-500/5 hover:border-sky-500/40 hover:shadow-sky-500/5',
    tagColor: 'bg-sky-50 text-sky-600 border-sky-100',
    delay: 1.0,
    duration: 5.6,
    icon: (
      <div className="w-8 h-8 rounded-lg bg-[#00103a] border border-[#00b0ea]/20 flex items-center justify-center text-[#00b0ea] font-sans font-black text-[10px] tracking-tighter">
        D+
      </div>
    )
  }
];

export default function Hero() {
  return (
    <section className="relative bg-white border border-slate-100 rounded-3xl mx-4 sm:mx-0 mt-4 mb-6 sm:mt-8 sm:mb-12 shadow-sm overflow-hidden">
      {/* Background Dotted Motif */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

      {/* Glowing Blob Mesh */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-[#0EA5E9]/10 to-[#8B5CF6]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-violet-400/5 to-fuchsia-400/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-16 lg:py-20 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

        {/* Left Column: Text & CTAs */}
        <div className="flex-[1.1] text-center lg:text-left flex flex-col items-center lg:items-start w-full">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E0F2FE] rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-4 sm:mb-6 text-[#0369A1] border border-[#BAE6FD]">
            <GraduationCap className="w-3.5 h-3.5 text-[#0EA5E9]" />
            LAYANAN PREMIUM & PENULISAN AKADEMIK
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight mb-4 sm:mb-6 tracking-tight">
            Akun Premium Legal & <br className="hidden sm:inline" />
            <span className="text-[#0EA5E9] bg-gradient-to-r from-[#0EA5E9] to-[#0284c7] bg-clip-text text-transparent">Jasa Penulisan Tugas</span>
          </h1>

          {/* Subheadline + Hook */}
          <p className="text-[#94A3B8] text-xs sm:text-sm lg:text-base max-w-xl mb-6 sm:mb-8 leading-relaxed font-semibold">
            Tugas sekolah, kuliah, proposal, atau Skripsi numpuk bikin pusing? Selesaikan instan di sini! Kami menyediakan akun premium, bergaransi & jasa pengerjaan tugas profesional, bebas plagiat, rapi, dan cepat pengerjaannya via WhatsApp.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto mb-6 sm:mb-8">
            <a
              href="#katalog"
              className="w-full sm:w-auto bg-[#0EA5E9] hover:bg-[#0369A1] text-white font-bold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all shadow-lg shadow-[#0EA5E9]/20 hover:shadow-xl hover:-translate-y-0.5 transform duration-200 text-xs sm:text-sm text-center cursor-pointer"
            >
              Beli Akun Premium
            </a>

            <Link
              to="/jasa"
              className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#0F172A] border border-slate-200 font-bold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all hover:-translate-y-0.5 transform duration-200 text-xs sm:text-sm text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#0EA5E9]" />
              Jasa Penulisan Tugas
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-4 sm:gap-6 text-[#94A3B8] text-[10px] sm:text-xs border-t border-slate-100 pt-4 sm:pt-6 w-full justify-center lg:justify-start">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-[#0F172A]">4.9/5</span> Rating Pelanggan
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span className="font-bold text-[#0F172A]">1,000+</span> Transaksi Sukses
            </div>
          </div>

          {/* Compact Logo Row (Mobile/Tablet Only) */}
          <div className="flex lg:hidden flex-wrap items-center justify-center gap-3.5 mt-8 border-t border-slate-100 pt-6 w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block w-full text-center mb-1">Aplikasi Terpopuler</span>
            {apps.map((app, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center flex-shrink-0"
                title={app.name}
              >
                {app.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Illustration (Desktop) */}
        <motion.div
          className="hidden lg:flex flex-[0.9] w-full items-center justify-center"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.img
            src="/hero-illustration.png"
            alt="Premium digital subscription illustration"
            className="w-full max-w-md drop-shadow-xl select-none"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        </motion.div>

      </div>
    </section>
  );
}
