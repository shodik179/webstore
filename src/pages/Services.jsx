import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Services() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center flex-grow">
      <SEO 
        title="Layanan Jasa Digital Terbaik" 
        description="Layanan jasa digital profesional dan terpercaya. Kami menyediakan berbagai macam jasa kebutuhan digital Anda."
        keywords="jasa digital, jasa optimasi, jasa administrasi, layanan digital murah"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Floating Icon Container */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 bg-[#E0F2FE] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-[#0EA5E9]/10"
        >
          <Sparkles className="w-10 h-10 text-[#0EA5E9]" />
        </motion.div>

        {/* Title & Description */}
        <h1 className="font-display font-black text-3xl text-[#0F172A] mb-3">
          Segera Hadir!
        </h1>
        <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-8">
          Halaman layanan jasa saat ini sedang kami persiapkan. Kami akan segera kembali dengan layanan-layanan digital terbaik untuk Anda!
        </p>

        {/* CTA Button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Produk
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
