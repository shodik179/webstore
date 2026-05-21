# � DOKUMENTASI & RENCANA PENGEMBANGAN — APKPREMIUM

Selamat datang di repositori proyek **APKPREMIUM**. Dokumen ini berfungsi sebagai peta jalan (*roadmap*), panduan referensi fitur, serta blueprint teknis agar siapa pun yang membaca dokumen ini dapat langsung memahami konsep, arsitektur, database, dan fitur web ini tanpa perlu penjelasan ulang.

---

## 🚀 1. Gambaran Umum Proyek
**APKPREMIUM** adalah platform penjualan akun premium (seperti Spotify, Netflix, Canva, ChatGPT, dll.) yang dirancang dengan konsep **E-Commerce Minimalis Tanpa Checkout**. Alur pembelian terintegrasi secara langsung ke WhatsApp Admin demi transaksi yang cepat, aman, dan tanpa hambatan registrasi.

### Key Value Proposition:
1. **Serverless & Database-less (Gratis & Cepat)**: Memanfaatkan Google Sheets sebagai Database untuk kemudahan input barang baru oleh pemilik toko tanpa perlu mengetahui database teknis.
2. **Instant WA-redirect Order**: Konversi penjualan yang tinggi karena pembeli tidak perlu login, mendaftar, atau mengisi formulir panjang. Cukup pilih paket, klik, dan langsung terhubung dengan admin via WhatsApp dengan format pesan otomatis.

---

## 🛠️ 2. Arsitektur & Teknologi (Tech Stack)
Aplikasi ini dibangun menggunakan arsitektur web modern yang mengutamakan kecepatan pemuatan, estetika visual, serta keindahan interaksi UX:

* **React (Single Page Application)**: Untuk struktur modular dan pengelolaan state aplikasi.
* **Vite**: Sebagai bundling tool generasi baru untuk durasi build dan reload secepat kilat.
* **Tailwind CSS**: Untuk merancang sistem desain (desain token, grid responsif, tipografi) yang premium dan rapi.
* **Framer Motion**: Untuk micro-animations (hover kartu, transisi antar-menu, dan visual modal popup yang memukau).
* **Lucide React**: Koleksi ikon minimalis & modern dengan ukuran super kecil.
* **PapaParse**: Parser CSV berkinerja tinggi untuk mengunduh dan menyusun baris Google Sheets secara real-time.

---

## 📊 3. Sistem Database: Integrasi Google Sheets
Web ini menggunakan Google Sheets yang dibagikan secara publik dalam format CSV sebagai sumber data utama.

* **URL Spreadsheet Sumber**:  
  `https://docs.google.com/spreadsheets/d/1DRkTRX-wUlo7oRLRPp0IMEw18ziPWCGvh9f3hOc5XvU/export?format=csv`

### Struktur Kolom di Spreadsheet
Untuk menambah atau memperbarui produk di katalog, pastikan sheet memiliki struktur kolom berikut:

| Nama Kolom | Jenis Data | Deskripsi / Aturan Pengisian |
| :--- | :--- | :--- |
| **Nama** | Teks | Nama produk akun premium (Contoh: `SPOTIFY`, `NETFLIX`). |
| **Kategori** | Teks | Kategori produk untuk tab filter di atas katalog (Contoh: `Music`, `Streaming`). |
| **Variasi** | Teks | (*Sangat Penting!*) Opsi paket & harga dipisahkan tanda koma `,` atau garis baru `\n`. Lihat format di bawah. |
| **Deskripsi** | Teks | Penjelasan deskriptif, aturan garansi, atau detail produk pendukung. |
| **Harga** | Teks / Angka | Harga default atau harga awal (jika tidak menuliskan variasi harga spesifik). |
| **Foto1** | URL Gambar | Link gambar produk (disarankan background transparan/putih rasio 1:1). |
| **Foto2** | URL Gambar | Link gambar cadangan untuk fitur *slider* gambar di dalam kartu. |
| **Foto3** | URL Gambar | Link gambar ketiga untuk fitur *slider* gambar di dalam kartu. |

### � Format Pengisian Kolom "Variasi" (Paling Krusial)
Parser pintar di `Card.jsx` akan secara otomatis memecah string di kolom `Variasi` menjadi daftar tombol interaktif. Tuliskan variasi dengan aturan:
```text
Nama Varian (Opsi Durasi, Opsi Durasi) = Harga
```
**Contoh Input di Spreadsheet:**
```text
Sharing 1 bulan = 10000, Sharing 3 bulan = 16000, Private 1 bulan = 60000
```
*Atau versi durasi instan:*
```text
Indplan 1 bulan (1 bln, 2 bln) = 25000 / 50000
```
Sistem akan memformat harga rupiah otomatis (`90000` -> `Rp 90.000`) dan mendeteksi durasi yang bisa diklik.

---

