# Task: Implementasi API Admin Category

## Deskripsi
Buat API untuk mengelola data kategori khusus untuk halaman admin. API ini mencakup operasi CRUD (Create, Read, Update, Delete) dan harus diimplementasikan mengikuti struktur/pola kode yang mirip dengan endpoint `categories` yang sudah ada sebelumnya.

## Endpoint
- `GET /api/admin/category`
- `POST /api/admin/category`
- `PUT /api/admin/category/{id}`
- `DELETE /api/admin/category/{id}`

## Struktur Database
Response data yang dikembalikan (khususnya untuk GET) harus mencakup semua field di database berikut:
| Field      | Type         | Null | Key | Default | Extra |
|------------|--------------|------|-----|---------|-------|
| id         | char(36)     | NO   | PRI | NULL    |       |
| name       | varchar(255) | NO   |     | NULL    |       |
| image      | varchar(255) | YES  |     | NULL    |       |
| slug       | varchar(255) | NO   |     | NULL    |       |
| deleted_at | timestamp    | YES  |     | NULL    |       |
| created_at | timestamp    | YES  |     | NULL    |       |
| updated_at | timestamp    | YES  |     | NULL    |       |

## Struktur Direktori & File
Kode baru harus diletakkan di dalam `src/admin` dengan pembagian struktur:
- **Routes** (`src/admin/routes/admin-category-routes.ts`): Berisi definisi routing HTTP.
- **Service** (`src/admin/service/admin-category-service.ts`): Berisi *business logic* untuk operasi kategori.

## Spesifikasi Payload Request & Response

### 1. GET `/api/admin/category` (200 Success)
**Response:**
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
**Request Body:**
```json
{
    "name": "string",
    "image": "string",
    "slug": "string" // Dihasilkan mengikuti "name"
}
```

### 3. PUT `/api/admin/category/{id}` (200 Success)
**Response:**
```json
{
    "success": true,
    "message": "data berhasil di update"
}
```

### 4. DELETE `/api/admin/category/{id}` (200 Success)
**Response:**
```json
{
    "success": true,
    "message": "data berhasil dihapus"
}
```

### Format Response Error
**Response (Contoh: 400 Bad Request, 500 Internal Server Error, dll):**
```json
{
    "success": false,
    "message": "error (bisa kategori gagal ditambahkan, error bad request, atau internal server error tergantung method yang digunakan)"
}
```

---

## Tahapan Implementasi (Panduan untuk Programmer / Model AI)
Berikut adalah langkah-langkah detail yang perlu dilakukan tanpa perlu menuliskan kode:

1. **Analisis Pola yang Sudah Ada:**
   - Review kembali file route dan service pada fitur `categories` yang sudah ada (bukan admin) untuk memastikan Anda memahami style code, dependensi database, dan cara *error handling* yang berjalan.

2. **Pembuatan File Service (`admin-category-service.ts`):**
   - Buat fungsi untuk **GET**: Tarik data dari tabel kategori dengan memastikan seluruh field seperti `id`, `name`, `image`, `slug`, `created_at`, `updated_at`, dan `deleted_at` ikut di-query.
   - Buat fungsi untuk **POST**: Siapkan fungsi insert data baru yang menerima `name`, `image`, dan `slug`. Atur logika untuk memanipulasi string `name` menjadi format *URL-friendly* untuk diisi ke `slug` jika tidak tersedia.
   - Buat fungsi untuk **PUT**: Siapkan fungsi update berdasarkan `id`.
   - Buat fungsi untuk **DELETE**: Siapkan fungsi delete berdasarkan `id` (bisa *hard delete* atau *soft delete* menyesuaikan pola aplikasi menggunakan kolom `deleted_at`).

3. **Pembuatan File Routes (`admin-category-routes.ts`):**
   - Import service yang telah dibuat dan tentukan method-method rute (`router.get`, `router.post`, `router.put`, `router.delete`).
   - Ekstrak *request body* atau param ID dari rute lalu masukkan ke dalam argumen *service handler*.
   - Standarkan blok *Try/Catch* pada setiap rute. Jika berhasil (200/201), kembalikan response objek sesuai spesifikasi.
   - Jika gagal, tangkap *exception* dan kembalikan response format error dengan status HTTP yang sesuai (400 atau 500) dan `"success": false`.

4. **Integrasi Router ke Aplikasi Utama:**
   - Setelah route didefinisikan secara independen, jangan lupa menyambungkannya/meng-import file `admin-category-routes.ts` ke dalam index/main router aplikasi (`src/app.ts` atau `src/routes/index.ts`) dengan prefix `/api/admin/category`.

5. **Pengujian Mandiri:**
   - Lakukan pemeriksaan aliran data (uji GET, lalu POST data baru, lalu uji GET lagi untuk verifikasi masuk, kemudian PUT edit data, dan terakhir DELETE).
   - Validasi response *success* maupun format *error* sesuai format JSON yang didefinisikan.
