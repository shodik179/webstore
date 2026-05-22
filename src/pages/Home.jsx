import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FAQ from '../components/FAQ';
import Card from '../components/Card';
import SEO from '../components/SEO';
import { useSheetData } from '../hooks/useSheetData';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Zap, Clock, CreditCard, Star, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import { ADMIN_WA } from '../utils/config';

const PRODUK_CSV_URL = "https://docs.google.com/spreadsheets/d/1DRkTRX-wUlo7oRLRPp0IMEw18ziPWCGvh9f3hOc5XvU/export?format=csv";

export default function Home() {
  const { data: products, loading, error } = useSheetData(PRODUK_CSV_URL);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Extract unique categories dynamically from products data
  const categories = useMemo(() => {
    if (!products || products.length === 0) return ['Semua'];
    const unique = new Set(products.map(item => item.Kategori?.trim()).filter(Boolean));
    return ['Semua', ...Array.from(unique)];
  }, [products]);

  // Ekstrak URL gambar secara fleksibel dari kolom Foto, Foto1, Foto 2, Gambar, dll.
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

  const filteredProducts = products.filter(item => {
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
        title="Jual Akun Premium Murah" 
        description="Pusat penjualan akun premium murah, legal, dan bergaransi penuh. Beli Spotify Premium, Netflix, Canva Pro, Youtube Premium murah, cepat via WhatsApp."
        keywords="jual akun premium, spotify premium murah, netflix premium murah, canva pro murah, youtube premium, akun premium bergaransi"
      />
      <Hero />

      <section id="katalog" className="pt-2 scroll-mt-20 px-4 sm:px-0">
        {/* Header Katalog */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">Produk Tersedia</h2>
            <p className="text-[#94A3B8] text-sm mt-0.5">Temukan akun premium bergaransi yang Anda butuhkan.</p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari akun..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        {/* Kategori Filter */}
        {!loading && !error && categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer border ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
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
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl h-64" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 p-5 rounded-2xl text-center border border-red-100">
            <p className="font-bold text-sm">Gagal memuat data katalog.</p>
            <p className="text-xs mt-1 text-red-400">Pastikan Spreadsheet dibagikan secara publik.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Search className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-[#0F172A] font-bold text-base">Tidak ada hasil</p>
            <p className="text-sm text-[#94A3B8] mt-1">Coba kata kunci yang berbeda.</p>
          </div>
        )}

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          <AnimatePresence>
            {filteredProducts.map((item, idx) => (
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
                  isService={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Banner Promosi Jasa Tugas Akademik */}
      <section className="my-12 px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden py-12 px-6 sm:px-12 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white sm:rounded-3xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 text-left"
        >
          {/* Background decorative glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.06),transparent)] pointer-events-none" />

          {/* Text Content */}
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-sky-500/10 text-[#0EA5E9] text-[10px] sm:text-xs font-bold rounded-full tracking-wider uppercase border border-[#0EA5E9]/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              LAYANAN BARU: JASA TUGAS & SKRIPSI
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              Tugas & Skripsi Menumpuk? <br />
              <span className="text-[#0EA5E9]">Selesaikan Instan</span> & Tepat Waktu!
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Dapatkan bantuan pengerjaan tugas profesional (makalah, laporan praktikum, review jurnal, skripsi/TA) yang disusun terstruktur oleh tim ahli. Jaminan 100% orisinal bebas plagiarisme (Turnitin), rapi, rahasia terjamin, dan selesai tepat waktu!
            </p>
            
            {/* Features badges */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
              {[
                'Bebas Plagiasi (Turnitin)',
                'Gratis Revisi',
                'Pengerjaan Cepat / Ekspres',
                'Privasi 100% Aman'
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-300 text-[10px] sm:text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex-shrink-0 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-3 w-full sm:w-auto z-10">
            <Link to="/jasa" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#0EA5E9]/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Lihat Jasa Tugas</span>
              </motion.button>
            </Link>
            
            <a
              href={`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent('Halo Admin, saya mau tanya & konsultasi gratis mengenai Jasa Tugas / Skripsi.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto border border-slate-700 text-white bg-slate-900/40 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Konsultasi Gratis WA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* H2 -> Layanan Kami */}
      <section className="py-12 px-4 sm:px-0">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-bold rounded-full mb-3 tracking-wider uppercase">
            Keunggulan Kami
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">Layanan Kami</h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-1.5">
            Komitmen kami untuk memberikan layanan terbaik bagi setiap transaksi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Proses Instan</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Setelah pembayaran terkonfirmasi, pesanan akun premium Anda diproses dalam hitungan menit.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Garansi Penuh</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Semua pembelian dilengkapi jaminan garansi ganti baru jika mengalami masalah durasi.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Dukungan Responsif</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Customer support kami siap membantu menjawab pertanyaan Anda via WhatsApp.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-100">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Harga Terbaik</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Nikmati fasilitas fitur akun premium orisinal dengan harga langganan termurah.
            </p>
          </div>
        </div>
      </section>

      {/* H2 -> Cara Order */}
      <section className="py-12 px-4 sm:px-0 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 my-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">Cara Order</h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-1.5">
            Langkah mudah memesan akun premium impian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-bold flex items-center justify-center mb-4 text-sm">
              1
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Cari Barang</h3>
            <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
              Pilih akun premium atau layanan yang Anda butuhkan di katalog kami di atas.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-bold flex items-center justify-center mb-4 text-sm">
              2
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Tanyakan Stok</h3>
            <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
              Klik tombol 'Tanya Stok' untuk langsung terhubung dengan Admin via WhatsApp.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-bold flex items-center justify-center mb-4 text-sm">
              3
            </div>
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-2">Order Selesai</h3>
            <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
              Selesaikan transaksi pembayaran, lalu akun premium siap diserahkan langsung.
            </p>
          </div>
        </div>
      </section>

      {/* H2 -> Testimoni Pelanggan */}
      <section className="py-12 px-4 sm:px-0 mb-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-bold rounded-full mb-3 tracking-wider uppercase">
            Bukti Kualitas
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F172A]">Testimoni Pelanggan</h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-1.5">
            Apa kata mereka yang telah berlangganan akun premium bersama kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 animate-none" />)}
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed mb-4">
                "Proses cepat sekali! Admin ramah dan akun Spotify premium saya langsung aktif dalam 5 menit. Sudah berlangganan 3 bulan lancar jaya."
              </p>
            </div>
            <div className="border-t border-slate-50 pt-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center font-bold text-xs text-[#0EA5E9]">
                AN
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Ahmad N.</h4>
                <p className="text-[10px] text-[#94A3B8]">Pelanggan Spotify</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 animate-none" />)}
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed mb-4">
                "Sangat terbantu dengan jasa pengerjaan makalah di sini! Hasilnya luar biasa rapi, sesuai dengan format kampus saya, dan dikasih laporan Turnitin gratis dengan hasil plagiasi di bawah 10%. Recommended!"
              </p>
            </div>
            <div className="border-t border-slate-50 pt-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F0F9FF] flex items-center justify-center font-bold text-xs text-[#0EA5E9]">
                CA
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Clarissa A.</h4>
                <p className="text-[10px] text-[#94A3B8]">Pelanggan Jasa Tugas</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 animate-none" />)}
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed mb-4">
                "Beli Canva pro buat tugas kuliah murah banget dibanding langganan aslinya. Sangat membantu mahasiswa menghemat pengeluaran bulanan."
              </p>
            </div>
            <div className="border-t border-slate-50 pt-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center font-bold text-xs text-[#0EA5E9]">
                RD
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Rian D.</h4>
                <p className="text-[10px] text-[#94A3B8]">Pelanggan Canva</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-0">
        <FAQ />
      </div>
    </div>
  );
}
