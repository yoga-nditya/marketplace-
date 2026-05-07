# Perencanaan Implementasi API CRUD FAQs untuk Halaman Admin

**Deskripsi Tugas:**
Tugas ini bertujuan untuk membuat RESTful API untuk mengelola data FAQ (Frequently Asked Questions) di halaman admin. Fitur yang perlu diimplementasikan mencakup operasi GET (ambil semua data), POST (tambah data), PUT (ubah data), dan DELETE (hapus data).

## Struktur Database
Pastikan tabel `faqs` di database memiliki struktur berikut (untuk query dan response API):

| Field      | Type         | Null | Key | Default | Extra |
|------------|--------------|------|-----|---------|-------|
| id         | char(36)     | NO   | PRI | NULL    |       |
| question   | varchar(255) | NO   |     | NULL    |       |
| answer     | text         | NO   |     | NULL    |       |
| deleted_at | timestamp    | YES  |     | NULL    |       |
| created_at | timestamp    | YES  |     | NULL    |       |
| updated_at | timestamp    | YES  |     | NULL    |       |

## Endpoint yang Perlu Dibuat

### Admin Area (Private)
1. `GET /api/admin/faqs` - Mengambil semua data FAQ untuk admin.
2. `POST /api/admin/faqs` - Menambahkan data FAQ baru.
3. `PUT /api/admin/faqs/{id}` - Mengubah data FAQ berdasarkan ID.
4. `DELETE /api/admin/faqs/{id}` - Menghapus data FAQ berdasarkan ID. (Karena tabel memiliki field `deleted_at`, harap implementasikan **soft delete**).

### Public Area
1. `GET /api/faqs` - Mengambil semua data FAQ untuk ditampilkan di halaman Home. (Hanya menampilkan data yang tidak di-soft delete).

## Struktur Folder & File
Kode harus ditempatkan di direktori `src/admin` dengan struktur berikut:
- **Routes:** `src/admin/routes/admin-faqs-routes.ts` (berisi definisi endpoint dan routing)
- **Service:** `src/admin/service/admin-faqs-service.ts` (berisi logika bisnis dan kueri database)

*(Catatan: Referensi implementasi dapat melihat kode dari modul `products` admin yang sudah ada agar konsisten)*

---

## Format Request & Response

### 1. GET /api/admin/faqs
**Response 200 (Success):**
```json
{
   "success": true,
   "message": "data berhasil ditemukan",
   "Faqdata": [
        {
            "id": "string",
            "question": "string",
            "answer": "string",
            "deleted_at": "timestamp | null",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
   ]
}
```

### 2. POST /api/admin/faqs
**Request Body:**
```json
{
    "question": "string",
    "answer": "string"
}
```

**Response 201 (Success):**
```json
{
    "success": true,
    "message": "data faqs berhasil ditambahkan",
    "Faqdata": [
        {
            "id": "string",
            "question": "string",
            "answer": "string",
            "deleted_at": "timestamp | null",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
    ]
}
```

### 3. PUT /api/admin/faqs/{id}
**Request Body:**
```json
{
    "question": "string",
    "answer": "string"
}
```

**Response 200 (Success):**
```json
{
    "success": true,
    "message": "data faqs berhasil di update",
    "Faqdata": [
        {
            "id": "string",
            "question": "string",
            "answer": "string",
            "deleted_at": "timestamp | null",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
    ]
}
```

### 4. DELETE /api/admin/faqs/{id}
**Response 200 (Success):**
```json
{
    "success": true,
    "message": "data faqs berhasil dihapus"
}
```

### 5. GET /api/faqs (Public)
**Response 200 (Success):**
```json
{
   "success": true,
   "message": "data berhasil ditemukan",
   "Faqdata": [
        {
            "id": "string",
            "question": "string",
            "answer": "string",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
   ]
}
```
*(Catatan: Untuk public API, field `deleted_at` tidak perlu ditampilkan jika tidak diperlukan, pastikan hanya data yang aktif yang muncul).*

