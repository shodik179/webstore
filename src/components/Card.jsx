import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Eye, X, MessageCircle } from 'lucide-react';

function parseVariations(variationsStr, defaultPrice) {
  if (!variationsStr) {
    return [{
      name: 'Default',
      price: defaultPrice,
      durations: []
    }];
  }

  // Split variations: prefer complex separators (newline, pipe, //) first,
  // then fall back to comma. Comma works for both simple tags and priced items.
  const hasComplexSeps = /[\n|]|\/\/+/.test(variationsStr);
  
  const items = (!hasComplexSeps && variationsStr.includes(','))
    ? variationsStr.split(',').map(v => v.trim()).filter(Boolean)
    : variationsStr.split(/[\n|]|\/\/+/);

  const parsed = [];

  for (let item of items) {
    item = item.trim();
    if (!item) continue;

    // Let's extract durations first if they are in () or []
    let durations = [];
    const durationMatch = item.match(/[([]([^)\]]+)[)\]]/);
    if (durationMatch) {
      durations = durationMatch[1].split(',').map(d => d.trim()).filter(Boolean);
      item = item.replace(durationMatch[0], '').trim();
    }

    // Now split the name and price
    let name = item;
    let price = '';

    const priceSeparators = [/=|:|\s-\s/];
    for (const sep of priceSeparators) {
      const match = item.split(sep);
      if (match.length > 1) {
        const possiblePrice = match[match.length - 1].trim();
        if (/\d/.test(possiblePrice)) {
          name = match.slice(0, -1).join('=').trim();
          price = possiblePrice;
          break;
        }
      }
    }

    if (!price && item.includes('Rp')) {
      const parts = item.split('Rp');
      name = parts[0].trim();
      price = 'Rp' + parts[1].trim();
    }

    name = name.replace(/^[-\s:=]+|[-\s:=]+$/g, '').trim();
    price = price.trim();

    if (!price) {
      price = defaultPrice || '';
    }

    parsed.push({
      name: name || 'Paket',
      price: price,
      durations: durations
    });
  }

  if (parsed.length === 0) {
    parsed.push({
      name: 'Default',
      price: defaultPrice,
      durations: []
    });
  }

  return parsed;
}

