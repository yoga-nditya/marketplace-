# Perencanaan Implementasi API Admin Products

Dokumen ini berisi panduan dan tahapan detail untuk mengimplementasikan fitur CRUD Products pada halaman admin. Panduan ini dirancang untuk diimplementasikan langkah demi langkah oleh junior programmer atau AI model asisten.

## 1. Spesifikasi Database
Tabel `products` memiliki struktur sebagai berikut:

| Field         | Type         | Null | Key | Default | Extra |
|---------------|--------------|------|-----|---------|-------|
| id            | char(36)     | NO   | PRI | NULL    |       |
| categories_id | char(36)     | YES  | MUL | NULL    |       |
| name          | varchar(255) | NO   |     | NULL    |       |
| image         | varchar(255) | YES  |     | NULL    |       |
| price         | int unsigned | NO   |     | 0       |       |
| capital_price | int unsigned | NO   |     | 0       |       |
| description   | text         | NO   |     | NULL    |       |
| weight        | int unsigned | NO   |     | NULL    |       |
| stock_amount  | int unsigned | NO   |     | NULL    |       |
| minimum_order | int unsigned | NO   |     | NULL    |       |
| slug          | varchar(255) | NO   |     | NULL    |       |
| deleted_at    | timestamp    | YES  |     | NULL    |       |
| created_at    | timestamp    | YES  |     | NULL    |       |
| updated_at    | timestamp    | YES  |     | NULL    |       |

## 2. Spesifikasi Endpoint
Base Endpoint: `/api/admin/products`

- `GET /api/admin/products` (Mengambil daftar data produk)
- `POST /api/admin/products` (Menambah data produk baru)
- `PUT /api/admin/products/{id}` (Mengubah data produk berdasarkan ID)
- `DELETE /api/admin/products/{id}` (Menghapus data produk berdasarkan ID)

## 3. Struktur Direktori dan File
Implementasi ini harus diletakkan pada struktur folder `src/admin` dengan format berikut:
- **Routes:** `src/admin/routes/admin-product-routes.ts`
- **Service:** `src/admin/service/admin-product-service.ts`

*(Catatan: Sesuaikan ekstensi file dengan backend yang digunakan. Proyek backend sebelumnya terlihat menggunakan Golang (`.go`), namun penamaan file tetap mengikuti format yang sudah didefinisikan)*

## 4. Spesifikasi Response API

### Response GET (Success 200)
```json
{
   "success": true,
   "message": "data berhasil ditemukan",
   "Productdata": [
        {
            "id": "string",
            "categories_id": "string",
            "name": "string",
            "image": "string",
            "price": 10000,
            "capital_price": 5000,
            "description": "string",
            "weight": 100,
            "stock_amount": 10,
            "minimum_order": 1,
            "slug": "string",
            "deleted_at": null,
            "created_at": "2024-05-01 10:00:00",
            "updated_at": "2024-05-01 10:00:00"
        }
   ]
}
```

### Response POST (Success 201)
**Request Body:**
```json
{
    "categories_id": "string",
    "name": "string",
    "image": "string",
    "price": 10000,
    "capital_price": 5000,
    "description": "string",
    "weight": 100,
    "stock_amount": 10,
    "minimum_order": 1,
    "slug": "string"
}
```
**Response Body:**
```json
{
    "success": true,
    "message": "data product berhasil ditambahkan",
    "Productdata": [
        {
            "id": "string",
            "categories_id": "string",
            "name": "string",
            "image": "string",
            "price": 10000,
            "capital_price": 5000,
            "description": "string",
            "weight": 100,
            "stock_amount": 10,
            "minimum_order": 1,
            "slug": "string",
            "deleted_at": null,
            "created_at": "2024-05-01 10:00:00",
            "updated_at": "2024-05-01 10:00:00"
        }
   ]
}
```

### Response PUT/Update (Success 200)
**Request Body:** Sama seperti Request Body pada fungsi POST di atas.
**Response Body:**
```json
{
    "success": true,
    "message": "data product berhasil di update",
    "Productdata": [
        {
            "id": "string",
            "categories_id": "string",
            "name": "string",
            "image": "string",
            "price": 10000,
            "capital_price": 5000,
            "description": "string",
            "weight": 100,
            "stock_amount": 10,
            "minimum_order": 1,
            "slug": "string",
            "deleted_at": null,
            "created_at": "2024-05-01 10:00:00",
            "updated_at": "2024-05-01 10:00:00"
        }
   ]
}
```

