import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

export default function Card({ title, variations, description, price, images, isService }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const variationList = variations
    ? String(variations).split(',').map(v => v.trim()).filter(v => v !== '')
    : [];

  const formatPrice = (priceVal) => {
    if (!priceVal) return "Tanya Harga";
    const num = Number(String(priceVal).replace(/[^0-9.-]+/g, ""));
    if (isNaN(num)) return priceVal;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const handleWhatsApp = () => {
    const adminWA = "628123456789";
    const message = `Halo, saya mau tanya ${isService ? 'detail layanan' : 'stok'} *${title}*.`;
    window.open(`https://wa.me/${adminWA}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (images?.length > 0) setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (images?.length > 0) setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const hasMultipleImages = images && images.length > 1;

  const rawImage = images && images.length > 0 ? images[currentIdx] : null;

  // Auto-convert Google Drive view links ke format direct link yang berfungsi
  const getDirectImageUrl = (url) => {
    if (!url) return null;
    // Tangkap File ID dari format link Google Drive
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && url.includes('drive.google.com')) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const currentImage = getDirectImageUrl(rawImage);

  // Reset status error ketika indeks gambar berubah
  useEffect(() => {
    setImgFailed(false);
  }, [currentIdx, images]);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col"
    >
      {/* Image / Slider area — fixed height so card stays consistent */}
      <div className="relative w-full h-40 sm:h-48 bg-[#E0F2FE] overflow-hidden group flex items-center justify-center flex-shrink-0">
        {currentImage && !imgFailed ? (
          <img
            src={currentImage}
            alt={title}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#E0F2FE]">
            <Zap className="w-10 h-10 text-[#0EA5E9] opacity-30" />
          </div>
        )}

        {/* Slider arrows — visible on touch too (always shown when multiple) */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 p-1.5 rounded-full shadow z-10 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 p-1.5 rounded-full shadow z-10 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="font-display font-bold text-sm sm:text-base text-[#0F172A] leading-snug mb-1 line-clamp-2">
          {title || "Nama Produk"}
        </h3>

        {/* Deskripsi & Variasi Detail */}
        <div className="mb-3">
          {(description || variationList.length > 0) && (
            <>
              {isExpanded ? (
                <div className="space-y-3 pt-1 text-left">
                  {/* Variasi Paket */}
                  {variationList.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Pilihan Paket:</span>
                      <div className="flex flex-wrap gap-1">
                        {variationList.map((variant, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F5F9] border border-slate-200/80 text-[10px] font-semibold text-slate-500"
                          >
                            {variant}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deskripsi Teks */}
                  {description && (
                    <div>
                      {variationList.length > 0 && (
                        <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Deskripsi:</span>
                      )}
                      <p className="text-xs text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
                        {description}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Collapsed Preview (Hanya deskripsi singkat di PC) */
                description && (
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2 hidden sm:block">
                    {description}
                  </p>
                )
              )}

              {/* Tombol Pemicu Ekspansi */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                className="text-[11px] font-bold text-[#0EA5E9] hover:text-[#0369A1] mt-2 block cursor-pointer"
              >
                {isExpanded ? 'Sembunyikan Detail' : (
                  <>
                    <span className="sm:hidden">Lihat Detail & Paket</span>
                    <span className="hidden sm:inline">Selengkapnya</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Harga + Tombol */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-100">
          <span className="font-bold text-[#0EA5E9] text-sm sm:text-base">
            {formatPrice(price)}
          </span>
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto flex-shrink-0 bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm whitespace-nowrap text-center"
          >
            Tanya Stok
          </button>
        </div>
      </div>
    </motion.div>
  );
}
