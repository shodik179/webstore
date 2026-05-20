import { Helmet } from 'react-helmet-async';
import { Mail, Phone } from 'lucide-react';

export default function ContactUs() {
  return (
    <section className="max-w-3xl mx-auto p-6 sm:p-12 text-[#0F172A]">
      <Helmet>
        <title>Hubungi Kami – APK Premium</title>
        <meta name="description" content="Informasi kontak resmi APK Premium: WhatsApp, email, dan formulir sederhana." />
      </Helmet>

      <h1 className="font-display font-bold text-3xl sm:text-4xl mb-6">Kontak Kami</h1>

      <div className="flex flex-col gap-6">
        {/* WhatsApp */}
        <a
          href="https://wa.me/62895402469838"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-[#0EA5E9] hover:text-[#0284c7] transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>WhatsApp: +62 895‑4024‑69838</span>
        </a>

        {/* Email */}
        <a
          href="mailto:support@apkpremium.id"
          className="flex items-center gap-3 text-[#0EA5E9] hover:text-[#0284c7] transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span>Email: support@apkpremium.id</span>
        </a>

        {/* Simple Contact Form (mailto) */}
        <form
          className="grid gap-4"
          onSubmit={e => {
            e.preventDefault();
            const data = new FormData(e.target);
            const subject = encodeURIComponent('Pertanyaan dari ' + data.get('name'));
            const body = encodeURIComponent(
              `Nama: ${data.get('name')}\nEmail: ${data.get('email')}\nPesan:\n${data.get('message')}`
            );
            window.location.href = `mailto:support@apkpremium.id?subject=${subject}&body=${body}`;
          }}
        >
          <input
            name="name"
            required
            placeholder="Nama lengkap"
            className="p-3 border border-[#94A3B8] rounded focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email aktif"
            className="p-3 border border-[#94A3B8] rounded focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Pesan / pertanyaan Anda"
            className="p-3 border border-[#94A3B8] rounded focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
          <button
            type="submit"
            className="bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Kirim Pesan
          </button>
        </form>
      </div>

      <p className="mt-12 text-sm text-[#64748B]">Terakhir diperbarui: 20 Mei 2026</p>
    </section>
  );
}
