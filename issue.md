# [Feature] Fetch Banner dari API dan Tampilkan di Frontend

## 📋 Description

Backend sudah menyediakan endpoint `GET /api/banners`.
Komponen `Banner.tsx` saat ini masih menggunakan data hardcode.

Tujuan issue ini: **ganti mock data di `Banner.tsx` dengan data nyata dari API**.

---

## 🔍 Context

### Endpoint

```
GET /api/banners
```

### Response Shape

```json
{
  "status": "success",
  "total": 2,
  "Bannerdata": [
    {
      "id": "string (uuid)",
      "title": "string",
      "image": "string (url)",
      "is_active": true
    }
  ]
}
```

> ⚠️ Key array-nya adalah `Bannerdata` (huruf besar B, bukan `data` atau `banners`).

---

## 📁 Files Affected

| File | Action |
|------|--------|
| `frontend/services/bannerService.ts` | CREATE |
| `frontend/components/home/Banner.tsx` | MODIFY |

---

## ✅ Tasks

### 1. Create `frontend/services/bannerService.ts`

Buat folder `services/` di dalam `frontend/`, lalu buat file `bannerService.ts`.

File ini berisi:
- Type `Banner` — merepresentasikan satu objek banner dari API (`id`, `title`, `image`, `is_active`).
- Type `BannerApiResponse` — merepresentasikan full response API (`status`, `total`, `Bannerdata`).
- Fungsi async `fetchBanners()` — memanggil `GET /api/banners` menggunakan `NEXT_PUBLIC_API_URL` dari env, mengembalikan array `Banner[]`, dan mengembalikan `[]` jika data kosong atau `total === 0`.

---

### 2. Modify `frontend/components/home/Banner.tsx`

Ubah komponen yang ada dengan ketentuan:
- Tambah state `banners` (array `Banner[]`, default `[]`) untuk menyimpan data dari API.
- Tambah state `loading` (boolean, default `true`) untuk menampilkan loading state.
- Gunakan `useEffect` dengan dependency array kosong `[]` untuk memanggil `fetchBanners()` sekali saat komponen pertama kali render. Simpan hasilnya ke state `banners`, dan set `loading` ke `false` setelah selesai (baik sukses maupun error).
- Saat `loading === true`, tampilkan placeholder teks "Memuat banner...".
- Saat `banners.length === 0` (setelah loading selesai), tampilkan teks "Tidak ada banner tersedia.".
- Ganti tampilan konten slide dari teks menjadi tag `<img>` yang mengambil `src` dari `banners[currentSlide].image` dan `alt` dari `banners[currentSlide].title`.
- Logika prev/next dan dots indicator **tidak perlu diubah**.

---

## 📌 Notes

- Jangan ubah logika prev/next dan dots indicator — hanya sumber datanya yang diganti.
- Tampilkan semua data yang dikembalikan API tanpa filter `is_active` di frontend.

---

## 🔗 Related

- Backend controller: `backend/src/controller/banner-controller.go`
- Backend model: `backend/src/model/banner-model.go`

---

# [Archived] Issue: Implementasi API GET /api/banners

## Deskripsi

Buat endpoint REST API untuk mengambil semua data banner yang akan ditampilkan di halaman utama marketplace.

- **Method:** `GET`
- **Endpoint:** `/api/banners`
- **Module:** `banner`

---

## Struktur Folder yang Harus Dibuat

Semua file baru berada di dalam folder `backend/src/banner/`.

```
backend/
└── src/
    └── banner/
        ├── controller/
        │   └── banner-controller.go
        ├── model/
        │   └── banner-model.go
        ├── repository/
        │   └── banner-repository.go
        ├── routes/
        │   └── banner-route.go
        └── service/
            └── banner-service.go
```

---

## Konteks Proyek (Baca Dulu!)

Sebelum mulai, pahami pola yang sudah ada di proyek ini:

| Hal | Detail |
|---|---|
| Framework | Go Fiber v2 (`github.com/gofiber/fiber/v2`) |
| ORM | GORM (`gorm.io/gorm`) |
| Database | MySQL |
| Module name | `marketplace-backend` (lihat `go.mod`) |
| Koneksi DB | Sudah tersedia di `config.DB` (dari `backend/config/database.go`) |
| Entry point | `backend/main.go` — routes didaftarkan via `routes.SetupRoutes(app)` |
| Registrasi route | Semua route dipanggil dari `backend/routes/routes.go` |

