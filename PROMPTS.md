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

**Hasil:**

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
