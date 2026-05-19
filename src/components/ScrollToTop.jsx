import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Pantau posisi scroll halaman
  useEffect(() => {
    const toggleVisibility = () => {
      // Jika scroll lebih dari 300px, tampilkan tombol
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Pergerakan scroll yang halus (smooth)
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#0EA5E9] hover:bg-[#0369A1] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center border border-[#E0F2FE]/20"
          aria-label="Kembali ke atas"
        >
          <ChevronUp className="w-6 h-6 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
