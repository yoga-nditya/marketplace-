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

---

## Struktur Folder yang Harus Dibuat

Implementasi ini menggunakan pola **Layered Architecture** global di dalam folder `backend/src/`. Tidak perlu membuat folder khusus per modul/fitur.

```
backend/
└── src/
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

**File:** `backend/src/model/banner-model.go`

Buat struct `Banner` sesuai dengan skema tabel di database:

| Field Go | Tipe | Tag JSON | Tag GORM | Keterangan |
|---|---|---|---|---|
| `ID` | `string` | `"id"` | `primaryKey` | UUID char(36) |
| `Title` | `string` | `"title"` | `column:title` | Judul banner |
| `Image` | `string` | `"image"` | `column:image` | Nama/path file gambar |
| `IsActive` | `bool` | `"is_active"` | `column:is_active` | Status aktif |
| `DeletedAt` | `*time.Time` | `"deleted_at"` | `column:deleted_at` | Soft delete |
| `CreatedAt` | `*time.Time` | `"created_at"` | `column:created_at` | Waktu dibuat |
| `UpdatedAt` | `*time.Time` | `"updated_at"` | `column:updated_at` | Waktu diupdate |

```go
package model

import "time"

type Banner struct {
    ID        string     `json:"id"         gorm:"primaryKey;column:id"`
    Title     string     `json:"title"      gorm:"column:title"`
    Image     string     `json:"image"      gorm:"column:image"`
    IsActive  bool       `json:"is_aktif"    gorm:"column:is_active"`
    DeletedAt *time.Time `json:"deleted_at"  gorm:"column:deleted_at"`
    CreatedAt *time.Time `json:"created_at"  gorm:"column:created_at"`
    UpdatedAt *time.Time `json:"updated_at"  gorm:"column:updated_at"`
}

func (Banner) TableName() string { return "banners" }
```

---

### Tahap 2 — Buat Repository Banner

> **Tujuan:** Menangani query langsung ke database.

**File:** `backend/src/repository/banner-repository.go`

```go
package repository

import (
    "marketplace-backend/config"
    "marketplace-backend/src/model"
)

func GetAllBanners() ([]model.Banner, error) {
    var banners []model.Banner
    err := config.DB.Find(&banners).Error
    return banners, err
}
```

---

### Tahap 3 — Buat Service Banner

> **Tujuan:** Layer logika bisnis.

**File:** `backend/src/service/banner-service.go`

```go
package service

import (
    "marketplace-backend/src/model"
    "marketplace-backend/src/repository"
)

func GetAllBanners() ([]model.Banner, error) {
    return repository.GetAllBanners()
}
```

---

### Tahap 4 — Buat Controller Banner

> **Tujuan:** Menangani HTTP request dan mengembalikan JSON response.

**File:** `backend/src/controller/banner-controller.go`

```go
package controller

import (
    "marketplace-backend/src/service"
    "github.com/gofiber/fiber/v2"
)

func GetBanners(c *fiber.Ctx) error {
    banners, err := service.GetAllBanners()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "success": false,
            "message": "Gagal mengambil data banner",
        })
    }
    return c.JSON(fiber.Map{
        "success": true,
        "data": banners,
    })
}
```

---

### Tahap 5 — Buat Route Banner

> **Tujuan:** Definisi endpoint khusus banner.

**File:** `backend/src/routes/banner-route.go`

```go
package routes

import (
    "marketplace-backend/src/controller"
    "github.com/gofiber/fiber/v2"
)

func SetupBannerRoutes(api fiber.Router) {
    api.Get("/banners", controller.GetBanners)
}
```

---

### Tahap 6 — Pendaftaran di Router Utama

**File:** `backend/routes/routes.go`

Tambahkan pemanggilan route banner:

```go
import (
    bannerRoutes "marketplace-backend/src/routes"
)

func SetupRoutes(app *fiber.App) {
    api := app.Group("/api")
    bannerRoutes.SetupBannerRoutes(api)
}
```

---

## Checklist Implementasi

- [ ] Struct `Banner` (Model)
- [ ] Fungsi `GetAllBanners` (Repository)
- [ ] Fungsi `GetAllBanners` (Service)
- [ ] Fungsi `GetBanners` (Controller)
- [ ] Fungsi `SetupBannerRoutes` (Routes)
- [ ] Registrasi di `routes/routes.go`
- [ ] Test endpoint `GET /api/banners`

---

## Hal Penting untuk Junior Developer

> [!IMPORTANT]
> - Gunakan tipe `string` untuk ID karena di DB menggunakan `char(36)`.
> - Gunakan pointer `*time.Time` untuk field yang bisa bernilai NULL di database.
> - Pastikan folder `src` sudah dibuat dengan benar sebelum membuat file di dalamnya.
> - Jalankan `go mod tidy` jika ada error paket tidak ditemukan.