### Response DELETE (Success 200)
```json
{
    "success": true,
    "message": "data product berhasil dihapus",
    "Productdata": [
        {
            "id": "string"
        }
   ]
}
```

### Response Error (Contoh 400/500)
```json
{
    "success": false,
    "message": "error (pesan disesuaikan, misalnya data tidak lengkap, gagal ditambahkan, bad request, atau internal server error tergantung case-nya)"
}
```
*(Catatan: Format response error ini sesuaikan penerapannya persis seperti pada kode admin categories yang sudah ada saat ini).*

---

## 5. Tahapan Implementasi

Untuk junior programmer atau AI yang akan mengeksekusi instruksi ini, kerjakan langkah-langkah berikut secara berurutan dan jangan lompati satupun:

### Tahap 1: Persiapan Representasi Data / Model
1. Pelajari skema database di atas dan siapkan tipe data / struktur obyek (seperti Struct/Interface/Class) yang mewakili entitas `Product`.
2. Buat struktur/dto untuk `RequestBody` khusus menampung field dari request `POST/PUT`.
3. Buat wrapper response sesuai dengan format JSON di atas (`{ success, message, Productdata }`).

### Tahap 2: Implementasi Business Logic (`admin-product-service`)
Buat file `admin-product-service` dan siapkan empat fungsi utama yang berisi logika interaksi dengan database:
1. **Fungsi Get Products**: 
   - Lakukan query ke database tabel `products`. 
   - Kumpulkan dan retun array data dari tabel.
2. **Fungsi Create Product**: 
   - Ekstrak data dari input body.
   - Hasilkan `id` unik berupa karakter UUID 36-char.
   - Tentukan nilai kolom `created_at` dan `updated_at`.
   - Simpan (`INSERT`) object ke tabel.
   - Return data produk yang baru ditambahkan.
3. **Fungsi Update Product**: 
   - Pastikan ID produk tersedia/valid di database.
   - Update field dari tabel (`name`, `price`, dll) menggunakan data yang diterima.
   - Set `updated_at` dengan timestamp saat ini.
   - Simpan perubahan (`UPDATE`) dan kembalikan data terbaru.
4. **Fungsi Delete Product**: 
   - Lakukan pencarian berdasar ID untuk memvalidasi keberadaan produk.
   - Tergantung arsitektur yang digunakan, lakukan update field `deleted_at` dengan timestamp (Soft Delete) atau hapus langsung (Hard Delete).
   - Return ID dari produk yang sukses dihapus.

### Tahap 3: Implementasi Controller / Handler
1. Buat kode untuk menangkap request HTTP di masing-masing endpoint.
2. Lakukan validasi data request. Jika error, langsung return response error dengan `success: false`.
3. Panggil metode yang sesuai pada `admin-product-service`.
4. Ambil return dari service, lalu format JSON Response tepat menyesuaikan dengan struktur kunci yang diminta (perhatikan keys seperti `"Productdata"` dengan huruf kapital pada "P").

### Tahap 4: Implementasi Routing (`admin-product-routes`)
1. Buka (atau buat) file route `admin-product-routes`.
2. Daftarkan URL: 
   - `GET /api/admin/products`
   - `POST /api/admin/products`
   - `PUT /api/admin/products/{id}`
   - `DELETE /api/admin/products/{id}`
3. Sambungkan/mapping masing-masing rute HTTP ke controller yang sudah dibuat pada *Tahap 3*.
4. Pasang (register) route grup ini agar terbaca oleh router utama aplikasi.

### Tahap 5: Finalisasi & Pengujian
1. Pastikan seluruh logic mengikuti pattern/gaya kode yang identik dengan implementasi `categories` admin yang sudah ada.
2. Lakukan uji coba `POST`, cek apakah return object utuh.
3. Lakukan uji coba `GET`, cek apakah list array kembali utuh.
4. Lakukan `PUT` lalu verifikasi jika hanya data yang dituju yang terupdate.
5. Terakhir, jalankan uji coba format error agar memastikan JSON handling menangkap kasus data tidak valid dengan properti `{ "success": false }`.
