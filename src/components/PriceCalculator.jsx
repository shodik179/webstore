import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ADMIN_WA } from '../utils/config';
import { 
  GraduationCap, 
  Clock, 
  Plus, 
  Minus, 
  MessageCircle, 
  FileText, 
  BookOpen, 
  Award, 
  Sparkles
} from 'lucide-react';

export default function PriceCalculator() {
  const [taskType, setTaskType] = useState('makalah');
  const [educationLevel, setEducationLevel] = useState('s1');
  const [pagesCount, setPagesCount] = useState(5);
  const [urgency, setUrgency] = useState('biasa');
  const [flatPackage, setFlatPackage] = useState('');

  // Reset flat package selection when task type changes
  const handleTaskTypeChange = (type) => {
    setTaskType(type);
    if (type === 'skripsi') {
      setFlatPackage('proposal');
    } else if (type === 'jurnal') {
      setFlatPackage('nasional');
    } else {
      setFlatPackage('');
    }
  };

  // Base pricing logic
  const calculation = useMemo(() => {
    let basePrice = 0;
    let details = '';
    let isPageBased = true;

    if (taskType === 'makalah') {
      const pricePerPage = educationLevel === 'sma' ? 10000 : educationLevel === 's1' ? 15000 : 25000;
      basePrice = pricePerPage * pagesCount;
      const eduLabel = educationLevel === 'sma' ? 'SMA' : educationLevel === 's1' ? 'S1/Kuliah' : 'S2/Profesional';
      details = `Tingkat ${eduLabel} (${pagesCount} Halaman @ Rp ${pricePerPage.toLocaleString('id-ID')})`;
    } else if (taskType === 'laporan') {
      const pricePerPage = educationLevel === 'sma' ? 12000 : educationLevel === 's1' ? 18000 : 30000;
      basePrice = pricePerPage * pagesCount;
      const eduLabel = educationLevel === 'sma' ? 'SMA' : educationLevel === 's1' ? 'S1/Kuliah' : 'S2/Profesional';
      details = `Tingkat ${eduLabel} (${pagesCount} Halaman @ Rp ${pricePerPage.toLocaleString('id-ID')})`;
    } else if (taskType === 'jurnal') {
      isPageBased = false;
      const isNasional = flatPackage === 'nasional';
      basePrice = isNasional ? 35000 : 75000;
      details = isNasional ? 'Review Jurnal Nasional' : 'Review Jurnal Internasional Scopus';
    } else if (taskType === 'skripsi') {
      isPageBased = false;
      const isProposal = flatPackage === 'proposal';
      basePrice = isProposal ? 450000 : 950000;
      details = isProposal ? 'Penyusunan Proposal (Bab 1-3)' : 'Full Bab 1-5 Skripsi / Tugas Akhir';
    }

    // Urgency multiplier
    let multiplier = 1.0;
    let urgencyLabel = 'Biasa (5-7 hari)';
    if (urgency === 'cepat') {
      multiplier = 1.25;
      urgencyLabel = 'Cepat (2-3 hari, +25%)';
    } else if (urgency === 'ekspres') {
      multiplier = 1.5;
      urgencyLabel = 'Ekspres (24 Jam, +50%)';
    }

    const finalPrice = Math.round(basePrice * multiplier);

    return {
      finalPrice,
      details,
      urgencyLabel,
      isPageBased
    };
  }, [taskType, educationLevel, pagesCount, urgency, flatPackage]);

  const formatPrice = (priceVal) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      maximumFractionDigits: 0 
    }).format(priceVal);
  };

  const handleOrder = () => {
    const taskName = 
      taskType === 'makalah' ? 'Makalah Akademik' :
      taskType === 'laporan' ? 'Laporan Praktikum/Penelitian' :
      taskType === 'jurnal' ? 'Review Jurnal Ilmiah' : 'Penyusunan Proposal/Skripsi';

    const message = `Hallo Admin, saya mau pesen jasa *${taskName}* dengan harga *${formatPrice(calculation.finalPrice)}*, apakah bisa?`;

    window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const incrementPages = () => setPagesCount(prev => Math.min(prev + 1, 200));
  const decrementPages = () => setPagesCount(prev => Math.max(prev - 1, 1));

  return (
    <div className="w-full bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl my-6">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent)] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-800/80 gap-3">
        <div className="text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] text-[10px] sm:text-xs font-bold rounded-full tracking-wider uppercase border border-[#0EA5E9]/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            KALKULATOR ESTIMASI HARGA INSTAN
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white mt-2">Hitung Tarif Jasa Tugas</h2>
          <p className="text-slate-400 text-xs mt-1">Dapatkan estimasi biaya pengerjaan tugas secara transparan dalam hitungan detik.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Input Fields Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Select Task Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Pilih Jenis Layanan</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'makalah', label: 'Makalah', icon: BookOpen },
                { id: 'laporan', label: 'Laporan', icon: FileText },
                { id: 'jurnal', label: 'Review Jurnal', icon: Award },
                { id: 'skripsi', label: 'Skripsi', icon: GraduationCap }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = taskType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTaskTypeChange(item.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0EA5E9]/10 border-[#0EA5E9] text-white shadow-sm shadow-[#0EA5E9]/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#0EA5E9]' : 'text-slate-500'}`} />
                    <span className="text-[11px] font-bold tracking-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {calculation.isPageBased ? (
              <motion.div
                key="page-based-inputs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {/* Education level */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Tingkat Pendidikan</label>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'sma', label: 'Tingkat SMA', price: taskType === 'makalah' ? 'Rp 10k/hal' : 'Rp 12k/hal' },
                      { id: 's1', label: 'Tingkat Kuliah (S1)', price: taskType === 'makalah' ? 'Rp 15k/hal' : 'Rp 18k/hal' },
                      { id: 's2', label: 'Tingkat S2/Profesional', price: taskType === 'makalah' ? 'Rp 25k/hal' : 'Rp 30k/hal' }
                    ].map((item) => {
                      const isSelected = educationLevel === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setEducationLevel(item.id)}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 border-[#0EA5E9] text-white'
                              : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900 hover:border-slate-800'
                          }`}
                        >
                          <span className="text-xs font-bold">{item.label}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-[#0EA5E9]/20 text-[#0EA5E9]' : 'bg-slate-800 text-slate-500'
                          }`}>{item.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Halaman / Pages count */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Jumlah Halaman</label>
                  <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-4 flex flex-col justify-center items-center h-[116px]">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={decrementPages}
                        disabled={pagesCount <= 1}
                        className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                        aria-label="Kurangi halaman"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-black font-display text-white leading-none">{pagesCount}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-wider">Halaman</span>
                      </div>
                      <button
                        onClick={incrementPages}
                        disabled={pagesCount >= 200}
                        className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                        aria-label="Tambah halaman"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="flat-based-inputs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Pilih Pilihan Paket</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {taskType === 'jurnal' ? (
                    <>
                      {[
                        { id: 'nasional', label: 'Review Jurnal Nasional', desc: 'Analisis jurnal terakreditasi nasional', price: 'Rp 35k' },
                        { id: 'internasional', label: 'Review Jurnal Internasional', desc: 'Analisis jurnal terindeks Scopus/SJR', price: 'Rp 75k' }
                      ].map((item) => {
                        const isSelected = flatPackage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setFlatPackage(item.id)}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                              isSelected
                                ? 'bg-slate-900 border-[#0EA5E9] text-white shadow-sm'
                                : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900 hover:border-slate-800'
                            }`}
                          >
                            <div>
                              <span className="text-xs font-bold block">{item.label}</span>
                              <span className="text-[10px] text-slate-500 mt-1 block leading-tight">{item.desc}</span>
                            </div>
                            <span className={`text-xs font-extrabold block mt-2 ${
                              isSelected ? 'text-[#0EA5E9]' : 'text-slate-400'
                            }`}>{item.price} / jurnal</span>
                          </button>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {[
                        { id: 'proposal', label: 'Proposal Skripsi / TA', desc: 'Penyusunan Bab 1, 2, & 3 lengkap', price: 'Rp 450k' },
                        { id: 'full', label: 'Full Skripsi / Tugas Akhir', desc: 'Penyusunan Bab 1 sampai Bab 5 selesai', price: 'Rp 950k' }
                      ].map((item) => {
                        const isSelected = flatPackage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setFlatPackage(item.id)}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                              isSelected
                                ? 'bg-slate-900 border-[#0EA5E9] text-white shadow-sm'
                                : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900 hover:border-slate-800'
                            }`}
                          >
                            <div>
                              <span className="text-xs font-bold block">{item.label}</span>
                              <span className="text-[10px] text-slate-500 mt-1 block leading-tight">{item.desc}</span>
                            </div>
                            <span className={`text-xs font-extrabold block mt-2 ${
                              isSelected ? 'text-[#0EA5E9]' : 'text-slate-400'
                            }`}>{item.price} / paket</span>
                          </button>
                        );
                      })}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Urgensi / Urgency level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Pilih Batas Waktu (Urgensi)</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'biasa', label: 'Biasa', dur: '5 - 7 Hari', multiplier: 'Harga Normal', color: 'border-slate-800 hover:border-slate-700' },
                { id: 'cepat', label: 'Cepat', dur: '2 - 3 Hari', multiplier: '+25% Biaya', color: 'border-[#F59E0B]/30 hover:border-[#F59E0B]/60' },
                { id: 'ekspres', label: 'Ekspres', dur: '24 Jam', multiplier: '+50% Biaya', color: 'border-rose-500/20 hover:border-rose-500/50' }
              ].map((item) => {
                const isSelected = urgency === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setUrgency(item.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? item.id === 'biasa'
                          ? 'bg-[#0EA5E9]/10 border-[#0EA5E9] text-white'
                          : item.id === 'cepat'
                            ? 'bg-[#F59E0B]/10 border-[#F59E0B] text-white'
                            : 'bg-rose-500/10 border-rose-500 text-white'
                        : `bg-slate-950/40 text-slate-400 ${item.color}`
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Clock className={`w-3.5 h-3.5 ${
                        isSelected 
                          ? item.id === 'biasa' ? 'text-[#0EA5E9]' : item.id === 'cepat' ? 'text-[#F59E0B]' : 'text-rose-500'
                          : 'text-slate-500'
                      }`} />
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                    <div className="mt-2.5 flex items-baseline justify-between gap-1.5">
                      <span className="text-[10px] text-slate-400 font-bold">{item.dur}</span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? item.id === 'biasa' ? 'bg-[#0EA5E9]/20 text-[#0EA5E9]' : item.id === 'cepat' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-rose-500/20 text-rose-500'
                          : 'bg-slate-800 text-slate-500'
                      }`}>{item.multiplier}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Estimation Result Column */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-left space-y-4">
              <span className="text-[9px] font-extrabold uppercase bg-slate-850 px-2.5 py-1 text-slate-400 rounded-full tracking-wider">
                RINCIAN ESTIMASI ANDA
              </span>

              {/* Rincian item */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Layanan Terpilih</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    {taskType === 'makalah' && <BookOpen className="w-4 h-4 text-[#0EA5E9]" />}
                    {taskType === 'laporan' && <FileText className="w-4 h-4 text-[#0EA5E9]" />}
                    {taskType === 'jurnal' && <Award className="w-4 h-4 text-[#0EA5E9]" />}
                    {taskType === 'skripsi' && <GraduationCap className="w-4 h-4 text-[#0EA5E9]" />}
                    {taskType === 'makalah' ? 'Makalah Akademik' :
                     taskType === 'laporan' ? 'Laporan Praktikum/Penelitian' :
                     taskType === 'jurnal' ? 'Review Jurnal Ilmiah' : 'Penyusunan Proposal/Skripsi'}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Spesifikasi</span>
                  <span className="text-xs text-slate-300 font-semibold">{calculation.details}</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Tingkat Urgensi</span>
                  <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {calculation.urgencyLabel}
                  </span>
                </div>
              </div>

              {/* Benefit checks */}
              <div className="border-t border-slate-800/80 pt-3.5 space-y-2">
                {[
                  'Bebas Plagiat (Orisinal 100%)',
                  'Garansi Revisi Minor Gratis',
                  'Rapi Sesuai PUEBI/Panduan Kampus',
                  'Turnitin Report (Atas Permintaan)'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-none" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price tag */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Estimasi Biaya</span>
              <span className="text-3xl font-black font-display text-[#0EA5E9] tracking-tight block mt-1">
                {formatPrice(calculation.finalPrice)}
              </span>
              <p className="text-[9px] sm:text-[10px] text-slate-500 mt-1 leading-normal">
                *Tarif di atas merupakan estimasi awal. Harga final akan didiskusikan bersama admin berdasarkan tingkat kesulitan materi tugas.
              </p>

              <button
                onClick={handleOrder}
                className="w-full mt-4 bg-[#0EA5E9] hover:bg-[#0369A1] text-white py-3 px-5 rounded-full font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-md shadow-[#0EA5E9]/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasikan via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
