# Issue: Implementasi API GET /api/categories

## Deskripsi

Tambahkan endpoint baru untuk mengambil seluruh data kategori dari database.

- **Endpoint:** `GET /api/categories`
- **Method:** GET
- **Auth:** Tidak diperlukan (public endpoint)

---

## Expected Response

### Success (200 OK)

```json
{
  "data": [
    {
      "id": "",
      "name": "",
      "image": "",
      "slug": ""
    }
  ]
}
```

### Error (500 Internal Server Error)

```json
{
  "error": "internal server error"
}
```

---

## Referensi

Sebelum mulai, baca dan pahami implementasi **Banner** yang sudah ada sebagai acuan pola penulisan kode. Perhatikan baik-baik bagaimana setiap layer saling terhubung.

| Layer      | File Referensi                                        |
|------------|-------------------------------------------------------|
| Model      | `backend/src/model/banner-model.go`                   |
| Repository | `backend/src/repository/banner-repository.go`         |
| Service    | `backend/src/service/banner-service.go`               |
| Controller | `backend/src/controller/banner-controller.go`         |
| Routes     | `backend/src/routes/banner-route.go`                  |
| Register   | `backend/routes/routes.go`                            |

---

## Struktur File yang Harus Dibuat

```
backend/
└── src/
    ├── model/
    │   └── category-model.go          ← BUAT BARU
    ├── repository/
    │   └── category-repository.go     ← BUAT BARU
    ├── service/
    │   └── category-service.go        ← BUAT BARU
    ├── controller/
    │   └── category-controller.go     ← BUAT BARU
    └── routes/
        └── category-route.go          ← BUAT BARU

backend/
└── routes/
    └── routes.go                      ← MODIFIKASI
```

---

## Tahapan Implementasi

> Ikuti urutan ini dari atas ke bawah. Jangan loncat ke tahap berikutnya sebelum tahap sebelumnya selesai.

---

### Tahap 1 — Model

**File:** `backend/src/model/category-model.go`

Model adalah representasi tabel database dalam bentuk struct Go. Tugas kamu di sini adalah membuat struct `Category` yang berisi field-field berikut sesuai kolom di tabel `categories`:

- `id` — primary key dari tabel
- `name` — nama kategori
- `image` — URL atau path gambar kategori
- `slug` — versi URL-friendly dari nama kategori

Selain itu, tambahkan method `TableName()` yang mengembalikan string nama tabel di database, yaitu `"categories"`. Method ini dibutuhkan oleh GORM agar otomatis tahu tabel mana yang digunakan.

Pola penulisan: lihat `banner-model.go` sebagai contoh langsung.

---

### Tahap 2 — Repository

**File:** `backend/src/repository/category-repository.go`

Repository adalah layer yang bertugas langsung berkomunikasi dengan database. Di sini kamu hanya perlu membuat satu fungsi yang mengambil **semua data** dari tabel `categories` menggunakan GORM.

Yang perlu diperhatikan:
- Gunakan `config.DB` sebagai koneksi database (sudah tersedia di project, tidak perlu membuat baru)
- Fungsi ini mengembalikan slice dari struct `Category` yang sudah dibuat di Tahap 1
- Fungsi ini juga mengembalikan `error` agar caller bisa menangani jika ada masalah

Pola penulisan: lihat `banner-repository.go` sebagai contoh langsung.

---

### Tahap 3 — Service

**File:** `backend/src/service/category-service.go`

Service adalah layer logika aplikasi. Untuk fitur ini, service hanya bertugas meneruskan panggilan ke repository.

Yang perlu diperhatikan:
- Buat satu fungsi yang memanggil fungsi repository dari Tahap 2
- Return type-nya sama: slice `Category` dan `error`
- Di masa depan, jika ada logika tambahan (filtering, transformasi data, dll), logika itu akan diletakkan di sini, bukan di repository atau controller

Pola penulisan: lihat `banner-service.go` sebagai contoh langsung.

---

### Tahap 4 — Controller

**File:** `backend/src/controller/category-controller.go`

Controller bertugas menerima HTTP request, memanggil service, lalu mengembalikan HTTP response dalam format JSON.

Yang perlu diperhatikan:
- Panggil fungsi service dari Tahap 3
- Jika terjadi error, kembalikan status `500` dengan body `{ "error": "internal server error" }`
- Jika data kosong (tidak ada kategori di database), kembalikan status `200` dengan `data` berupa array kosong
- Jika data ada, kembalikan status `200` dengan key `data` berisi slice hasil query

Pola penulisan: lihat `banner-controller.go` sebagai contoh langsung.

---

### Tahap 5 — Route

**File:** `backend/src/routes/category-route.go`

Route mendaftarkan endpoint HTTP ke aplikasi Fiber dan menghubungkannya ke fungsi controller yang sesuai.

Yang perlu diperhatikan:
- Buat satu fungsi `SetupCategoryRoutes` yang menerima parameter `fiber.Router`
- Di dalam fungsi tersebut, daftarkan satu route: `GET /categories` yang memanggil `controller.GetCategories`
- Perhatikan bahwa prefix `/api` sudah ditangani di `routes.go`, jadi di sini cukup tulis `/categories`

Pola penulisan: lihat `banner-route.go` sebagai contoh langsung.

---

### Tahap 6 — Daftarkan Route (Modifikasi routes.go)

**File:** `backend/routes/routes.go`

Ini adalah file pusat yang mendaftarkan semua route ke aplikasi. File ini perlu **dimodifikasi**, bukan dibuat baru.

Yang perlu dilakukan:
- Tambahkan pemanggilan `SetupCategoryRoutes(api)` di bawah `SetupBannerRoutes(api)`

> ⚠️ **Perhatian penting:** Saat ini `routes.go` menggunakan alias import `bannerRoutes` yang hanya merujuk ke satu route. Karena `SetupCategoryRoutes` berada di package yang **sama** (`marketplace-backend/src/routes`), kamu **tidak bisa** menambahkan import kedua untuk package yang sama. Solusinya: ganti alias `bannerRoutes` menjadi nama yang lebih generik, misalnya `srcRoutes`, lalu gunakan alias baru itu untuk memanggil kedua fungsi setup route sekaligus.

---

## Verifikasi

Setelah semua tahap selesai, lakukan langkah berikut untuk memastikan implementasi berjalan dengan benar:

1. **Build proyek** — jalankan `go build ./...` dari folder `backend`. Pastikan tidak ada error kompilasi.
2. **Jalankan server** — jalankan `go run main.go`.
3. **Test endpoint** — akses `GET http://localhost:3000/api/categories` via Postman atau curl.
4. **Validasi response** — pastikan format response sesuai dengan Expected Response di atas.

---

## Checklist

- [x] `backend/src/model/category-model.go` — dibuat
- [x] `backend/src/repository/category-repository.go` — dibuat
- [x] `backend/src/service/category-service.go` — dibuat
- [x] `backend/src/controller/category-controller.go` — dibuat
- [x] `backend/src/routes/category-route.go` — dibuat
- [x] `backend/routes/routes.go` — dimodifikasi
- [x] `go build ./...` — tidak ada error
- [x] `GET /api/categories` — response sesuai format
