# Perencanaan Implementasi API Banners untuk Halaman Admin

Dokumen ini berisi panduan dan spesifikasi untuk mengimplementasikan fitur API CRUD Banners pada halaman admin. Harap ikuti langkah-langkah di bawah ini secara berurutan.

## 1. Spesifikasi Database

Tabel yang digunakan adalah `banners`. Pastikan untuk mengeluarkan atau memetakan semua field berikut sesuai dengan tipe datanya:

| Field      | Type         | Null | Key | Default           | Extra                                         |
|------------|--------------|------|-----|-------------------|-----------------------------------------------|
| id         | char(36)     | NO   | PRI | NULL              | Menggunakan UUID                              |
| title      | varchar(255) | NO   |     | NULL              |                                               |
| image      | varchar(255) | NO   |     | NULL              |                                               |
| is_active  | tinyint(1)   | NO   |     | 1                 |                                               |
| deleted_at | timestamp    | YES  |     | NULL              |                                               |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

---

## 2. Definisi Endpoint

- `GET /api/admin/banners`
- `POST /api/admin/banners`
- `PUT /api/admin/banners/{id}`
- `DELETE /api/admin/banners/{id}`

---

## 3. Spesifikasi Format Response & Request

### A. GET Banners (Success - 200 OK)
Digunakan untuk menarik list banner.
```json
{
   "success": true,
   "message": "data berhasil ditemukan",
   "Bannerdata": [
        {
            "id": "string",
            "title": "string",
            "image": "string",
            "is_active": "integer",
            "deleted_at": "timestamp | null",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
   ]
}
```

### B. POST Banners (Success - 201 Created)
**Request Body:**
```json
{
    "title": "string",
    "image": "string",
    "is_active": "integer"
}
```

**Response Body:**
```json
{
    "success": true,
    "message": "data banners berhasil ditambahkan",
    "Bannerdata": [
        {
            "id": "string",
            "title": "string",
            "image": "string",
            "is_active": "integer",
            "deleted_at": "timestamp | null",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
   ]
}
```

### C. PUT Banners (Success - 200 OK)
**Response Body:**
```json
{
    "success": true,
    "message": "data banners berhasil di update",
    "Bannerdata": [
        {
            "id": "string",
            "title": "string",
            "image": "string",
            "is_active": "integer",
            "deleted_at": "timestamp | null",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
   ]
}
```

### D. DELETE Banners (Success - 200 OK)
**Response Body:**
```json
{
    "success": true,
    "message": "data banners berhasil dihapus",
    "Bannerdata": [
        {
            "id": "string"
        }
   ]
}
```

### E. Error Response (Contoh: Bad Request / Internal Server Error)
```json
{
    "success": false,
    "message": "error (sesuaikan pesannya. misal: data banners gagal ditambahkan, id tidak ditemukan, dll)"
}
```

---

## 4. Tahapan Implementasi

Berikut adalah detail tahapan yang harus dilakukan untuk mengimplementasikan fitur ini. **(Tidak perlu menulis kode di sini, cukup ikuti alur logikanya saat implementasi)**:

### Langkah 1: Persiapan Model Data (Entity/Struct)
- Petakan skema tabel `banners` yang telah dijelaskan di atas ke dalam struktur data di dalam kode. Pastikan tipe datanya relevan (terutama konversi dari UUID ke `string` dan `tinyint` ke `integer` atau `boolean` tergantung bahasa).
- Buat object request / payload handler khusus untuk POST dan PUT yang hanya memvalidasi field `title`, `image`, dan `is_active`.

### Langkah 2: Implementasi Service Layer (Logika Aplikasi)
Lokasi: `src/admin/service/` (misal: `admin-banner-service.ts`)
- **Fungsi GET:** Buat logika untuk melakukan *query* pengambilan semua data banner dari database. Pastikan semua field ter-select.
- **Fungsi POST:** Buat logika yang menerima payload dari pengguna, *generate* ID baru bertipe UUID (karena field id adalah char 36), set nilai default jika perlu, dan simpan ke database. 
- **Fungsi PUT:** Buat logika untuk mengecek apakah data dengan ID yang diberikan ada di tabel. Jika ada, lakukan update pada baris tersebut dengan data payload baru.
- **Fungsi DELETE:** Buat logika untuk menghapus banner. Tentukan apakah menggunakan *hard delete* atau *soft delete* (dengan mengisi kolom `deleted_at`) menyesuaikan dengan konvensi dari entitas lain di project ini.

### Langkah 3: Implementasi Controller / Handler
- Buat fungsi handler untuk menangkap request HTTP untuk setiap aksi (GET, POST, PUT, DELETE).
- Panggil logika dari Service Layer yang sesuai.
- Format hasil return dari Service ke dalam format JSON response yang **persis sama** dengan pedoman Spesifikasi Format Response di atas. Perhatikan huruf besar/kecil seperti key `"Bannerdata"`.
- Atur **HTTP Status Code** dengan benar (200 untuk OK, 201 untuk Created, 400/500 untuk error).

### Langkah 4: Registrasi Routing
Lokasi: `src/admin/routes/` (misal: `admin-banner-routes.ts`)
- Definisikan rute untuk masing-masing endpoint (`/api/admin/banners` dan `/api/admin/banners/{id}`).
- Hubungkan rute-rute tersebut (menggunakan HTTP Method yang sesuai: GET, POST, PUT, DELETE) dengan fungsi handler di dalam Controller yang telah disiapkan di Langkah 3.

### Langkah 5: Testing (Pengujian)
- Jalankan aplikasi.
- Lakukan pengujian menggunakan REST Client (seperti Postman atau cURL).
- Validasi bahwa balikan JSON-nya (baik key seperti `success`, `message`, `Bannerdata`, maupun isinya) tidak ada yang meleset dari kontrak response di atas, baik pada saat kondisi sukses maupun saat kondisi gagal (error handling).
