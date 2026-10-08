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

**Hasil:**

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
