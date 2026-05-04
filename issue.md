# Implementasi API Admin Products dan Integrasi Frontend

**Tujuan:**
Mengimplementasikan API CRUD untuk entitas `Product` pada sisi admin dan memastikan halaman beserta form admin dapat terintegrasi dengan API tersebut.

## 1. Spesifikasi API

Berikut adalah kontrak API yang perlu diimplementasikan di backend dan dikonsumsi oleh frontend:

### 1.1 GET `/api/admin/products`
Digunakan untuk mengambil semua daftar produk pada halaman admin.

**Response (200 Success):**
```json
{
   "success": true,
   "message": "data berhasil ditemukan",
   "Productdata": [
        {
            "id": "string",
            "categories_id": "string",
            "category_name": "string",
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

### 1.2 POST `/api/admin/products`
Digunakan untuk menambahkan produk baru melalui form admin.

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

**Response (201 Created):**
```json
{
    "success": true,
    "message": "data product berhasil ditambahkan",
    "Productdata": [
        {
            "id": "string",
            "categories_id": "string",
            "category_name": "string",
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

### 1.3 PUT `/api/admin/products/{id}`
Digunakan untuk mengupdate data produk yang ada melalui form admin.

**Response (200 Success):**
```json
{
    "success": true,
    "message": "data product berhasil di update",
    "Productdata": [
        {
            "id": "string",
            "categories_id": "string",
            "category_name": "string",
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

### 1.4 DELETE `/api/admin/products/{id}`
Digunakan untuk menghapus produk dari halaman admin.

**Response (200 Success):**
```json
{
    "success": true,
    "message": "data product berhasil dihapus"
}
```

### 1.5 Error Response (Format Umum)
Jika terjadi error (misalnya validasi gagal, ID tidak ditemukan, internal server error).

**Response (4xx / 5xx):**
```json
{
    "success": false,
    "message": "pesan error disesuaikan (misal: data tidak lengkap, gagal ditambahkan, bad request, atau internal server error tergantung case-nya)"
}
```

## 2. Instruksi Implementasi

### Bagian Backend (Go)
1. **Routing:** Pastikan endpoint `GET`, `POST`, `PUT`, dan `DELETE` untuk `/api/admin/products` sudah terdaftar di `routes.go` di dalam group route admin.
2. **Controller (`admin-product-controller.go`):** Implementasikan handler untuk masing-masing endpoint dengan memastikan struktur response JSON sesuai dengan spesifikasi (mengandung `success`, `message`, dan `Productdata`).
3. **Service & Repository:** Pastikan logika untuk mengambil `category_name` melalui relasi/join database telah diimplementasikan agar format kembalian sesuai dengan object JSON di atas.

### Bagian Frontend (Admin UI)
1. **Daftar Produk (Table):** Fetch data dari endpoint `GET /api/admin/products` dan render list `Productdata` ke dalam tabel di halaman admin produk.
2. **Form Tambah Produk:** Sesuaikan payload data form dengan format Request Body `POST`. Hit endpoint POST saat form disubmit.
3. **Form Edit Produk:** Ambil ID produk yang ingin diubah, isi form dengan data eksisting, dan submit ke endpoint `PUT /api/admin/products/{id}`.
4. **Hapus Produk:** Hubungkan tombol delete/hapus ke endpoint `DELETE /api/admin/products/{id}`.
5. **Feedback & Refresh Data:** Tampilkan notifikasi berdasarkan pesan `message` dari response backend (baik ketika success maupun error) dan jangan lupa refresh/fetch ulang daftar produk setiap kali operasi POST, PUT, atau DELETE berhasil dilakukan.