## ✨ 4. Fitur Utama Web APKPREMIUM
Berikut adalah fitur-fitur mutakhir yang sudah terimplementasi di web Anda saat ini:

### ⚡ A. Real-Time Data Sync dengan Cache Buster
Setiap kali halaman web dibuka, data akan diambil secara langsung dari Google Sheets. Untuk menghindari data yang tertahan di *cache* browser (yang membuat perubahan di Google Sheet tidak langsung update di web), kode kita menyertakan parameter dinamis:
```javascript
const cacheBusterUrl = `${csvUrl}${csvUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`;
```
Perubahan di Spreadsheet akan langsung ter-update di web dalam hitungan detik setelah refresh!

### 🎯 B. Pencarian & Filter Kategori Dinamis
* Kolom filter kategori di atas katalog akan **terbentuk secara otomatis** berdasarkan nama kategori unik yang diinput di spreadsheet (tidak perlu mengubah kode website jika kategori bertambah!).
* Pencarian responsif yang memfilter nama, variasi, dan deskripsi produk secara real-time saat pengguna mengetik.

### 🖼️ C. Multi-Image Slider di Card
Jika Anda menginput link lebih dari satu gambar (`Foto1`, `Foto2`, `Foto3`), card produk secara otomatis memunculkan tombol navigasi (panah kiri-kanan) dan titik indikator agar pembeli bisa menggeser foto produk. Jika gambar gagal dimuat, sistem akan otomatis beralih menggunakan ikon *fallback* yang cantik.

### 🛍️ D. Selektor Variasi & Durasi Interaktif
Pada card produk:
* Jika opsi variasi terdeteksi lebih dari satu, card akan memicu tampilan daftar variasi interaktif (bentuk tombol radio modern).
* Pengguna bisa mengklik pilihan variasi atau tombol durasi untuk melihat perubahan harga secara langsung di bawah kartu sebelum mengklik tombol **Pesa**.
* Jika variasi produk lebih dari 3, akan otomatis ada tombol `Lihat Variasi Lainnya` agar tampilan card ringkas dan tidak memakan banyak tempat.

### 🔍 E. Modal Detail & Skema Harga Komprehensif
Pengguna bisa mengklik tombol **"Lihat Skema Harga & Detail"** untuk memunculkan popup yang premium (backdrop blur, animasi fade-in). Modal ini berisi:
1. Deskripsi lengkap produk dengan dukungan penulisan baris baru (*whitespace preserve*).
2. **Tabel Skema Harga lengkap**: Menyusun semua variasi, pilihan durasi, dan harga akhir dalam sebuah tabel yang sangat rapi.
3. Panel pemesanan bawah (*sticky footer*) untuk melakukan pemilihan paket cadangan sebelum klik checkout.

### 💬 F. Integrasi WhatsApp Menggunakan Pesan Terformat Otomatis
Setelah pengguna menentukan variasi dan durasi akun premium yang diinginkan, mengklik tombol **Pesan** akan langsung membuka tab baru WhatsApp Web / Aplikasi WA yang tertuju pada nomor:
👉 **`62895402469838`** (Nomor WA Admin)

**Pesan yang di-generate sangat profesional dan otomatis terisi:**
```text
Halo Admin, saya mau tanya stok *[Nama Akun]* - *[Variasi Terpilih]* (Durasi: *[Durasi Terpilih]*) dengan harga *[Harga Terpilih]*. Apakah masih ready?
```
*(Contoh pesan nyata:* `Halo Admin, saya mau tanya stok *NETFLIX* - *Sharing 1P1U 1 bulan* dengan harga *Rp 40.000*. Apakah masih ready?`*)*

---

## 🗺️ 5. Rencana Pengembangan Selanjutnya (Phase 2 — Jasa)
Rencana berikut dipetakan agar menu layanan jasa digital Anda dapat segera diluncurkan:

1. **Pengembangan Halaman `/jasa`**:
   * Mengubah status dari halaman "Segera Hadir!" menjadi katalog layanan jasa yang interaktif.
   * Kami menyarankan penggunaan format serupa dengan produk premium, baik ditarik dari spreadsheet tab baru (misal sheet kedua dengan URL tersendiri) atau di-hardcode dengan opsi list jasa yang rapi.
2. **Section Baru di Homepage**:
   * Menambahkan ringkasan portofolio, testimoni klien khusus pemakai jasa, serta tombol konsultasi cepat yang mengarah langsung ke WhatsApp untuk negosiasi kerja sama.
3. **Sentralisasi Nomor WA Admin**:
   * Menyatukan variabel nomor WA admin ke satu file konfigurasi di `src/utils/config.js` agar jika nomor WA Anda berganti, Admin hanya perlu mengganti 1 baris kode saja.

---
*Dokumen ini diperbarui secara berkala sesuai dengan evolusi implementasi kode APKPREMIUM.*