export default function Card({ title, variations, description, price, images, isService }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const [selectedVarIdx, setSelectedVarIdx] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const parsedVariations = useMemo(() => parseVariations(variations, price), [variations, price]);
  const currentVariant = parsedVariations[selectedVarIdx] || parsedVariations[0];

  // Derive active duration without useEffect
  const activeDuration = selectedDuration !== null
    ? selectedDuration
    : (currentVariant?.durations?.[0] || null);

  const handleSelectVariant = (idx) => {
    setSelectedVarIdx(idx);
    setSelectedDuration(null); // Reset duration selection for new variant
  };

  const handleSelectDuration = (idx, dur) => {
    setSelectedVarIdx(idx);
    setSelectedDuration(dur);
  };

  const formatPrice = (priceVal) => {
    if (!priceVal) return "Tanya Harga";
    
    // Check if it already looks like a formatted IDR price
    if (String(priceVal).includes('Rp') && String(priceVal).includes('.')) {
      return priceVal;
    }

    // Extract numbers
    const cleanStr = String(priceVal).replace(/[^\d.-]/g, '');
    const num = Number(cleanStr);
    
    if (isNaN(num) || cleanStr === '') return priceVal;

    const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
    
    if (String(priceVal).includes('/')) {
      const suffix = String(priceVal).split('/').slice(1).join('/');
      return `${formatted} / ${suffix.trim()}`;
    }
    
    return formatted;
  };

  const handleWhatsApp = () => {
    const adminWA = "62895402469838";
    
    let message = `Halo Admin, saya mau tanya stok *${title}*`;
    
    if (currentVariant && currentVariant.name !== 'Default' && parsedVariations.length > 1) {
      message += ` - *${currentVariant.name}*`;
    }
    
    if (activeDuration) {
      message += ` (Durasi: *${activeDuration}*)`;
    }
    
    const formattedPrice = formatPrice(currentVariant?.price || price);
    if (formattedPrice && formattedPrice !== 'Tanya Harga') {
      message += ` dengan harga *${formattedPrice}*`;
    }
    
    message += `. Apakah masih ready?`;
    
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

  const getDirectImageUrl = (url) => {
    if (!url) return null;
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && url.includes('drive.google.com')) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const currentImage = getDirectImageUrl(rawImage);
  const imgFailed = currentImage ? failedImages[currentImage] || false : false;

  const handleImageError = () => {
    if (currentImage) {
      setFailedImages(prev => ({ ...prev, [currentImage]: true }));
    }
  };

  const hasVariations = parsedVariations.length > 1 || (parsedVariations.length === 1 && parsedVariations[0].name !== 'Default');

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col h-full"
      >
        {/* Image / Slider area */}
        <div className="relative w-full h-40 sm:h-44 bg-[#F8FAFC] border-b border-slate-100 overflow-hidden group flex items-center justify-center flex-shrink-0">
          {currentImage && !imgFailed ? (
            <img
              src={currentImage}
              alt={title}
              onError={handleImageError}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC]">
              <Zap className="w-10 h-10 text-[#0EA5E9] opacity-30" />
            </div>
          )}

          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 p-1.5 rounded-full shadow z-10 opacity-0 group-hover:opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 p-1.5 rounded-full shadow z-10 opacity-0 group-hover:opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

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
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-display font-bold text-sm sm:text-base text-[#0F172A] leading-snug mb-2 line-clamp-1">
            {title || "Nama Produk"}
          </h3>

          {/* Variations List (Interactive) */}
          {hasVariations ? (
            <div className="space-y-2 mb-3">
              {parsedVariations.slice(0, isExpanded ? undefined : 3).map((variant, idx) => {
                const isSelected = selectedVarIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectVariant(idx)}
                    className={`cursor-pointer p-2 sm:p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-[#F0F9FF] border-[#0EA5E9] shadow-[0_0_12px_rgba(14,165,233,0.06)]'
                        : 'bg-slate-50/40 border-slate-100 hover:bg-slate-50/80 hover:border-slate-200'
                    }`}
                  >
                    {/* Header baris variasi */}
                    <div className="flex items-start justify-between gap-1.5">
                      <span className={`text-[11px] sm:text-xs font-bold leading-tight transition-colors ${
                        isSelected ? 'text-[#0369A1]' : 'text-slate-700'
                      }`}>
                        {variant.name}
                      </span>
                      
                      {/* Durations */}
                      {variant.durations.length > 0 && (
                        <div className="flex flex-wrap gap-1 items-center justify-end" onClick={(e) => e.stopPropagation()}>
                          {variant.durations.map((dur, dIdx) => {
                            const isDurSelected = isSelected && activeDuration === dur;
                            return (
                              <button
                                key={dIdx}
                                onClick={() => handleSelectDuration(idx, dur)}
                                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                                  isDurSelected
                                    ? 'bg-[#0EA5E9] text-white shadow-sm'
                                    : 'bg-slate-200/60 hover:bg-slate-200 text-slate-500 hover:text-slate-600'
                                }`}
                              >
                                {dur}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    
                    {/* Footer baris variasi */}
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-[11px] sm:text-xs font-extrabold ${
                        isSelected ? 'text-[#0EA5E9]' : 'text-slate-500'
                      }`}>
                        {formatPrice(variant.price)}
                      </span>
                      
                      {/* Radio dot */}
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? 'border-[#0EA5E9] bg-[#0EA5E9]' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-none" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Show more button if > 3 variations */}
              {parsedVariations.length > 3 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                  className="text-[10px] sm:text-xs font-bold text-[#0EA5E9] hover:text-[#0369A1] mt-1.5 flex items-center gap-1 cursor-pointer"
                >
                  {isExpanded ? 'Sembunyikan Variasi' : `Lihat ${parsedVariations.length - 3} Variasi Lainnya`}
                </button>
              )}
            </div>
          ) : (
            /* Single default variation description preview */
            description && (
              <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 text-left mb-3">
                {description}
              </p>
            )
          )}

          {/* Lihat Skema Harga link */}
          <div className="mt-1 mb-3 text-left">
            <button
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#0EA5E9] transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat Skema Harga & Detail</span>
            </button>
          </div>

          {/* Pricing & CTA Button */}
          <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-100">
            <div className="text-left flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harga terpilih</span>
              <span className="font-extrabold text-[#0EA5E9] text-sm sm:text-base">
                {formatPrice(currentVariant?.price || price)}
              </span>
            </div>
            
            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto flex-shrink-0 bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm shadow-[#0EA5E9]/10 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pesan</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full z-25 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Body */}
              <div className="overflow-y-auto p-5 sm:p-6 space-y-5 text-left">
                {/* Header (Logo + Title) */}
                <div className="flex gap-4 items-center border-b border-slate-100 pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-slate-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {currentImage && !imgFailed ? (
                      <img src={currentImage} alt={title} className="w-full h-full object-contain p-2" />
                    ) : (
                      <Zap className="w-6 h-6 text-[#0EA5E9]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#0EA5E9] bg-sky-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {isService ? 'Layanan Jasa' : 'Akun Premium'}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#0F172A] mt-1 leading-snug">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                {description && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Deskripsi Produk</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      {description}
                    </p>
                  </div>
                )}

                {/* Price Table (Skema Harga) */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Skema Harga & Paket</h4>
                  <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                          <th className="px-4 py-2.5 text-left font-bold">Paket / Varian</th>
                          <th className="px-4 py-2.5 text-center font-bold">Pilihan Durasi</th>
                          <th className="px-4 py-2.5 text-right font-bold">Harga</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        {parsedVariations.map((v, i) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-semibold text-slate-800">{v.name}</td>
                            <td className="px-4 py-3 text-center">
                              {v.durations.length > 0 ? (
                                <div className="flex flex-wrap justify-center gap-1">
                                  {v.durations.map((dur, dIdx) => (
                                    <span key={dIdx} className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                                      {dur}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-[10px] text-slate-400 italic">Bulanan</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-extrabold text-[#0EA5E9]">{formatPrice(v.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Order Selector in Modal */}
                {hasVariations && (
                  <div className="bg-[#F0F9FF] border border-sky-100 p-4 rounded-2xl space-y-3">
                    <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-wider block">Pilih Paket Sebelum Pesan</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {parsedVariations.map((v, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectVariant(i)}
                          className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                            selectedVarIdx === i
                              ? 'bg-white border-[#0EA5E9] shadow-sm'
                              : 'bg-white/40 border-slate-200/60 hover:bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-[11px] font-bold text-slate-700 leading-tight">{v.name}</span>
                          <span className="text-[11px] font-extrabold text-[#0EA5E9]">{formatPrice(v.price)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-5 py-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
                <div className="text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Paket dipilih</span>
                  <span className="text-xs text-slate-700 font-bold leading-tight block truncate max-w-[150px] sm:max-w-[200px]">
                    {currentVariant?.name === 'Default' ? title : currentVariant?.name}
                    {activeDuration ? ` (${activeDuration})` : ''}
                  </span>
                  <span className="font-extrabold text-base text-[#0EA5E9] block leading-none mt-0.5">
                    {formatPrice(currentVariant?.price || price)}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    handleWhatsApp();
                    setIsModalOpen(false);
                  }}
                  className="bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-5 py-3 rounded-full font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm shadow-[#0EA5E9]/10 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan Sekarang</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
