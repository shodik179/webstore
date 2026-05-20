import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <section className="max-w-4xl mx-auto p-6 sm:p-12 text-[#0F172A]">
      <Helmet>
        <title>Kebijakan Privasi – APK Premium</title>
        <meta name="description" content="Kebijakan privasi untuk layanan APK Premium, menjelaskan pengumpulan data, penggunaan, dan hak pengguna." />
      </Helmet>
      <h1 className="font-display font-bold text-3xl sm:text-4xl mb-6 text-[#0F172A]">
        Kebijakan Privasi
      </h1>
      <p className="mb-4">
        Kami menghargai privasi Anda. Informasi pribadi yang Anda kirimkan melalui formulir WhatsApp atau email hanya akan diproses untuk tujuan pengiriman layanan dan tidak akan dibagikan ke pihak ketiga tanpa persetujuan Anda.
      </p>
      <h2 className="font-semibold text-2xl mt-8 mb-4">Data yang Kami Kumpulkan</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Nama, nomor WhatsApp, atau email yang Anda berikan.</li>
        <li>Informasi akun yang Anda pilih (paket, durasi, harga).</li>
        <li>Data teknis seperti alamat IP, tipe perangkat, dan browser saat Anda mengakses situs.</li>
      </ul>
      <h2 className="font-semibold text-2xl mt-8 mb-4">Penggunaan Data</h2>
      <p className="mb-4">
        Data tersebut digunakan untuk:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Memproses dan mengirimkan layanan premium yang Anda beli.</li>
        <li>Memberikan dukungan teknis atau klarifikasi melalui WhatsApp/email.</li>
        <li>Meningkatkan layanan kami berdasarkan umpan balik.</li>
      </ul>
      <h2 className="font-semibold text-2xl mt-8 mb-4">Hak Anda</h2>
      <p className="mb-4">
        Anda dapat meminta penghapusan data pribadi kapan saja dengan menghubungi admin melalui WhatsApp atau email.
      </p>
      <p className="mt-12 text-sm text-[#64748B]">
        Terakhir diperbarui: 20 Mei 2026
      </p>
    </section>
  );
}
