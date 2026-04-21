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
