import { Helmet } from 'react-helmet-async';

export default function TermsOfService() {
  return (
    <section className="max-w-4xl mx-auto p-6 sm:p-12 text-[#0F172A]">
      <Helmet>
        <title>Syarat &amp; Ketentuan – APK Premium</title>
        <meta name="description" content="Syarat dan ketentuan penggunaan layanan APK Premium, termasuk garansi akun premium." />
      </Helmet>
      <h1 className="font-display font-bold text-3xl sm:text-4xl mb-6">Syarat &amp; Ketentuan Layanan</h1>
      <p className="mb-4">Terakhir diperbarui: 20 Mei 2026</p>
      <h2 className="font-semibold text-2xl mt-8 mb-4">1. Layanan</h2>
      <p className="mb-4">
        APK Premium menyediakan akses ke akun premium untuk berbagai platform (Netflix, Spotify, dll). Semua akun disediakan setelah pembayaran berhasil dan verifikasi via WhatsApp.
      </p>
      <h2 className="font-semibold text-2xl mt-8 mb-4">2. Pembayaran &amp; Pengembalian</h2>
      <p className="mb-4">
        Pembayaran dilakukan melalui transfer bank, e‑wallet, atau QRIS. Setelah pembayaran dikonfirmasi, layanan akan dikirim dalam waktu 5 menit. <strong>Tidak ada pengembalian dana</strong> kecuali terjadi kegagalan pengiriman layanan yang disebabkan oleh kesalahan internal kami.
      </p>
      <h2 className="font-semibold text-2xl mt-8 mb-4">3. Garansi Akun Premium</h2>
      <p className="mb-4">
        Semua akun dijamin aktif selama periode yang dibeli (1 bulan, 6 bulan, 12 bulan, dst). Jika akun tidak berfungsi karena masalah teknis di pihak penyedia layanan, kami akan mengganti dengan akun setara dalam waktu 24 jam.
      </p>
      <h2 className="font-semibold text-2xl mt-8 mb-4">4. Larangan Penggunaan</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Menjual kembali atau mendistribusikan kembali akun yang dibeli.</li>
        <li>Menggunakan akun untuk aktivitas ilegal atau melanggar hak cipta.</li>
        <li>Berbagi kredensial akun dengan pihak ketiga tanpa izin kami.</li>
      </ul>
      <h2 className="font-semibold text-2xl mt-8 mb-4">5. Penutup</h2>
      <p className="mb-4">
        Dengan menggunakan layanan kami, Anda menyetujui semua syarat dan ketentuan di atas. Untuk pertanyaan lebih lanjut, silakan hubungi kami melalui halaman <a href="/contact" className="text-[#0EA5E9] underline">Kontak</a>.
      </p>
    </section>
  );
}