---

## Tahapan Implementasi

### Tahap 1 — Buat Model Banner

> **Tujuan:** Mendefinisikan struct Go yang merepresentasikan tabel `banners` di database.

**File yang dibuat:** `backend/src/banner/model/banner-model.go`

Buat struct `Banner` yang memiliki field berikut, **sesuai persis dengan skema tabel `banners` di database**:

| Field Go | Tipe | Tag JSON | Tag GORM | Keterangan |
|---|---|---|---|---|
| `ID` | `string` | `"id"` | `primaryKey` | UUID char(36), bukan auto increment |
| `Title` | `string` | `"title"` | `column:title` | Judul banner, NOT NULL |
| `Image` | `string` | `"image"` | `column:image` | Nama/path file gambar, NOT NULL |
| `IsActive` | `bool` | `"is_active"` | `column:is_active` | Status aktif, default true |
| `DeletedAt` | `*time.Time` | `"deleted_at"` | `column:deleted_at` | Soft delete, nullable |
| `CreatedAt` | `*time.Time` | `"created_at"` | `column:created_at` | Waktu dibuat, nullable |
| `UpdatedAt` | `*time.Time` | `"updated_at"` | `column:updated_at" | Waktu diupdate, nullable |

> **Catatan penting:**
> - `ID` bertipe `string` karena kolom di database adalah `char(36)` (UUID), **bukan integer**.
> - `DeletedAt`, `CreatedAt`, `UpdatedAt` bertipe **pointer** `*time.Time` (bukan `time.Time`) karena kolom ini **nullable** di database.
> - Nama tabel GORM secara otomatis akan mencari `banners` (plural). Tambahkan method `TableName()` untuk memastikan:
>   ```go
>   func (Banner) TableName() string { return "banners" }
>   ```

**Contoh pola struct yang benar (jangan copy paste, sesuaikan untuk Banner):**

```go
package model

import "time"

type ContohModel struct {
    ID        string     `json:"id"         gorm:"primaryKey;column:id"`
    NamaField string     `json:"nama_field"  gorm:"column:nama_field"`
    IsAktif   bool       `json:"is_aktif"    gorm:"column:is_aktif"`
    DeletedAt *time.Time `json:"deleted_at"  gorm:"column:deleted_at"`
    CreatedAt *time.Time `json:"created_at"  gorm:"column:created_at"`
    UpdatedAt *time.Time `json:"updated_at"  gorm:"column:updated_at"`
}

