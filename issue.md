# Perencanaan Integrasi API pada Halaman Home

**Tujuan:**
Menghubungkan elemen antarmuka (UI) pada halaman Home, yaitu bagian Tab Kategori dan list Kartu Produk (Product Cards), agar memakai data dinamis dari REST API yang telah tersedia.

---

## 1. Spesifikasi Format Response API (Kontrak Data)

Implementator wajib menyesuaikan proses mapping dan ekstraksi data berdasarkan format *response* yang dikembalikan oleh masing-masing *endpoint*.

**Endpoint: `GET /api/categories`**
*Response* yang dihasilkan akan memiliki format:
```json
{
    "Categorydata": [
        {
            "id": "string",
            "name": "string",
            "slug": "string"
        }
    ]
}
```

**Endpoint: `GET /api/products`**
*Response* yang dihasilkan akan memiliki format (beserta kaitan relasional ID kategori):
```json
{
    "Categorydata": [
        {
            "id": "string",
            "categories_id" : "string",
            "name": "string",
            "image": "string",
            "slug": "string",
            "price" : "int",
            "stock_amount" : "int"
        }
    ]
}
```
*(Perhatikan, array produk berada di dalam object key bernama `Categorydata`, sesuai dengan spesikasi dari backend).*

---

## 2. Tahapan Implementasi Langkah-demi-langkah

Ikuti instruksi di bawah ini secara runut untuk mengimplementasikan fungsionalitas fetch dan display. Tidak ada tambahan konfigurasi library yang diperlukan, cukup gunakan bawaan framework (seperti `fetch` atau library HTTP client yang sudah ada di *project*).

### Tahap 1: Persiapan Variabel State (State Management)
1. Tentukan (*locate*) *file* komponen halaman Home atau *file* komponen khusus yang sedang membungkus Tab dan List Produk.
2. Buat variabel state penampung utama:
   - State untuk menyimpan daftar Kategori (nilai awal berupa *array* kosong).
   - State untuk menyimpan daftar Produk (nilai awal berupa *array* kosong).
   - State untuk menandai Kategori aktif / tab sedang terpilih (contoh: kategori dengan `id` "Semua" atau `null` sebagai penanda *default*).
   - State indikator *loading* (boolean).

### Tahap 2: Fetch Data Kategori & Produk
1. Buat suatu fungsi asynchronous (misal: `fetchHomeData`).
2. Tembakkan HTTP GET Request ke '/api/categories'.
   - Dari hasil kembalian datanya, ambil nilai object `Categorydata`.
   - Simpan hasil tersebut ke dalam State daftar Kategori.
3. Di dalam fungsi yang sama atau dengan fungsi yang berbeda (*concurrently*), tembakkan HTTP GET Request ke '/api/products'.
   - Ambil *array* daftar produk yang terbungkus pada *field key* `Categorydata`.
   - Simpan nilai array tersebut ke State daftar Produk.
4. Lakukan pemanggilan fungsi *fetch* ini secara otomatis ketika *component* pertama kali dirender (contoh: di blok inisialisasi / *hook on mount*).

### Tahap 3: Menyatukan Data ke UI - Bagian Tab Kategori
1. Cari *codingan* statis / HTML yang saat ini membentuk menu navigasi kategori (Tabs).
2. Lakukan iterasi / proses pemetaan (*mapping*) terhadap array state daftar Kategori.
3. Untuk masing-masing elemen pada array:
   - Buat elemen Tab HTML yang merender `name` kategori.
   - Pautkan ID komponen (seperti `key` pada React) menggunakan atribut `id` dari API.
4. Tambahkan fungsi *OnClick* di tiap tab: Apabila tab tersebut diklik, perbarui / *update* State Kategori aktif dengan `id` kategori spesifik yang diklik oleh user. 

### Tahap 4: Menyatukan Data ke UI - Bagian Product Cards
1. Cari komponen UI atau block HTML untuk kartu produk (Product Card).
2. **Logika Filter (Opsional jika dilakukan di frontend):** Modifikasi array data dari *State daftar Produk*. Buat pengecekan: jika "State Kategori aktif" sedang tidak di *default* "Semua", saring (*filter*) array produk agar yang memiliki `categories_id` sama dengan "State Kategori aktif" saja yang diteruskan.
3. Lakukan proses *mapping* / iterasi dari hasil array produk (atau produk yang sudah disaring).
4. Di dalam komponen Card yang diiterasi, masukkan variabel *properties* dari API untuk mengubah UI agar dinamis:
   - Ganti *Source gambar dummy* menjadi field `image`.
   - Ganti *Teks Nama* (Judul Produk) menggunakan field `name`.
   - Ganti *Label Harga* menggunakan indikator angka dari data `price`.
   - Modifikasi *Status Stok* (Label ketersediaan) yang mengacu ke angka `stock_amount`.
5. Arahkan *link klik* atau URL navigasi kartu ke halaman detail produk berbekal field unik `slug`.

### Tahap 5: Pengujian (Testing & Verifikasi)
1. **Reload halaman Home**: Periksa bahwa Tab kategori memunculkan nama-nama dinamis hasil API (Bukan data dari layout *dummy*/statis).
2. **Render Awal**: Pastikan produk yang muncul di baris bawah / penampang grid memiliki gambar, nama, dan harga yang pas mengacu kepada apa yang didapatkan komponen fetch API produk.
3. **Behavior Klik Tab**: Cobalah mengklik salah satu Tab Kategori. Pastikan sistem dapat me-render ulang UI dan daftar kartu Produk langsung terfilter, memunculkan kartu hanya untuk produk-produk yang sesuai dengan tipe / `categories_id` kategori tersebut.
