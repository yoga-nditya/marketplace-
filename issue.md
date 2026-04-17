# [Feature] Implementasi Halaman Home — Tampilan Awal Marketplace

## Gambaran Singkat

Kita perlu membuat halaman **Home** sebagai tampilan pertama yang dilihat pengguna ketika membuka aplikasi marketplace ini. Saat ini file `frontend/app/page.tsx` masih berisi halaman uji coba koneksi backend yang dibuat waktu setup awal — sekarang saatnya kita ganti dengan tampilan halaman Home yang sebenarnya sesuai desain.

Tugas kamu di sini **fokus pada tampilan (UI) saja**. Belum perlu terhubung ke API atau backend. Cukup gunakan data palsu (dummy) yang kamu tulis sendiri di dalam kode. Koneksi ke API akan dikerjakan di issue terpisah setelah ini selesai.

## Yang Harus Dihasilkan

Ketika issue ini selesai, halaman Home harus terlihat seperti desain yang sudah diberikan, dengan 4 bagian utama:

1. **Banner / Carousel** — banner promosi di bagian paling atas
2. **Kategori** — filter tab untuk memilih kategori produk
3. **Daftar Produk** — grid produk 4 kolom dengan search bar
4. **Pagination** — navigasi halaman di bagian bawah

---

## Konteks Project

Sebelum mulai, kenali dulu struktur yang sudah ada:

- Project frontend berada di folder `frontend/`
- Framework yang dipakai adalah **Next.js** dengan **TypeScript**
- Styling menggunakan **Tailwind CSS v4** yang sudah terpasang — kamu tidak perlu install apapun lagi
- Halaman utama ada di `frontend/app/page.tsx`
- Semua komponen UI akan disimpan di folder `frontend/components/home/` — buat folder ini jika belum ada
- Halaman Home akan berada di `frontend/app/home/page.tsx` menggunakan struktur folder berbasis fitur

---

## Panduan Desain

Ini adalah aturan tampilan yang harus kamu ikuti agar hasilnya sama dengan desain yang diberikan.

### Warna

| Elemen | Warna |
|---|---|
| Background halaman | Putih |
| Warna aksen / tombol aktif | Ungu — gunakan `#6C63FF` atau `#7C3AED` |
| Judul section ("Kategori", "Produk") | Hitam pekat, tebal |
| Tab kategori aktif | Background ungu, teks putih |
| Tab kategori tidak aktif | Background abu-abu muda, teks abu-abu gelap |
| Nama produk pada kartu | Biru link — gunakan `#3B82F6` |
| Nama toko / seller pada kartu | Abu-abu ungu — gunakan `#6366f1` atau abu-abu biasa |
| Harga produk | Hitam / gelap, tebal |
| Harga coret (jika ada diskon) | Abu-abu dengan garis coret |

### Layout & Ukuran

- Konten halaman tidak penuh lebar layar. Beri batas kiri-kanan sehingga konten ada di tengah dan tidak terlalu melebar. Lebar konten sekitar **896px**.
- Beri padding kiri dan kanan yang cukup agar konten tidak terlalu mepet ke tepi.
- Jarak antar section (banner ke kategori, kategori ke produk, dll.) harus konsisten dan tidak terlalu rapat.

### Font

Gunakan font **Inter** dari Google Fonts. Font ini sudah bisa dipasang langsung lewat Next.js tanpa perlu link eksternal — cukup import dari `next/font/google` di file `layout.tsx`.

---

## Struktur File yang Akan Dibuat

Project ini menggunakan pendekatan **berbasis fitur (feature-based)**. Artinya, semua yang berhubungan dengan halaman Home dikumpulkan dalam folder tersendiri. Setelah kamu selesai, struktur folder `frontend/` harus seperti ini:

```
frontend/
├── app/
│   ├── home/
│   │   ├── hooks/          ← (kosongkan dulu, akan diisi saat koneksi API)
│   │   ├── types/          ← (kosongkan dulu, akan diisi saat koneksi API)
│   │   ├── service/        ← (kosongkan dulu, akan diisi saat koneksi API)
│   │   └── page.tsx        ← Halaman Home (Server Component, cukup render HomeClient)
│   ├── globals.css
│   └── layout.tsx
└── components/
    └── home/
        ├── HomeClient.tsx  ← Komponen utama Client, merangkai semua section di bawah ini
        ├── Banner.tsx      ← Section banner/carousel
        ├── CategoryTabs.tsx← Section tab filter kategori
        ├── ProductCard.tsx ← Tampilan satu kartu produk
        ├── ProductGrid.tsx ← Section grid produk + search bar
        └── Pagination.tsx  ← Section navigasi halaman
```

