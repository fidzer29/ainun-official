# Ainun Official

Website katalog Ainun Official dengan Next.js App Router, JavaScript, dan Tailwind CSS. Pemesanan diarahkan ke WhatsApp dan Shopee; backend dan checkout tidak termasuk dalam tahap awal.

## Menjalankan project

Di Windows PowerShell:

```bash
npm.cmd install
npm.cmd run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat katalog.

## Struktur utama

- `app/page.js` merangkai navbar, hero, katalog, ulasan contoh, keunggulan, tentang kami, CTA, dan footer.
- `components/` berisi komponen halaman.
- `components/BrandTrustSections.js` berisi section ulasan contoh dan keunggulan Ainun.
- `components/reactbits/` berisi animasi React Bits untuk teks dan visual: Tilted Card, Image Reveal, Scroll Reveal, Spotlight, dan Magnet.
- `components/AboutSection.js` berisi pengenalan Ainun Official dan peta lokasi toko.
- `components/Navbar.js` dan `components/Footer.js` dipakai di beranda dan halaman detail produk.
- `data/products.js` menyimpan deskripsi, warna, harga, dan size chart.
- `app/produk/[slug]/page.js` membuat halaman detail SEO untuk setiap produk.
- `app/sitemap.js` dan `app/robots.js` menghasilkan sitemap dan aturan crawler.
- `app/opengraph-image.js` menghasilkan gambar berbagi sosial 1200 × 630.
- `lib/site-url.js` memvalidasi URL publik yang digunakan metadata dan sitemap.
- `public/images/` disiapkan untuk logo dan foto produk.

Tombol detail produk membuka modal berisi deskripsi, harga, warna, dan size chart. Galeri ilustrasi di dalam modal dapat digeser, dinavigasi dengan tombol panah, atau dipilih melalui swatch warna.

Salin `.env.example` menjadi `.env.local` untuk development. Sebelum deploy, sebaiknya atur `NEXT_PUBLIC_SITE_URL` ke origin HTTPS domain resmi agar canonical dan sitemap memakai domain toko. Di Vercel, jika variabel ini belum diatur, aplikasi memakai `VERCEL_PROJECT_PRODUCTION_URL` yang disediakan platform. Pada platform lain, `NEXT_PUBLIC_SITE_URL` wajib diatur; production build akan gagal daripada menghasilkan canonical atau sitemap yang menunjuk ke localhost.

Visual hero dan katalog memakai gambar lokal di `public/images/`. Pastikan gambar tersebut adalah foto resmi yang sudah disetujui sebelum website dipublikasikan. Detail warna, ukuran, dan harga Naila mengikuti informasi yang tampak pada referensi dan perlu dicocokkan dengan PDF produk final. Tombol WhatsApp memakai tautan umum tanpa nomor toko; tombol Shopee membuka hasil pencarian, bukan halaman toko resmi. Ganti keduanya dengan tautan toko yang benar sebelum peluncuran.

Narasi Tentang Kami masih berupa pengenalan awal dan perlu disesuaikan dengan profil merek yang telah dikonfirmasi. Tautan kontak footer sengaja belum ditampilkan sampai alamat resmi WhatsApp, Instagram, dan Shopee disiapkan.

Carousel ulasan berisi lima contoh dan dapat digeser dengan swipe di ponsel, drag di desktop, tombol panah, atau indikator halaman. Ulasan tersebut bukan ulasan pelanggan asli; ganti dengan ulasan yang telah mendapat izin sebelum website dipublikasikan.

Animasi teks React Bits digunakan secara selektif: Text Type dan Split Flap pada hero, Blur Text pada judul katalog, True Focus pada judul Tentang Kami, serta Circular Text sebagai aksen dekoratif ulasan. Animasi mengikuti preferensi reduced motion perangkat.

Efek visual React Bits digunakan pada gambar hero dan produk (Tilted Card serta Image Reveal), kartu katalog/keunggulan dan area Tentang Kami (Scroll Reveal), serta CTA (Spotlight dan Magnet). Efek pointer hanya aktif untuk mouse; carousel ulasan tetap menampilkan tiga kartu sekaligus di desktop dan mendukung geser.