func (ContohModel) TableName() string { return "nama_tabel" }
```

---

### Tahap 2 — Buat Repository Banner

> **Tujuan:** Menyediakan fungsi yang berinteraksi langsung dengan database. Layer ini hanya bertugas query data, tidak ada logika bisnis.

**File yang dibuat:** `backend/src/banner/repository/banner-repository.go`

Buat **fungsi repository** berikut:

```go
func GetAllBanners() ([]model.Banner, error) {
    // Query semua banner dari database menggunakan config.DB
    // Gunakan config.DB.Find(&banners) untuk mengambil semua data
    // Kembalikan slice of Banner dan error
}
```

**Cara mengakses database:** Import `marketplace-backend/config` lalu gunakan `config.DB.Find(&banners)`.

---

### Tahap 3 — Buat Service Banner

> **Tujuan:** Berisi logika bisnis. Service memanggil repository dan dapat melakukan transformasi data jika diperlukan.

**File yang dibuat:** `backend/src/banner/service/banner-service.go`

Buat fungsi service yang memanggil repository:

```go
func GetAllBanners() ([]model.Banner, error) {
    // Panggil repository.GetAllBanners()
    // Kembalikan hasilnya
}
```

---

### Tahap 4 — Buat Controller Banner

> **Tujuan:** Menerima HTTP request, memanggil service, dan mengembalikan JSON response ke client.

**File yang dibuat:** `backend/src/banner/controller/banner-controller.go`

Buat fungsi controller:

```go
func GetBanners(c *fiber.Ctx) error {
    // 1. Panggil service.GetAllBanners()
    // 2. Jika error → kembalikan status 500 dengan pesan error
    // 3. Jika sukses → kembalikan status 200 dengan data banner
}
```

**Pola response sukses yang harus dikembalikan:**

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Banner Promo",
      "image": "banner-promo.jpg",
      "is_active": true,
      "deleted_at": null,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

**Pola response error (jika query database gagal):**

```json
{
  "success": false,
  "message": "Gagal mengambil data banner"
}
```

Gunakan `c.Status(fiber.StatusInternalServerError).JSON(...)` untuk error dan `c.Status(fiber.StatusOK).JSON(...)` untuk sukses.

---

### Tahap 5 — Buat Route Banner

> **Tujuan:** Mendaftarkan endpoint HTTP dan menghubungkannya ke controller.

**File yang dibuat:** `backend/src/banner/routes/banner-route.go`

Buat fungsi `SetupBannerRoutes` yang menerima parameter `api fiber.Router`:

```go
func SetupBannerRoutes(api fiber.Router) {
    banner := api.Group("/banners")
    banner.Get("/", controller.GetBanners)
}
```

---

### Tahap 6 — Daftarkan Route ke Router Utama

> **Tujuan:** Menghubungkan route banner ke aplikasi utama agar endpoint `/api/banners` bisa diakses.

**File yang dimodifikasi:** `backend/routes/routes.go`

Tambahkan import untuk package banner route:
```go
bannerRoute "marketplace-backend/src/banner/routes"
```

Di dalam fungsi `SetupRoutes`, setelah baris `api := app.Group("/api")`, tambahkan:
```go
bannerRoute.SetupBannerRoutes(api)
```

> **Penting:** Parameter yang diteruskan ke `SetupBannerRoutes` adalah `api` (bukan `app`), sehingga semua route di dalam banner otomatis memiliki prefix `/api`.

**Hasil akhir `routes.go` seharusnya terlihat seperti ini:**

```go
func SetupRoutes(app *fiber.App) {
    api := app.Group("/api")

    // ... route lama ...

    bannerRoute.SetupBannerRoutes(api)
}
```

---

### Tahap 7 — Jalankan dan Test

> **Tujuan:** Memastikan API berjalan dan mengembalikan response yang benar.

1. Jalankan backend dari folder `backend/`:
   ```
   go run main.go
   ```

2. Test endpoint menggunakan browser, Postman, atau curl:
   ```
   GET http://localhost:3000/api/banners
   ```

3. Pastikan response berupa JSON dengan `"success": true` dan array `"data"` berisi semua row dari tabel `banners`.

4. Jika ada error `cannot find package`, jalankan:
   ```
   go mod tidy
   ```

---

## Checklist Implementasi

- [x] **Tahap 1:** Buat `banner-model.go` — struct `Banner` sesuai skema database
- [x] **Tahap 2:** Buat `banner-repository.go` — fungsi `GetAllBanners()` query ke DB
- [x] **Tahap 3:** Buat `banner-service.go` — fungsi `GetAllBanners()` panggil repository
- [x] **Tahap 4:** Buat `banner-controller.go` — fungsi `GetBanners()` handle HTTP request
- [x] **Tahap 5:** Buat `banner-route.go` — daftarkan `GET /banners` ke controller
- [x] **Tahap 6:** Update `backend/routes/routes.go` — import dan panggil `SetupBannerRoutes`
- [x] **Tahap 7:** Jalankan server dan test endpoint `GET /api/banners`

---

## Hal yang Perlu Diperhatikan

> [!WARNING]
> Jangan ubah file `main.go` — cukup modifikasi `backend/routes/routes.go` untuk mendaftarkan route baru.

> [!IMPORTANT]
> Karena ada potensi konflik nama package `routes`, gunakan **alias import** saat mendaftarkan di `routes.go`:
> ```go
> bannerRoute "marketplace-backend/src/banner/routes"
> ```

> [!IMPORTANT]
> `ID` bertipe `string` (UUID), bukan `uint`. Pastikan tidak menggunakan `autoIncrement` pada tag GORM untuk field ini.

> [!NOTE]
> GORM secara otomatis mengisi `CreatedAt` dan `UpdatedAt` jika nama field sesuai konvensi GORM. Gunakan tipe pointer `*time.Time` agar nilainya bisa `null` (sesuai database).