**Kenapa strukturnya begini?**
- Folder `app/home/` adalah "ruang kerja" fitur Home — tempat menyimpan logika, tipe data, dan pemanggilan API nantinya. Untuk saat ini, folder `hooks/`, `types/`, dan `service/` dibuat tapi dibiarkan kosong dulu.
- Folder `components/home/` adalah tempat semua tampilan (UI) halaman Home. Dipisah dari `app/` agar komponen-komponen UI bisa dipakai ulang dengan mudah.
- `HomeClient.tsx` adalah komponen induk yang merangkai semua section (Banner, Kategori, Grid, Pagination) menjadi satu tampilan utuh. File `page.tsx` di dalam `app/home/` cukup memanggil `HomeClient` ini saja.

---

## Checklist Pengerjaan

Kerjakan **satu per satu dari atas ke bawah**. Jangan lanjut ke poin berikutnya sebelum yang sekarang sudah beres dan tampilannya benar di browser.

### ☐ Tahap 1 — Persiapan & Struktur Folder

Sebelum membuat komponen apapun, siapkan dulu kerangka folder dan file-nya:

1. Buka `frontend/app/layout.tsx`. Tambahkan import font **Inter** dari Google Fonts dan terapkan font ini ke seluruh halaman. Caranya sudah terdokumentasi di website Next.js — cari bagian "Optimizing Fonts".
2. Buat folder `frontend/app/home/` beserta sub-foldernya: `hooks/`, `types/`, dan `service/`. Untuk saat ini, biarkan semua folder itu kosong. Nanti akan diisi ketika kita mulai menghubungkan ke API.
3. Buat file `frontend/app/home/page.tsx`. File ini adalah halaman Home dalam Next.js. Isinya sangat sederhana: cukup import dan render komponen `HomeClient` yang akan kita buat nanti. File ini **tidak perlu** ada logic atau tampilan langsung.
4. Buat folder `frontend/components/home/` — ini tempat semua komponen UI halaman Home akan disimpan.
5. Buat file kosong (placeholder) untuk setiap komponen yang akan dikerjakan: `HomeClient.tsx`, `Banner.tsx`, `CategoryTabs.tsx`, `ProductCard.tsx`, `ProductGrid.tsx`, dan `Pagination.tsx` — semuanya di dalam `frontend/components/home/`.
6. Buka file `frontend/app/page.tsx` yang lama (berisi kode uji coba koneksi backend). Karena halaman Home sekarang pindah ke `app/home/page.tsx`, file ini bisa diarahkan langsung ke halaman home — atau dihapus isinya dan diganti dengan redirect ke `/home`. Diskusikan dengan senior/lead jika ragu.

Setelah tahap ini selesai, struktur foldernya sudah terbentuk meskipun file-filenya masih kosong. Ini adalah fondasi yang akan kita isi langkah demi langkah.

---

### ☐ Tahap 2 — Komponen Banner

Buka dan kerjakan file: `frontend/components/home/Banner.tsx`

**Apa yang harus ditampilkan:**

Bayangkan banner seperti slideshow foto di toko online. Ada satu area besar di bagian atas halaman yang menampilkan satu banner dalam satu waktu. Di sisi kiri dan kanan banner ada tombol panah kecil untuk ganti slide. Di bawah area banner ada titik-titik kecil (dot) yang menunjukkan sedang di slide ke berapa.

**Detail tampilannya:**
- Area banner berupa kotak horizontal yang lebar penuh di dalam container konten, dengan tinggi sekitar 180–220px dan sudut sedikit membulat.
- **Untuk gambarnya**, jangan pakai gambar asli dulu. Cukup isi area banner dengan warna background berbeda-beda dan tulis teks "Banner 1", "Banner 2", "Banner 3" di tengahnya.
- Tombol panah kiri (`<`) dan kanan (`>`) berada menempel di sisi kiri dan kanan banner, berbentuk lingkaran kecil putih dengan ikon panah di tengah.
- Di bawah banner ada deretan titik kecil. Jumlah titik sesuai jumlah banner (3 titik untuk 3 banner). Titik yang sesuai dengan slide aktif berwarna ungu, yang lain abu-abu.

