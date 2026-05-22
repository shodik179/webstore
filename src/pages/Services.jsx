import { useState, useMemo } from 'react';
import Card from '../components/Card';
import SEO from '../components/SEO';
import { useSheetData } from '../hooks/useSheetData';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, GraduationCap, Clock, RefreshCw, ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { ADMIN_WA } from '../utils/config';

// Ganti GID di bawah dengan GID tab Jasa Anda setelah mempublikasikan Tab Jasa di Google Sheets
const JASA_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQaajQvi4gluJ3DN1wGCrPGb_sBepSiGMrnmvjCE1zEhkdlT15fMPuOq0stHn5ZpHVSqJdXT5rxgrDY/pub?gid=919313542&single=true&output=csv";

// Data Jasa Praktis untuk Fallback Database (Memastikan Website Selalu Terisi jika Spreadsheet Kosong/Error)
const MOCK_SERVICES = [
  {
    Nama: 'Pembuatan Makalah Akademik',
    Kategori: 'Akademik',
    Variasi: 'Tingkat SMA = 10000 / halaman, Tingkat Kuliah S1 = 15000 / halaman, Tingkat S2 / Profesional = 25000 / halaman',
    Deskripsi: 'Jasa menyusun makalah ilmiah lengkap (cover, bab pembahasan, daftar pustaka). Rapi sesuai PUEBI, gratis Turnitin report, & garansi revisi minor.',
    Harga: 'Rp 10.000 / halaman',
    Foto1: 'https://res.cloudinary.com/duaacdcyb/image/upload/v1779175277/db_image/duolingo-rounded-logo-without-background-for-language-learning-app-free-png.png'
  },
  {
    Nama: 'Laporan Penelitian / Praktikum',
    Kategori: 'Penelitian',
    Variasi: 'Tingkat SMA = 12000 / halaman, Tingkat Kuliah S1 = 18000 / halaman, Tingkat S2 / Profesional = 30000 / halaman',
    Deskripsi: 'Penyusunan laporan praktikum, laporan hasil penelitian lapangan, olah data statistik, & pembahasan metodologi terstruktur.',
    Harga: 'Rp 12.000 / halaman',
    Foto1: 'https://res.cloudinary.com/duaacdcyb/image/upload/v1779175311/db_image/ad3712d24266a3c4a4b44839d46f9c4f_icon_eio9oe.png'
  },
  {
    Nama: 'Review Jurnal Ilmiah',
    Kategori: 'Analisis',
    Variasi: 'Review Jurnal Nasional = 35000 / jurnal, Review Jurnal Internasional Scopus = 75000 / jurnal',
    Deskripsi: 'Jasa analisis kritis berkas jurnal ilmiah (nasional/internasional), bedah isi metodologi penelitian, & penyusunan ringkasan komparatif.',
    Harga: 'Rp 35.000 / jurnal',
    Foto1: 'https://res.cloudinary.com/duaacdcyb/image/upload/v1779175068/db_image/apple_music-update_hero_08242021.jpg.news_app_ed_cchtco.jpg'
  },
  {
    Nama: 'Penyusunan Proposal / Skripsi',
    Kategori: 'Akademik',
    Variasi: 'Bab 1-3 Proposal = 450000, Full Bab 1-5 Skripsi = 950000',
    Deskripsi: 'Bimbingan, konsultasi, dan penyusunan proposal tugas akhir, bab pendahuluan, metodologi penelitian, hingga olah data dan diskusi pembahasan.',
    Harga: 'Rp 450.000 / paket',
    Foto1: 'https://res.cloudinary.com/duaacdcyb/image/upload/v1779174349/db_image/Canva_Circle_Gradient_20_1_wgfnu8.jpg'
  }
];

