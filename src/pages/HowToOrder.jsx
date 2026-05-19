import { motion } from 'framer-motion';
import { Search, MessageCircle, CheckCircle, ArrowRight, ArrowDown, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function HowToOrder() {
  const steps = [
    {
      number: "01",
      title: "Cari Barang",
      description: "Telusuri katalog produk atau gunakan fitur pencarian untuk menemukan akun premium atau layanan yang Anda butuhkan.",
      icon: Search,
      color: "from-blue-500 to-sky-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    {
      number: "02",
      title: "Tanyakan Stok",
      description: "Klik tombol 'Tanya Stok' pada produk. Anda akan langsung diarahkan ke WhatsApp admin dengan pesan otomatis yang sudah terisi.",
      icon: MessageCircle,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500"
    },
    {
      number: "03",
      title: "Order Selesai",
      description: "Lakukan pembayaran aman via e-wallet/transfer bank. Akun premium langsung dikirim dan siap Anda gunakan dengan garansi penuh!",
      icon: CheckCircle,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500"
    }
  ];

  // Container animation for staggered load
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col items-center flex-grow">
      <SEO 
        title="Cara Order Akun Premium" 
        description="Panduan lengkap cara order akun premium dan jasa digital dengan mudah, cepat, aman, dan bergaransi penuh di AkunPremium."
        keywords="cara beli akun premium, panduan order akun, cara belanja akun premium"
      />
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-xl mb-12 sm:mb-16"
      >
        <span className="inline-block px-3 py-1 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-bold rounded-full mb-3 tracking-wider uppercase">
          Panduan Belanja
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#0F172A] mb-4">
          Cara Mudah <span className="text-[#0EA5E9]">Order Akun</span>
        </h1>
        <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
          Ikuti 3 langkah praktis berikut untuk mendapatkan akses premium instan dengan aman dan bergaransi.
        </p>
      </motion.div>

      {/* Steps Flow Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row items-stretch justify-center w-full gap-8 lg:gap-4 relative max-w-5xl"
      >
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div key={idx} className="flex-1 flex flex-col lg:flex-row items-center relative">
              {/* Card Step */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
                className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden w-full h-full min-h-[300px]"
              >
                {/* Number Badge */}
                <div className="absolute top-4 right-6 text-6xl font-display font-black text-slate-100 select-none">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-slate-100/50`}>
                  <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
                </div>

                {/* Text Content */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#0F172A] mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </motion.div>

              {/* Connector Arrows */}
              {idx < steps.length - 1 && (
                <>
                  {/* Desktop Right Arrow */}
                  <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center bg-white border border-slate-100 text-[#0EA5E9] w-10 h-10 rounded-full shadow-md">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </motion.div>
                  </div>

                  {/* Mobile Down Arrow */}
                  <div className="flex lg:hidden justify-center items-center py-2 text-[#0EA5E9] w-full">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-white border border-slate-100 w-10 h-10 rounded-full flex items-center justify-center shadow-md my-1"
                    >
                      <ArrowDown className="w-5 h-5 stroke-[2.5]" />
                    </motion.div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Bottom Action Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 sm:mt-16 text-center"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            Mulai Belanja Sekarang
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
