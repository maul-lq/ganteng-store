# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.
**Hasil:**
Fitur US-01: Katalog dari database telah selesai dikerjakan sesuai spesifikasi dan aturan di AGENTS.md.

File yang Dibuat dan Diubah

lib/supabase/server.js & lib/supabase/index.js (Baru)

Membuat koneksi Supabase di sisi server menggunakan createClient dari @supabase/supabase-js.
Menggunakan environment variable SUPABASE_URL dan SUPABASE_SECRET_KEY dengan opsi persistSession: false.

app/page.jsx (Diubah)

Mengambil daftar produk dari tabel produk di Supabase secara server-side dan terurut berdasarkan id.
Menampilkan produk menggunakan komponen KartuProduk.jsx tanpa mengubah tampilannya.
Menampilkan pesan error yang jelas jika pengambilan data gagal.
Menampilkan teks "Belum ada produk" jika tabel kosong.
Menghapus komponen CatatanBelumAktif dan referensi ke data-contoh.js.
**Perbaikan:**

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.
**Hasil:**
Fitur US-02: Detail produk telah selesai dikerjakan sesuai spesifikasi dan aturan di AGENTS.md.

File yang Diubah
app/produk/[id]/page.jsx
Mengambil satu produk dari tabel produk di Supabase berdasarkan parameter id URL di sisi server menggunakan createServerClient dari @/lib/supabase.
Memanggil notFound() jika terjadi error atau data produk tidak ditemukan, sehingga otomatis menampilkan halaman app/not-found.jsx.
Mempertahankan tampilan dan struktur elemen termasuk komponen TombolWhatsApp.
Menghapus komponen CatatanBelumAktif dan referensi ke data-contoh.js.
Cara Mengetes
Jalankan server pengembangan (jika belum berjalan):
bash
npm run dev
Buka detail produk yang ada:
Dari halaman utama http://localhost:3000, klik salah satu kartu produk (misalnya produk dengan ID 1 di http://localhost:3000/produk/1).
Pastikan informasi yang tampil (foto, kategori, nama, harga dalam rupiah, dan deskripsi) sesuai dengan data di tabel produk Supabase.
Pastikan tombol "Pesan via WhatsApp" tetap ada di bawah deskripsi.
Uji produk yang tidak ada:
Buka URL produk dengan ID yang tidak terdaftar, misalnya http://localhost:3000/produk/9999 atau http://localhost:3000/produk/abc.
Pastikan halaman menampilkan tampilan "Halaman tidak ditemukan" beserta tombol "Lihat semua produk".
**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.
**Hasil:**
Viewed rancangan-teknis.md:58-68
Viewed user-stories.md:27-37
Viewed TombolWhatsApp.jsx:1-13
Viewed toko.js:1-10
Viewed format.js:1-8
Ran command: Search docs for WhatsApp message text (`Select-String -Path docs/*.md -Pattern "wa\.me|Halo|pesan"`)

I have launched a command to search the documentation for any specific WhatsApp message template and will wait for it to complete.

Viewed PROMPTS.md:1-95
Ran command: Check CatatanBelumAktif occurrences (`Select-String -Path @("app/*.jsx", "app/**/*.jsx", "app/**/**/*.jsx") -Pattern "CatatanBelumAktif"`)

I have launched a command to verify where `CatatanBelumAktif` is still present and will wait for it to finish.

Created TombolWhatsApp.jsx
Ran command: Run npm.cmd run build (`npm.cmd run build`)
Viewed TombolWhatsApp.jsx:1-21

Fitur **US-03: Pesan via WhatsApp** telah selesai dikerjakan sesuai spesifikasi pada [docs/rancangan-teknis.md](file:///c:/Users/T480S/Documents/ganteng-store/docs/rancangan-teknis.md) dan aturan [AGENTS.md](file:///c:/Users/T480S/Documents/ganteng-store/AGENTS.md).

### File yang Diubah

- [components/TombolWhatsApp.jsx](file:///c:/Users/T480S/Documents/ganteng-store/components/TombolWhatsApp.jsx)
  - Mengubah elemen tombol menjadi tag tautan `<a>` dengan atribut `target="_blank"` dan `rel="noopener noreferrer"`.
  - Mengarahkan tautan ke format `https://wa.me/<nomor>?text=<pesan>` menggunakan nomor dari [lib/toko.js](file:///c:/Users/T480S/Documents/ganteng-store/lib/toko.js).
  - Pesan otomatis memuat nama produk dan harga terformat rupiah (`formatRupiah`), yang di-encode menggunakan `encodeURIComponent`.
  - Mempertahankan tampilan dan kelas Tailwind yang sama persis seperti tombol sebelumnya.
- Catatan komponen `CatatanBelumAktif` yang menyebut US-03 di [app/produk/[id]/page.jsx](file:///c:/Users/T480S/Documents/ganteng-store/app/produk/[id]/page.jsx) telah dibersihkan.

---

### Cara Mengetes

1. **Buka halaman detail produk**:
   - Buka salah satu produk di browser (misalnya `http://localhost:3000/produk/1`).
2. **Uji tombol WhatsApp**:
   - Klik tombol **"Pesan via WhatsApp"**.
   - Pastikan terbuka tab baru ke alamat `https://wa.me/6281234567890?text=...`.
   - Pastikan teks pesan pada halaman WhatsApp terisi otomatis dengan nama dan harga produk (contoh: *"Halo, saya ingin memesan Kopi Bubuk Robusta 250 g dengan harga Rp 45.000."*).
**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
