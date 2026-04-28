# Rencana Implementasi Halaman Admin Dashboard

Dokumen ini berisi panduan langkah demi langkah untuk mengimplementasikan fitur Admin Dashboard pada aplikasi Marketplace. Panduan ini dirancang untuk diikuti oleh Junior Programmer atau AI Agent agar pengerjaan dapat dilakukan secara bertahap dan terstruktur.

**Aturan Pengerjaan**: 
- Ikuti setiap langkah secara berurutan.
- Fokus pada pembuatan User Interface (UI) dan integrasi dasar sesuai instruksi.
- Terapkan praktik desain terbaik agar halaman terlihat rapi dan profesional.

---

## Tahap 1: Persiapan dan Konfigurasi Routing
1. Buat struktur folder baru di dalam direktori frontend (misal: `src/pages/Admin/`) khusus untuk mengelompokkan halaman-halaman admin.
2. Tambahkan konfigurasi rute baru di file routing utama aplikasi untuk halaman admin.
3. Terapkan *nested routing* (rute bersarang) agar semua halaman admin berbagi satu layout utama (Sidebar dan Navbar). Rute yang harus dibuat meliputi:
   - `/admin` (Halaman Dashboard Utama)
   - `/admin/products` (Halaman Manajemen Produk)
   - `/admin/categories` (Halaman Manajemen Kategori)
   - `/admin/users` (Halaman Daftar Pengguna)

## Tahap 2: Pembuatan Komponen Layout Utama (Sidebar dan Navbar)
1. Buat komponen `AdminLayout` yang akan bertindak sebagai *wrapper* atau pembungkus konten utama halaman admin.
2. **Pembuatan Navbar Admin**:
   - Buat komponen Navbar yang menempel di bagian atas layar.
   - Isi Navbar dengan informasi relevan seperti nama panel ("Admin Panel") dan profil admin yang sedang login.
3. **Pembuatan Sidebar Admin**:
   - Buat komponen Sidebar yang berada di sisi kiri layar dengan lebar tetap.
   - Tambahkan menu navigasi menuju halaman Dashboard, Kategori, Produk, dan Pengguna.
   - Buat indikator visual untuk menandai menu mana yang sedang aktif saat ini.
4. Gabungkan Navbar dan Sidebar dengan gaya tata letak grid/flexbox sehingga ketika pindah menu, hanya konten utama di sebelah kanan yang berubah sementara Sidebar dan Navbar tetap statis.

## Tahap 3: Implementasi Halaman Dashboard Utama (`/admin`)
1. Rancang halaman utama yang akan tampil pertama kali saat membuka panel admin.
2. Buat komponen "Statistik Card" (Kartu Informasi).
3. Susun 4 kartu statistik secara menyamping (berjejer ke samping) menggunakan grid layout (misal `grid-cols-4`).
4. Isi kartu tersebut dengan informasi ringkasan placeholder terlebih dahulu (contoh: Total Pengguna, Total Penjualan, Total Produk, dll).

## Tahap 4: Implementasi Halaman Manajemen Kategori (`/admin/categories`)
1. Buat antarmuka utama untuk melihat seluruh kategori.
2. Tampilkan data kategori menggunakan desain "Card" (kartu) alih-alih tabel.
3. Susun kartu-kartu kategori tersebut agar berjejer menyamping, persis seperti tata letak di halaman depan, maksimal 4 kartu dalam satu baris.
4. Di dalam setiap kartu kategori, wajib menampilkan:
   - Gambar visual kategori.
   - Nama Kategori.
   - Tombol **Edit** (untuk mengubah kategori).
   - Tombol **Delete** (untuk menghapus kategori).
5. Buat tombol global "Tambah Kategori Baru" di bagian atas halaman yang akan memicu form penambahan data.

## Tahap 5: Implementasi Halaman Manajemen Produk (`/admin/products`)
1. Rancang halaman ini menggunakan format tata letak yang persis sama dengan halaman Kategori.
2. Tampilkan produk dalam bentuk kartu yang berjejer 4 ke samping.
3. Di dalam setiap kartu produk, tampilkan:
   - Gambar Produk.
   - Nama Produk.
   - Harga Produk.
   - Tombol **Edit**.
   - Tombol **Delete**.
4. Sediakan tombol "Tambah Produk Baru" beserta formnya (bisa berupa modal atau halaman baru). Pastikan pada form produk terdapat input *dropdown* untuk memilih kategori.

## Tahap 6: Implementasi Halaman Daftar Pengguna (`/admin/users`)
1. Rancang halaman untuk melihat siapa saja pengguna atau user yang terdaftar di aplikasi.
2. Karena informasi ini sifatnya hanya untuk dilihat (read-only), Anda bisa menampilkannya menggunakan format daftar (list) atau tabel sederhana yang rapi.
3. Tampilkan kolom informasi dasar seperti Nama, Email, dan Role pengguna.

## Tahap 7: Integrasi Fungsional dan Notifikasi
1. Setelah semua layout selesai, sambungkan fungsionalitas tombol "Edit" dan "Delete" untuk memunculkan form ubah data atau dialog konfirmasi penghapusan (menggunakan modal dialog atau SweetAlert).
2. Pastikan ada penanda *loading* saat memuat data dan berikan *feedback* visual (pesan sukses/gagal) saat Admin melakukan operasi tambah, ubah, atau hapus data.
