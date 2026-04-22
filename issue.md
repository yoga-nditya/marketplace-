# Issue: Backend - Implementasi API GET /api/products & Frontend - Integrasi Fetch API

## Deskripsi

Issue ini mencakup dua bagian utama (Backend dan Frontend) yang harus dikerjakan:
1. **Backend**: Membuat endpoint baru untuk melayani request data via `GET /api/products`.
2. **Frontend**: Melakukan fetching/integrasi dinamis pada halaman Home agar Tab Kategori memanggil endpoint `/api/categories` (yang sudah ada), dan komponen Cards Produk memanggil endpoint `/api/products`.

---

## Bagian 1: Backend - Endpoint GET /api/products

### Expected API Response

**Success (200 OK):**
```json
{
  "data": [
    {
      "id": "string",
      "categories_id": "string",
      "name": "string",
      "image": "string",
      "slug": "string",
      "price": 10000,
      "stock_amount": 50
    }
  ]
}
```

**Error Response:**
```json
{ "error": "unauthorized" }
// atau
{ "error": "bad request" }
```

### Struktur File Backend yang Terlibat
> *Catatan:* Ekstensi mengikuti backend yang ditulis menggunakan bahasa Go (`.go`). Sesuaikan pola ini dengan pola pada fitur `categories` sebelumnya.
- `backend/src/model/product-model.go` (Baru)
- `backend/src/repository/product-repository.go` (Baru)
- `backend/src/service/product-service.go` (Baru)
- `backend/src/controller/product-controller.go` (Baru)
- `backend/src/routes/product-route.go` (Baru)
- `backend/routes/routes.go` (Dimodifikasi)

### Tahapan Pengerjaan Backend

> **PENGINGAT UNTUK JUNIOR / AI:** Jangan merujuk atau menuliskan cuplikan baris kode. Cukup pahami instruksi logis untuk setiap *layering* berikut dan ikuti gayanya dari *source-code categories*. Kerjakan secara berurutan.

1. **Model:** Buat struct `Product` dengan field: `id`, `categories_id`, `name`, `image`, `slug`, `price`, dan `stock_amount`. Sisipkan pemetaan tag JSON/GORM, dan jangan lupa method penanda `TableName` berisi identifier ke tabel `products`.
2. **Repository:** Buat query pengambilan dari seluruh data `products` menggunakan GORM (`config.DB`), berikan nilai baliknya dalam bentuk array/slice serta state error.
3. **Service:** Bertindak sebagai *pipeline*, tempat logika bisnis. Fungsi ini sekedar mengeksekusi metode query di repository lalu meneruskan keluar data set `Product`.
4. **Controller:** Bertugas menerima HTTP Response dari request ke server Fiber. Evaluasi perlakuan *bad request/unauthorized* seperti standard *Expected Response*. Saat lolos, cetak format JSON sesuai key root `"data": [...]`.
5. **Routes:** Rangkai method handling endpoint `GET /products` agar disalurkan kepada handler di controller tersebut.
6. **Main Routes:** Input inisialisator route produk yang sebelumnya baru dibentuk, letakkan itu pada registrasi route induk yang letaknya terpusat di direktori konfigurasi routers backend (`routes.go`). 

---

## Bagian 2: Frontend - Integrasi Data Halaman Home

Ubah UI di halaman beranda (Home) yang tadinya mengambil hardcode variabel statis agar langsung mengambil dari API response backend.

### 1. Integrasi UI Tab Kategori
- **Target Endpoint:** `GET /api/categories`
- **Expected Root Data:**
```json
{
    "Categorydata": [
        {
            "id": "string",
            "name": "string",
            "image": "string",
            "slug": "string"
        }
    ]
}
```
- **Tugas Implementasi:**
  1. Siapkan service atau function fecthing berbasis AJAX/API call ke alamat host server `/categories`.
  2. Implementasikan react states dan hooks sejenisnya manakala page load berlangsung di Home untuk mendatangkan set daftar ini.
  3. Lakukan rendering array dari body `"Categorydata"` sebagai kumpulan dari UI tabs tiap masing-masing nama kategori.

### 2. Integrasi UI Kumpulan Card Produk
- **Target Endpoint:** `GET /api/products`
- **Expected Root Data:**
```json
{
    "data": [
        {
            "id": "string",
            "categories_id": "string",
            "name": "string",
            "image": "string",
            "slug": "string",
            "price": 10000,
            "stock_amount": 50
        }
    ]
}
```
- **Tugas Implementasi:**
  1. Set up logic fetching baru menuju URL endpoint `/products`.
  2. Eksekusi pemanggilan state-filling, bersamaan dan selaras dari logika tabs kategori apabila ada fungsionalitas filtering.
  3. Lakukan mapping visual komponen per-Card menurut baris yang dipunya oleh object array key `"data"`.

---

## Verifikasi Akhir (Checklist)

- [ ] (Backend) Modul kode Go dirangkai solid dan tidak me-return *Compile Error* kala `go build ./...` dieksekusi.
- [ ] (Backend) Return dari endpoint URI `/api/products` mengeluarkan expected format JSON sebagaimana pengujian via Postman/cURL.
- [ ] (Frontend) List di elemen UI kategori pada layer website termapping sesuai isi payload `"Categorydata"`.
- [ ] (Frontend) Item barang yang termuat dan tampil ke pengguna telah bersumber langsung dari list data array.