**Logika yang harus jalan:**
- Klik tombol `>` → pindah ke slide berikutnya. Jika sudah di slide terakhir, balik ke slide pertama.
- Klik tombol `<` → balik ke slide sebelumnya. Jika sudah di slide pertama, loncat ke slide terakhir.
- Titik di bawah ikut berubah mengikuti slide yang aktif.

Setelah komponen `Banner.tsx` selesai, buka file `HomeClient.tsx` dan import komponen ini di sana. `HomeClient.tsx` adalah tempat semua komponen section digabungkan. Buka browser dan pastikan banner tampil dan slidenya bisa berpindah saat tombol diklik.

---

### ☐ Tahap 3 — Komponen Kategori

Buka dan kerjakan file: `frontend/components/home/CategoryTabs.tsx`

**Apa yang harus ditampilkan:**

Tepat di bawah banner, ada judul **"Kategori"** dengan huruf tebal dan di bawahnya ada 3 tombol/badge yang berderet ke kanan: **Semua**, **Handmade**, dan **Souvenir**.

**Detail tampilannya:**
- Judul "Kategori" ditulis tebal, ukuran font sedang, warna hitam gelap.
- Di bawah judul ada 3 tombol berderet horizontal, dengan sedikit jarak antar tombol.
- Tombol yang aktif / terpilih memiliki background ungu dan teks putih.
- Tombol yang tidak aktif memiliki background abu-abu muda dan teks abu-abu gelap.
- Beri jarak yang cukup antara section banner dan section kategori ini — jangan terlalu rapat.

**Logika yang harus jalan:**
- Saat halaman pertama dibuka, tab "Semua" sudah dalam keadaan aktif.
- Ketika tab lain diklik, tab itu berubah jadi aktif (background ungu) dan tab sebelumnya kembali jadi tidak aktif.

Setelah selesai, import komponen `CategoryTabs` ke dalam `HomeClient.tsx` dan letakkan di bawah `Banner`. Cek di browser pastikan tab bisa diklik dan styling aktif/tidak aktif berpindah dengan benar.

---

### ☐ Tahap 4 — Komponen Kartu Produk

Buka dan kerjakan file: `frontend/components/home/ProductCard.tsx`

**Apa yang harus ditampilkan:**

Ini adalah tampilan satu kartu produk. Kartu ini nanti akan digunakan secara berulang di dalam grid. Komponen ini menerima data dari luar (lewat props), bukan memiliki datanya sendiri.

**Susunan kartu dari atas ke bawah:**
1. **Gambar produk** — Kotak persegi abu-abu muda yang mengisi lebar kartu. Tulis teks kecil "Foto Produk" di tengah kotak sebagai placeholder. Jangan pakai gambar asli dulu.
2. **Nama toko** — Teks kecil di bawah gambar, warna abu-abu ungu.
3. **Nama produk** — Teks warna biru, sedikit lebih besar dari nama toko.
4. **Harga** — Jika ada harga diskon: tampilkan harga asli (dengan garis coret, warna abu-abu) lalu di bawahnya harga promo. Jika tidak ada diskon: cukup tampilkan satu harga saja.

**Tampilan kartu secara keseluruhan:**
- Ada border tipis dengan warna abu-abu sangat muda agar terlihat seperti kartu.
- Ada shadow yang sangat tipis agar kartu terasa sedikit terangkat.
- Sudut kartu sedikit membulat.
- Beri padding di dalam kartu agar kontennya tidak mepet ke tepi.

**Data yang diterima komponen ini dari luar (props):**
- Nama toko
- Nama produk
- Harga
- Harga asli sebelum diskon (boleh kosong/null jika tidak ada)

Setelah selesai, coba import `ProductCard` ke dalam `HomeClient.tsx` dan tampilkan satu kartu dengan data yang ditulis langsung (hardcoded) untuk memastikan tampilannya benar sebelum lanjut ke tahap berikutnya.

---

### ☐ Tahap 5 — Komponen Grid Produk

Buka dan kerjakan file: `frontend/components/home/ProductGrid.tsx`

**Apa yang harus ditampilkan:**

Ini adalah area utama yang menampilkan banyak produk sekaligus. Di bagian atas ada judul "Produk" dan search bar, lalu di bawahnya grid produk 4 kolom.

