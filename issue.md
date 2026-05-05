# Rencana Implementasi: Fitur Halaman/Section FAQ (Statis)

## Tujuan
Membuat tampilan antarmuka (UI) untuk bagian *Frequently Asked Question* (FAQ) di halaman Home atau Portal. Untuk tahap awal, tampilan hanya akan dibuat statis menggunakan data *dummy* (mock data) tanpa melakukan pemanggilan ke API (Backend).

## Referensi Visual & Perilaku (Behavior)
Berdasarkan referensi yang diberikan:
1. Terdapat judul utama **"Frequently Asked Question"** di tengah halaman, dilengkapi dengan ornamen garis horizontal kecil di bawahnya.
2. FAQ ditampilkan dalam format **Accordion** (daftar yang bisa memanjang ke bawah).
3. **Kondisi Normal (Tertutup):** Kotak pertanyaan berwarna putih dengan teks gelap. Di sisi kanan kotak, terdapat ikon *dropdown / chevron* yang mengarah ke bawah.
4. **Kondisi Aktif (Terbuka):** 
   - Kotak pertanyaan berubah warna *background* menjadi biru gelap (navy) dan teks berubah menjadi warna putih.
   - Ikon *chevron* berputar mengarah ke atas.
   - Tepat di bawah kotak pertanyaan tersebut, muncul panel *dropdown* berwarna putih yang memuat teks penjelasan (jawaban).

---

## Tahapan Implementasi

Berikut adalah langkah-langkah terstruktur untuk mengimplementasikan fitur ini. Anda hanya perlu fokus pada pembuatan UI dan logika *state* di *client-side*.

### 1. Persiapan Data Dummy (Mock Data)
- Buat sebuah konstanta/variabel yang berisi *array of objects*.
- Setiap objek merepresentasikan satu item FAQ dan setidaknya memiliki *key*: `id`, `question` (pertanyaan), dan `answer` (jawaban panjang berupa *string*).

### 2. Pembuatan Komponen Item FAQ (`FAQAccordionItem`)
- Buat *Reusable Component* untuk merender satu baris pertanyaan beserta panel jawabannya.
- **Manajemen State:** Gunakan *hook* (misalnya `useState` jika menggunakan React/Next.js) untuk melacak *state* apakah item ini sedang `isOpen` (terbuka) atau tertutup.
- **Interaksi:** Pasang *event listener* (`onClick`) pada area kotak pertanyaan yang akan mengubah nilai *state* `isOpen` tersebut.

### 3. Pembuatan Styling / Layouting
- **Styling Kondisi Dinamis:** Gunakan pengkondisian kelas CSS (misal: *conditional class* di Tailwind CSS) berdasarkan *state* `isOpen`.
  - Jika `isOpen` bernilai **false**: Gunakan *background* putih dan teks gelap.
  - Jika `isOpen` bernilai **true**: Gunakan *background* biru gelap (navy) dan teks putih untuk kotak pertanyaan.
- **Transisi Ikon:** Pastikan ikon *chevron* menggunakan rotasi yang dinamis berdasarkan *state* (misal: memutar 180 derajat saat aktif).
- **Panel Jawaban:** Buat *container* untuk jawaban dengan *background* putih. Area ini hanya di-*render* atau dimunculkan ketika `isOpen` bernilai **true**. Berikan sedikit *padding* agar teks mudah dibaca.

### 4. Pembuatan Komponen Induk / Section FAQ (`FAQSection`)
- Buat komponen *wrapper* besar yang akan dipanggil di halaman utama.
- Tambahkan elemen untuk merender Judul Utama dan garis bawahnya.
- Lakukan perulangan (*mapping*) pada data dummy (dari Tahap 1) untuk memanggil komponen `FAQAccordionItem` (dari Tahap 2) secara berurutan.

### 5. Integrasi ke Halaman Utama (Portal / Home)
- Buka file halaman beranda (contoh: `page.tsx` atau file *view* utama).
- *Import* komponen `FAQSection` tersebut.
- Tempelkan (*mount*) komponen ini di bagian bawah layout halaman sesuai dengan urutan desain yang diinginkan.

### 6. Pengujian Tampilan (QA)
- Lakukan pengecekan responsivitas: pastikan tampilan tetap rapi, teks tidak terpotong, dan jarak (margin/padding) terlihat proporsional baik pada layar desktop maupun *mobile*.
- Uji coba fungsionalitas klik: pastikan setiap pertanyaan bisa diklik untuk membuka panel jawaban, merubah warna menjadi navy, dan ketika diklik lagi dapat tertutup dengan baik.
