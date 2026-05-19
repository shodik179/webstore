🗂️ Struktur Halaman
Phase 1 — nama website = APKPREMIUM

Navbar — Logo + nama brand + anchor link ke seksi
Hero — Tagline singkat + CTA "Lihat Produk"
Katalog Produk — Grid card berisi:

Foto produk
Nama & badge kategori
Deskripsi singkat (2–3 baris)
Harga
Tombol "Tanya Stok" → redirect WA dengan pesan otomatis


FAQ kecil — kenapa harus tanya stok dulu, cara order, garansi
Footer — Kontak, sosmed, copyright

Phase 2 — Tambah Jasa (nanti)

Tambah section "Layanan Kami" di bawah katalog
Card per jasa: nama, deskripsi, estimasi harga/mulai dari
Tombol "Konsultasi Gratis" → WA
Section portofolio & testimoni klien


💬 Logika Tombol WA
Setiap tombol di card produk generate link WA otomatis:
https://wa.me/628xx?text=Halo, saya mau tanya stok [Nama Produk]
Pengunjung tinggal klik → WA terbuka dengan pesan sudah terisi → Anda tinggal balas.

📐 Desain & UX
AspekRekomendasiTemaPutih dominan, aksen hitam atau satu warna brandFontDisplay tebal untuk judul, ringan untuk bodyLayout kartuGrid 2 kolom (mobile) / 3–4 kolom (desktop)Gambar produkRasio konsisten (1:1 atau 4:3), background putih/transparanAnimasiSubtle — hover card naik sedikit, sudah cukup
program yang di gunakan
Detail
React Untuk struktur & logika (komponen card, filter, dll)Tailwind CSSUntuk styling cepat dan konsistenFramer MotionUntuk animasi halus (hover, fade, slide)Data JSONSimpan data produk di file JSON, mudah diupdate