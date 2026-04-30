# Perencanaan Implementasi Fetch API Kategori pada Halaman Admin

## Tujuan
Mengimplementasikan integrasi dari sisi frontend untuk halaman admin category dan form admin agar dapat melakukan operasi CRUD (Create, Read, Update, Delete) menggunakan API `/api/admin/category` yang sudah dibuat dan tersedia di backend.

---

## Spesifikasi API yang Tersedia

Berikut adalah detail endpoint API yang akan digunakan:

### 1. GET `/api/admin/category` (200 Success)
Berfungsi untuk mengambil semua data kategori.
**Response Body:**
```json
{
   "Categorydata": [
        {
            "id": "string",
            "name": "string",
            "image": "string",
            "slug": "string",
            "deleted_at": "timestamp | null",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
   ]
}
```

### 2. POST `/api/admin/category` (201 Created)
Berfungsi untuk membuat data kategori baru.
**Request Body:**
```json
{
    "name": "string",
    "image": "string",
    "slug": "string" // Dihasilkan mengikuti "name"
}
```
**Response Body:**
```json
{
    "success": true,
    "message": "data kategori berhasil ditambahkan"
}
```

### 3. PUT `/api/admin/category/{id}` (200 Success)
Berfungsi untuk mengubah/mengedit data kategori yang sudah ada berdasarkan ID.
**Response Body:**
```json
{
    "success": true,
    "message": "data kategori berhasil di update"
}
```

### 4. DELETE `/api/admin/category/{id}` (200 Success)
Berfungsi untuk menghapus data kategori berdasarkan ID.
**Response Body:**
```json
{
    "success": true,
    "message": "data kategori berhasil dihapus"
}
```

### 5. Format Response Error
Respons ini akan muncul jika terjadi masalah seperti gagal ditambahkan, error bad request, atau internal server error tergantung method yang digunakan.
**Response Body:**
```json
{
    "success": false,
    "message": "error (bisa kategori gagal ditambahkan, error bad request, atau internal server error tergantung method yang digunakan)"
}
```

---

## Tahapan Implementasi (Panduan untuk Junior Programmer / Model AI)

Berikut adalah detail langkah-langkah implementasi yang harus dilakukan pada sisi frontend (tanpa menyentuh kode backend). Pastikan setiap langkah dilakukan berurutan:

### 1. Persiapan Fungsi Service (Fetch API)
- Buat kumpulan fungsi khusus di dalam folder service/API di sisi frontend yang bertugas menangani koneksi ke masing-masing endpoint `/api/admin/category`.
- Buat 4 fungsi terpisah:
  - **Fungsi GET:** Memanggil endpoint GET dan mengembalikan `Categorydata`.
  - **Fungsi POST:** Menerima argumen berupa data form, memanggil endpoint POST, mengirim body request, dan mengembalikan status/pesan.
  - **Fungsi PUT:** Menerima argumen ID dan data form, memanggil endpoint PUT.
  - **Fungsi DELETE:** Menerima argumen ID, memanggil endpoint DELETE.
- Pastikan di setiap fungsi terdapat mekanisme penanganan error (*try/catch*) yang akan menangkap pesan error jika *request* gagal (misalnya format data salah atau server error).

### 2. Implementasi Halaman Daftar Kategori (Admin Category Page)
- Di dalam halaman yang menampilkan daftar kategori, siapkan *state* (penyimpanan data sementara di komponen UI) untuk menampung data array `Categorydata`.
- Saat halaman/komponen pertama kali dimuat (*on mount*), panggil fungsi GET API yang sudah dibuat di langkah pertama.
- Setelah data berhasil didapat dari respons GET API, masukkan data tersebut ke dalam *state* sehingga UI dapat langsung me-render (menampilkan) daftarnya dalam bentuk tabel atau list.
- Siapkan juga *state* untuk penanda *loading* agar ada indikator proses saat sedang menarik data dari API.

### 3. Implementasi Hapus Kategori
- Pada tabel daftar kategori yang ada di langkah 2, pastikan ada tombol atau aksi "Hapus/Delete" di tiap baris data.
- Hubungkan tombol hapus tersebut dengan fungsi DELETE API.
- Saat ditekan, ambil `id` dari data baris tersebut dan lempar ke fungsi DELETE.
- Jika API merespons dengan status sukses (menerima pesan berhasil dihapus), panggil ulang fungsi GET API untuk memperbarui daftar data di tabel atau hilangkan langsung data tersebut dari *state* tabel.

### 4. Implementasi Halaman/Modal Form Kategori (Create & Update)
- Siapkan *state* pada form admin category untuk menampung field input: `name`, `image`, dan `slug`.
- **Logika Slug Otomatis:** Buat mekanisme di frontend agar field `slug` terisi otomatis secara real-time mengikuti teks yang diketik di field `name` (ubah menjadi huruf kecil dan ganti spasi dengan tanda hubung `-`).
- **Mode Tambah Data (Create):** Saat tombol *submit* ditekan untuk menambah data baru, kumpulkan data di form (*name, image, slug*) lalu kirim menggunakan fungsi POST API.
- **Mode Edit Data (Update):** Jika form digunakan untuk mode edit (berarti form sudah terisi data bawaan yang ditarik sebelumnya), gunakan tombol *submit* untuk mengirim ID beserta data terbaru menggunakan fungsi PUT API.
- Tampilkan notifikasi (misal *toast*, *snackbar*, atau *alert*) berdasarkan respons `message` dari backend (berhasil atau gagal).
- Setelah operasi POST atau PUT sukses, tutup form/modal (jika berbasis modal) dan pastikan untuk me-refresh/me-load ulang tabel data di halaman admin kategori agar perubahan langsung terlihat.

### 5. Review dan Testing
- Lakukan pengujian secara keseluruhan.
- Uji menambahkan kategori baru dengan mengisi seluruh data, dan pastikan notifikasi "data kategori berhasil ditambahkan" muncul.
- Periksa apakah tabel data langsung terbarui dengan data baru tersebut.
- Uji mengubah data tersebut dan uji proses hapus.
- Pastikan bila backend mengirim `success: false` karena *bad request* atau *server error*, notifikasi error yang wajar muncul di layar pengguna dan UI tidak rusak (*crash*).
