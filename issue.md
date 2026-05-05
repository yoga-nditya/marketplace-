# Rencana Implementasi: Halaman Detail Produk (Static)

## Tujuan
Membuat tampilan antarmuka (UI) statis untuk halaman detail produk sesuai dengan desain mockup. Halaman ini akan muncul ketika pengguna mengklik suatu produk dari halaman daftar produk. Saat ini, implementasi hanya berfokus pada UI statis dan *state management* lokal (sebelum dihubungkan dengan API *backend*).

## Struktur Halaman & Routing
- Buat *folder* dan *file* halaman baru untuk detail produk, misalnya di `frontend/app/(portal)/products/[id]/page.tsx` (sesuaikan dengan struktur *routing* Next.js pada proyek ini).
- Karena ini adalah versi statis, siapkan *dummy data* (data palsu statis) di dalam *file* halaman tersebut untuk merender UI.

## Tahapan Implementasi

### 1. Persiapan Data Statis (Mock Data)
Buat objek data statis sementara di dalam *file* untuk merender UI, yang berisi field:
- `id` produk
- Nama produk (contoh: "Cutting Acrylic 25x35cm")
- Harga (contoh: 320000)
- Kategori (contoh: "Hantaran")
- Deskripsi (dengan *format* multi-baris jika perlu)
- URL gambar produk
- Jumlah stok (contoh: 5)

### 2. Pembuatan Layout Utama & Breadcrumb
- Buat *container* utama yang membatasi lebar maksimal halaman dan posisinya di tengah (mengikuti *layout* utama website/portal).
- **Breadcrumb**: Buat komponen navigasi di bagian atas dengan struktur: ikon rumah (Beranda) > Produk > [Nama Produk]. Beri *styling* khusus agar elemen terakhir (nama produk) memiliki warna teks yang sedikit memudar (*muted*) sebagai penanda lokasi saat ini.

### 3. Pembuatan Grid / Layout Konten
Bagi area konten utama di bawah *breadcrumb* menjadi **3 kolom** (sangat disarankan menggunakan Tailwind CSS Grid, misalnya `grid-cols-1` di *mobile* dan `lg:grid-cols-12` pada layar *desktop*):

*   **Kolom Kiri (Gambar Produk) - proporsi misal `lg:col-span-4`:**
    - Tampilkan gambar produk menggunakan komponen `<Image />` dari Next.js atau tag `<img>`.
    - Berikan *styling* seperti bingkai (*border*) dan sudut melengkung (*rounded*) sesuai desain mockup.

*   **Kolom Tengah (Informasi Detail Produk) - proporsi misal `lg:col-span-5`:**
    - **Judul Produk**: Gunakan teks tebal (*font-bold*) dan ukuran cukup besar (*text-xl* atau *text-2xl*).
    - **Harga**: Tampilkan harga di bawah judul dengan ukuran teks yang tebal dan besar. Implementasikan fungsi *helper* format Rupiah (contoh: "Rp 320.000").
    - **Garis Pemisah (Divider)**: Tambahkan garis horizontal (`<hr />`) dengan warna abu-abu terang.
    - **Kategori Produk**: Tampilkan judul teks "Kategori Produk" (beri warna aksen biru/ungu muda seperti pada mockup), diikuti teks nama kategori di bawahnya.
    - **Garis Pemisah (Divider)**.
    - **Deskripsi Produk**: Tampilkan judul teks "Deskripsi Produk" (warna aksen biru/ungu muda). Tampilkan teks deskripsi. 
    - **Tombol "Selengkapnya"**: Buat tombol/badge kecil di ujung bawah teks deskripsi untuk indikasi meluaskan teks (bisa berbentuk *pill* dengan *background* warna terang).

*   **Kolom Kanan (Aksi & Keranjang) - proporsi misal `lg:col-span-3`:**
    - Buat kotak *card* dengan *border* atau *shadow* tipis sebagai pembungkus area *checkout*.
    - **Pilih Jumlah**: Tampilkan label "Pilih jumlah". Buat komponen *input counter*:
        - Tombol `-` (kurang).
        - Angka penunjuk kuantitas (di tengah, bentuk *input* atau *span* dengan bingkai).
        - Tombol `+` (tambah).
    - **Informasi Stok**: Teks ukuran kecil di bawah *counter* yang memberitahukan sisa stok (contoh: "Stok tersedia : 5").
    - **Subtotal**: Teks "Subtotal" dan angka kalkulasi (harga satuan * kuantitas).
    - **Tombol Aksi**: Tombol dengan lebar penuh (`w-full`), latar belakang warna solid (biru/ungu khas aplikasi), dan tulisan "Masukkan ke keranjang" dilengkapi ikon *cart* (keranjang belanja) di sebelah kirinya.

### 4. Implementasi State Management (Client-side Interactivity)
Gunakan `useState` (pastikan menambahkan direktif `"use client"` di baris paling atas *file* untuk komponen yang membutuhkan interaktivitas ini):
- **State `quantity`**: Nilai *default* adalah 1.
    - Buat fungsi penanganan (handler) untuk tombol `+` agar menambah *state* `quantity` sejumlah 1. Validasi: angka tidak boleh melebihi jumlah *stok* yang tersedia.
    - Buat fungsi penanganan (handler) untuk tombol `-` agar mengurangi *state* `quantity`. Validasi: angka tidak boleh kurang dari 1.
- **Perhitungan Subtotal**: Subtotal tidak harus disimpan di dalam *state*, cukup lakukan kalkulasi langsung pada saat dirender (contoh: `const subtotal = product.price * quantity`).
- **State `isExpanded` (Opsional)**: Untuk fitur baca selengkapnya pada deskripsi. Jika teks panjang, potong sebagian dan tampilkan penuh hanya saat tombol "Selengkapnya" diklik (merubah nilai *state* dari `false` menjadi `true`).

### 5. Penyesuaian Responsivitas (Responsive Design)
Pastikan UI tidak hancur saat dibuka di ponsel:
- Konfigurasi *grid* agar menjadi vertikal (semua *span* memenuhi lebar layar, misalnya ditumpuk dari gambar produk di urutan pertama, detail di kedua, dan area *checkout* di paling bawah).
- Sesuaikan besaran jarak (*margin/padding*) antar elemen pada ukuran layar yang kecil.