**Detail baris judul + search bar:**
- Judul **"Produk"** ditulis tebal di sisi kiri.
- Di sisi kanan (sejajar dengan judul, dalam satu baris yang sama) ada kotak pencarian (search bar).
- Search bar punya ikon kaca pembesar di dalamnya, border tipis, dan sudut sedikit membulat. Tombol atau ikon kaca pembesarnya berwarna ungu.
- Lebarnya tidak terlalu panjang, cukup proporsional.

**Detail grid produk:**
- Di bawah baris judul + search bar, tampilkan grid **4 kolom**.
- Isi grid dengan komponen `ProductCard` yang sudah dibuat di tahap sebelumnya.
- Tampilkan **8 produk** (hasilnya 2 baris × 4 kolom).
- Beri jarak yang cukup antar kartu agar tidak terlalu rapat.

**Data dummy yang perlu kamu siapkan di dalam komponen ini:**
Buat 8 data produk palsu langsung di dalam file ini. Setiap produk punya: nama toko, nama produk, harga, dan harga asli (boleh kosong untuk beberapa produk). Gunakan nama dan harga yang terlihat realistis seperti produk UMKM — misalnya "Lukisan Akrilik 21x15cm" dengan harga "Rp20.000".

Setelah selesai, hapus kartu percobaan di `HomeClient.tsx` dan ganti dengan komponen `ProductGrid` ini. Pastikan grid 4 kolom tampil rapi di browser.

---

### ☐ Tahap 6 — Komponen Pagination

Buka dan kerjakan file: `frontend/components/home/Pagination.tsx`

**Apa yang harus ditampilkan:**

Di bagian paling bawah halaman, setelah grid produk, ada baris informasi dan navigasi halaman.

**Detail tampilannya:**
- Di **sisi kiri**: teks kecil berwarna abu-abu yang menampilkan informasi jumlah produk, contohnya: `"Showing 1-8 of 47 results"`. Tulis ini sebagai teks statis/hardcoded dulu.
- Di **sisi kanan**: deretan tombol navigasi halaman berupa: tombol `<` (sebelumnya), tombol angka `1`, `2`, `3`, lalu tombol `>` (berikutnya).
- Kedua bagian kiri dan kanan ini berada dalam satu baris yang sama (kiri dan kanan berseberangan).
- Tombol angka yang sedang aktif/dipilih berwarna ungu dengan teks putih.
- Tombol angka lainnya berwarna putih dengan border tipis.
- Semua tombol berukuran sama dan ada jarak kecil antar tombol.

**Logika yang harus jalan:**
- Klik angka halaman → angka itu jadi aktif (berwarna ungu).
- Klik `>` → pindah ke halaman berikutnya (maksimal halaman 3).
- Klik `<` → kembali ke halaman sebelumnya (minimal halaman 1).

Setelah selesai, import `Pagination` ke dalam `HomeClient.tsx` dan letakkan di bagian paling bawah, setelah `ProductGrid`.

---

### ☐ Tahap 7 — Finalisasi HomeClient & Review Akhir

Sebelum review visual, pastikan `HomeClient.tsx` sudah merangkai semua komponen dengan benar:

1. Buka `frontend/components/home/HomeClient.tsx`. Pastikan semua komponen sudah diimport dan tersusun dari atas ke bawah: `Banner` → `CategoryTabs` → `ProductGrid` → `Pagination`. Komponen ini harus ditandai sebagai Client Component (tambahkan `"use client"` di baris pertama file) karena komponennya memerlukan interaksi klik dari pengguna.
2. Pastikan `frontend/app/home/page.tsx` sudah memanggil `HomeClient` dengan benar. File ini cukup berisi satu baris render `<HomeClient />`.
3. Buka browser dan akses halaman Home. Lihat tampilannya secara keseluruhan dari atas ke bawah.
4. Bandingkan dengan gambar desain yang diberikan. Pastikan:
   - Jarak antar section sudah proporsional, tidak terlalu rapat dan tidak terlalu longgar
   - Grid produk terdiri dari tepat **4 kolom**
   - Warna-warna sudah sesuai (ungu untuk aksen, biru untuk nama produk, dll.)
   - Search bar dan judul "Produk" sejajar dalam satu baris
   - Pagination sudah ada di bawah dengan teks info di kiri dan tombol di kanan
5. Perbaiki jika ada yang belum sesuai.
6. Buka console di browser (tekan F12 → tab Console) dan pastikan tidak ada error merah.
7. Jalankan perintah `npm run build` dari dalam folder `frontend/` dan pastikan berhasil tanpa error TypeScript.