### Format Error (Untuk Semua Endpoint)
Jika terjadi error (misalnya validasi gagal, ID tidak ditemukan, atau Internal Server Error):
```json
{
    "success": false,
    "message": "pesan error menyesuaikan (misal: faqs gagal ditambahkan / bad request / internal server error)"
}
```
*(Ikuti contoh persis seperti penanganan kode API admin categories yang sudah ada di sistem)*

---

## Tahapan Implementasi Langkah-demi-Langkah

Untuk mempermudah dan memastikan kode berjalan dengan baik, ikuti urutan langkah berikut:

1. **Pembuatan File Dasar:**
   - Buat file `admin-faqs-service.ts` di dalam direktori `src/admin/service/`.
   - Buat file `admin-faqs-routes.ts` di dalam direktori `src/admin/routes/`.

2. **Implementasi Layer Service (`admin-faqs-service.ts`):**
   - **Metode GET (Admin)**: Buat fungsi query ke database untuk mengambil seluruh data di tabel `faqs` yang `deleted_at`-nya bernilai `null`.
   - **Metode GET (Public)**: Buat fungsi query serupa namun pastikan hanya mengambil kolom yang dibutuhkan untuk tampilan user (question, answer, id).
   - **Metode POST**: Buat fungsi untuk menerima `question` dan `answer`. Generate `id` (menggunakan UUID), tetapkan tanggal pada `created_at` dan `updated_at`, kemudian jalankan query `INSERT` ke database.
   - **Metode PUT**: Buat fungsi yang menerima `id`, `question`, dan `answer`. Cek eksistensi data berdasarkan `id`. Jika ada, lakukan query `UPDATE` untuk mengubah pertanyaan, jawaban, dan perbarui `updated_at`.
   - **Metode DELETE**: Buat fungsi yang menerima `id`. Cari data berdasarkan `id`. Lakukan *soft delete* dengan melakukan query `UPDATE` untuk mengisi nilai tanggal dan waktu saat ini pada kolom `deleted_at`.
   - *Pastikan output / kembalian dari setiap fungsi service dapat dengan mudah dibentuk menjadi objek JSON response (`Faqdata`) sesuai spesifikasi di atas.*

3. **Implementasi Layer Routes (`admin-faqs-routes.ts`):**
   - Buat pendefinisian route handler (GET, POST, PUT, DELETE) menggunakan framework router proyek.
   - Pisahkan antara router admin dan router public. Route `GET /api/faqs` ditempatkan di public router.
   - Panggil masing-masing fungsi service yang telah dibuat di langkah 2 ke dalam handler route yang sesuai.
   - Bungkus dalam `try-catch` blok untuk menangani keberhasilan dan *error*.
   - Return atau kembalikan response dalam format JSON baku yang memiliki parameter `success`, `message`, dan `Faqdata` (untuk GET, POST, dan PUT).
   - Tentukan *status code* dengan benar: `200` untuk sukes ambil/ubah/hapus, `201` untuk sukses tambah, `400` untuk *bad request*/*error validasi*, dan `500` untuk *error server*.

4. **Registrasi Route ke Aplikasi Utama:**
   - Temukan file sentral (misal `admin-routes.ts` atau file `index` di direktori server/admin) di mana rute-rute (routes) di-*register*.
   - *Import* rute yang ada di dalam `admin-faqs-routes.ts`.
   - Daftarkan (daftarkan pada Router/App) dengan path awalan `/api/admin/faqs`.

5. **Pengujian Lokal (Testing):**
   - Pastikan aplikasi ter-compile / berjalan tanpa error.
   - Gunakan perangkat lunak API Client (seperti Postman atau Thunder Client) untuk menguji setiap endpoint.
   - Verifikasi seluruh skenario berhasil (termasuk pengecekan format balikan JSON persis seperti desain) dan juga cek penanganan eror jika dimasukkan input yang tidak sesuai atau `id` yang tidak ada.
