import { ShieldCheck, Zap, Star, MessageSquare, Sparkles, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-white border border-slate-100 rounded-3xl mx-4 sm:mx-0 mt-4 mb-6 sm:mt-8 sm:mb-12 shadow-sm overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e902_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e902_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-50/50 rounded-full blur-3xl opacity-40 -mr-20 -mt-20 pointer-events-none" />

      <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-16 lg:py-20 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* Left Column: Text & CTAs */}
        <div className="flex-[1.2] text-center lg:text-left flex flex-col items-center lg:items-start w-full">
          
          {/* Top Pill Badge (Replaced Layanan Resmi & Terjamin) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E0F2FE] rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-4 sm:mb-6 text-[#0369A1] border border-[#BAE6FD]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0EA5E9]" />
            SOLUSI AKUN PREMIUM TERPERCAYA
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight mb-4 sm:mb-6 tracking-tight">
            Akses Akun Premium <br className="hidden sm:inline" />
            <span className="text-[#0EA5E9] bg-gradient-to-r from-[#0EA5E9] to-[#0284c7] bg-clip-text text-transparent">Instan & Bergaransi</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[#94A3B8] text-xs sm:text-sm lg:text-base max-w-xl mb-6 sm:mb-8 leading-relaxed font-medium">
            Nikmati layanan streaming, musik, produktivitas, dan hiburan premium tanpa hambatan. Proses cepat hanya 5 menit via WhatsApp.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto mb-6 sm:mb-8">
            <a
              href="#katalog"
              className="w-full sm:w-auto bg-[#0EA5E9] hover:bg-[#0369A1] text-white font-bold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all shadow-lg shadow-[#0EA5E9]/20 hover:shadow-xl hover:-translate-y-0.5 transform duration-200 text-xs sm:text-sm text-center cursor-pointer"
            >
              Pilih Akun Sekarang
            </a>
            
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#0F172A] border border-slate-200 font-bold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all hover:-translate-y-0.5 transform duration-200 text-xs sm:text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0EA5E9]" />
              Hubungi Admin
            </a>
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
        </div>

        {/* Right Column: Trust Badges Stack (Hidden on mobile/tablet to avoid scrolling pileup, shown only on desktop lg) */}
        <div className="hidden lg:flex flex-[0.8] w-full flex-col items-center justify-center">
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            
            {/* Badge 1: Layanan Terpercaya */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#0EA5E9]/30 transition-all duration-300 hover:bg-slate-50/50">
              <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-[#0EA5E9]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-[#0F172A]">Layanan Terpercaya</h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">Proses aman & bergaransi penuh</p>
              </div>
            </div>
            
            {/* Badge 2: Proses Instan */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#0EA5E9]/30 transition-all duration-300 hover:bg-slate-50/50">
              <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#0EA5E9]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-[#0F172A]">Proses Instan</h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">Langsung aktif dalam 5 menit</p>
              </div>
            </div>

            {/* Badge 3: Garansi Penuh */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#0EA5E9]/30 transition-all duration-300 hover:bg-slate-50/50">
              <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-[#0EA5E9] fill-[#0EA5E9]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-[#0F172A]">Garansi Penuh</h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">Jaminan proteksi aktif penuh</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