export default function Services() {
  const { data: services, loading } = useSheetData(JASA_CSV_URL);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Integrasi database utama & fallback data instan
  const activeServices = useMemo(() => {
    // Memeriksa jika spreadsheet yang ter-fetch adalah tab produk (fallback acak dari GSheets karena GID tidak valid)
    const isActuallyProductsTab = services && services.some(item => {
      const name = item.Nama?.toLowerCase() || '';
      return name.includes('netflix') || name.includes('spotify') || name.includes('youtube') || name.includes('canva') || name.includes('disney');
    });

    if (services && services.length > 0 && !isActuallyProductsTab) {
      return services;
    }
    // Jika spreadsheet kosong/error atau salah tab produk, gunakan mock data agar web tidak kosong
    return MOCK_SERVICES;
  }, [services]);

  // Extract unique categories dynamically dari database aktif
  const categories = useMemo(() => {
    if (!activeServices || activeServices.length === 0) return ['Semua'];
    const unique = new Set(activeServices.map(item => item.Kategori?.trim()).filter(Boolean));
    return ['Semua', ...Array.from(unique)];
  }, [activeServices]);

  const getImagesFromItem = (item) => {
    const imagesList = [];
    const keys = Object.keys(item);

    const imageKeys = keys.filter(key => {
      const k = key.toLowerCase();
      return k.includes('foto') || k.includes('gambar') || k.includes('image') || k.includes('pic');
    }).sort();

    imageKeys.forEach(key => {
      const val = item[key];
      if (val && typeof val === 'string' && val.trim() !== '') {
        imagesList.push(val.trim());
      }
    });

    return imagesList;
  };

  const getVariationsFromItem = (item) => {
    return item.Variasi || item.Variant || item.Varian || '';
  };

  const filteredServices = activeServices.filter(item => {
    const matchesCategory = selectedCategory === 'Semua' ||
      item.Kategori?.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
    const matchesSearch = item.Nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getVariationsFromItem(item).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Deskripsi?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
      <SEO
        title="Jasa Penulisan Tugas & Skripsi Profesional"
        description="Layanan jasa penulis makalah, laporan praktikum, proposal skripsi, dan review jurnal ilmiah berkualitas. Orisinal Turnitin, rapi, dan cepat via WhatsApp."
        keywords="jasa tugas sekolah, jasa buat makalah, jasa tulis proposal skripsi, review jurnal ilmiah, jasa bikin laporan kuliah"
      />

      {/* Premium Hero Jasa */}
      <section className="relative overflow-hidden py-12 md:py-16 px-6 sm:px-12 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white sm:rounded-3xl my-6 shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-10 text-left">
        
        {/* Background ambient light effects */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        {/* Left Column: Hook and Copywriting */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex-1 max-w-2xl text-left space-y-6"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0EA5E9]/10 text-[#0EA5E9] text-xs font-bold rounded-full tracking-wider uppercase border border-[#0EA5E9]/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            TIM AKADEMIK & PENULIS PROFESIONAL
          </motion.span>
          
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
            Tugas Sekolah & Kuliah <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-sky-400 to-[#0284c7]">
              Selesai Tepat Waktu!
            </span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Tugas menumpuk, laporan praktikum sulit, atau pusing menyusun proposal Skripsi? Serahkan pada kami! Tim penulis akademisi kami siap menyusun tugas Anda secara terstruktur, rapi, rahasia, dan <strong className="text-white font-extrabold">100% bebas plagiarisme</strong>.
          </p>

          {/* Hooks / Value Props List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {[
              { text: "Laporan Turnitin Asli (Bebas Plagiat)", desc: "Jaminan orisinalitas karya ilmiah Anda" },
              { text: "Bimbingan & Revisi Minor Gratis", desc: "Konsultasi intensif dengan penulis pilihan" },
              { text: "Pengerjaan Super Cepat (Bisa 24 Jam)", desc: "Membantu Anda menghadapi deadline mendesak" },
              { text: "Privasi Kerahasiaan Aman 100%", desc: "Data pribadi dan tugas Anda dijamin rahasia" }
            ].map((prop, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-[#0EA5E9]/15 text-[#0EA5E9] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#0EA5E9]/20">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{prop.text}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{prop.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
            <a 
              href={`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent('Halo Admin, saya ingin konsultasi mengenai pengerjaan tugas akademik/skripsi saya.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-md shadow-[#0EA5E9]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>Hubungi Admin via WA (Fast Respon)</span>
              </motion.button>
            </a>
            
            <a 
              href="#katalog-jasa"
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto border border-slate-700 bg-slate-900/30 text-slate-300 px-6 py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Lihat Layanan Jasa</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Animated Image and glowing shapes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center items-center relative z-10 w-full max-w-sm lg:max-w-md"
        >
          {/* Outer rotating glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0EA5E9]/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none animate-[pulse_6s_infinite]" />

          {/* Floating Hero Image */}
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full relative"
          >
            <img 
              src="/jasa-hero-premium.webp" 
              alt="Jasa Tugas Akademik Premium Illustration"
              width="1024"
              height="1024"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(14,165,233,0.3)] rounded-3xl"
              onError={(e) => {
                e.target.src = "/favicon.svg";
              }}
            />
          </motion.div>
        </motion.div>

      </section>

      {/* Katalog Jasa Section */}
      <section id="katalog-jasa" className="pt-6 px-4 sm:px-0 scroll-mt-20">
        {/* Header Katalog */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">Layanan Penulisan</h2>
            <p className="text-[#94A3B8] text-sm mt-0.5">Pilih jenis pengerjaan tugas yang Anda butuhkan.</p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari jenis tugas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        {/* Kategori Filter */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer border ${selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-sm shadow-[#0EA5E9]/20'
                  : 'bg-white border-slate-200 text-[#0F172A] hover:bg-slate-50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && services.length === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 animate-pulse mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl h-64" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm mb-8">
            <Search className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-[#0F172A] font-bold text-base">Tidak ada hasil</p>
            <p className="text-sm text-[#94A3B8] mt-1">Coba kata kunci yang berbeda.</p>
          </div>
        )}

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mb-12"
        >
          <AnimatePresence>
            {filteredServices.map((item, idx) => (
              <motion.div
                key={item.Nama + idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  title={item.Nama}
                  variations={getVariationsFromItem(item)}
                  description={item.Deskripsi}
                  price={item.Harga}
                  images={getImagesFromItem(item)}
                  isService={true}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Keunggulan Jasa Penulisan */}
      <section className="py-12 px-4 sm:px-0 border-t border-slate-100">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-bold rounded-full mb-3 tracking-wider uppercase">
            Mengapa Memilih Kami?
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">Kualitas Penulisan Terbaik</h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-2">
            Kami mendedikasikan pengerjaan tugas Anda pada tim penulis berpengalaman untuk hasil pengerjaan terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Penulis Ahli</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Dikerjakan oleh tim profesional dan berpengalaman yang memahami kebutuhan penulisan tugas secara rapi dan terstruktur.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Anti Plagiarisme</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Jaminan orisinalitas tulisan 100%. Dilengkapi laporan Turnitin asli jika diminta oleh pemesan.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Selesai Tepat Waktu</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Penyelesaian tugas disesuaikan secara disiplin dengan estimasi deadline yang Anda inginkan.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-100">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Garansi Revisi</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Kami memberikan jaminan revisi minor secara gratis demi menjamin keselarasan instruksi tugas.
            </p>
          </div>
        </div>
      </section>

      {/* Cara Order Jasa Penulisan */}
      <section className="py-12 px-4 sm:px-0 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 my-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">Cara Order Jasa</h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-2">
            Langkah mudah mengkonsultasikan tugas akademik Anda bersama admin kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-bold flex items-center justify-center mb-4 text-sm">
              1
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Pilih Layanan</h3>
            <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
              Tentukan jenis pengerjaan tugas (Makalah, Laporan, Jurnal, dsb) di katalog atas.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-bold flex items-center justify-center mb-4 text-sm">
              2
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Isi Detail WhatsApp</h3>
            <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
              Klik "Pesan", lengkapi form detail tugas yang otomatis tertera dalam draft chat WhatsApp Anda.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-bold flex items-center justify-center mb-4 text-sm">
              3
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Deal & Pembayaran</h3>
            <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
              Negosiasikan harga final penulisan bersama admin dan selesaikan pembayaran.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-bold flex items-center justify-center mb-4 text-sm">
              4
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Proses & Pengiriman</h3>
            <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
              Tugas diproses rapi oleh penulis kami, diuji Turnitin, dan berkas dikirimkan secara tepat waktu.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
