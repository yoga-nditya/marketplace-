# Issue: Implementasi API GET /api/products

## Deskripsi

Tambahkan endpoint baru untuk mengambil data list produk dari database.

- **Endpoint:** `GET /api/products`
- **Method:** GET

---

## Expected Response

### Success (200 OK)

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
      "stock_amount": 10
    }
  ]
}
```

### Error responses

```json
{
  "error": "unautorized"
}
```

```json
{
  "error": "bad request"
}
```

---

## Referensi

Penerapannya mirip seperti fitur **categories** yang sudah dibuat sebelumnya. Tetap gunakan bahasa pemrograman **Golang**, tapi kali ini struktur foldernya sedikit diperbarui agar lebih rapi per-fitur (module-based):

Instruksi struktur folder di dalam `src/products/`:
- `routes/` : berisi routing
- `service/` : berisi logic aplikasi
- (Gunakan juga sub-folder `model/`, `repository/`, dan `controller/` di bawah `src/products/` agar sesuai pola arsitektur layer).

Format penamaan file:
- File dalam folder menggunakan format `products-<layer>.go`.
*(Catatan revisi: Instruksi asli menyebutkan ekstensi `.ts`, namun karena aplikasi backend menggunakan Fiber/Golang, kita menggunakan ekstensi `.go`)*

---

## Tahapan Implementasi

> Ikuti penjelasan tahapan di bawah ini untuk membuat endpoint API Products.

### Tahap 1 — Pembuatan Model (`src/products/model/products-model.go`)
- Buat struct `Product` yang mencakup seluruh field yang diminta: `id` (string), `categories_id` (string), `name` (string), `image` (string), `slug` (string), `price` (int), dan `stock_amount` (int).
- Berikan tag GORM dan tag JSON yang sesuai untuk memetakan struct tersebut ke kolom database yang ada. 
- Tambahkan metod `TableName()` sehingga GORM mengetahui tabel mana yang dituju (sepertinya tabel `products`).

### Tahap 2 — Pembuatan Repository (`src/products/repository/products-repository.go`)
- Di layer ini, buat satu fungsi khusus yang memiliki tugas melakukan *query* ke database dengan menggunakan koneksi database GORM `config.DB`.
- Lakukan operasi *find all* terhadap tabel products.
- Return (kembalikan) hasil query dalam bentuk slice/array dari *struct* `Product`. Pastikan mengembalikan data beserta status error-nya.

### Tahap 3 — Pembuatan Service (`src/products/service/products-service.go`)
- Layer ini menjadi perantara fungsionalitas alias *logic* aplikasi.
- Buat sebuah fungsi yang bertugas memanggil fungsi repository yang sudah dibuat di Tahap 2. 
- Kembalikan data dan error kembali ke atas untuk diterima oleh controller.

### Tahap 4 — Pembuatan Controller (`src/products/controller/products-controller.go`)
- Di Controller, definisikan fungsi handler yang menerima request dari endpoint (menggunakan context `fiber.Ctx`).
- Controller bertugas mengambil data dari Service.
- Lakukan pengecekan error:
  - Jika terjadi error unauthorized atau bad request, kembalikan JSON struct dengan key `"error"` dengan HTTP status yang tepat (400 atau 401).
- Jika berhasil (data ditemukan atau pun nilainya array kosong), ubah hasil tersebut menjadi format yang diminta, lalu return menggunakan status `200 OK` di mana *array of products* dibungkus ke dalam JSON object ber-key `"data"`.

### Tahap 5 — Pembuatan Route (`src/products/routes/products-route.go`)
- Buat fungsi yang menerima objek `fiber.Router`.
- Gunakan fungsi router ini untuk mendaftarkan path `/products` dengan method HTTP `GET`.
- Arahkan endpoint ini langsung ke fungsi controller yang baru saja selesai ditulis.

### Tahap 6 — Pendaftaran ke File Routing Utama (`backend/routes/routes.go`)
- Buka file utama di `backend/routes/routes.go`.
- Modifikasi file ini untuk melakukan import modul `routes` dari *products* yang telah dibuat.
- Daftarkan rute produk tersebut ke dalam block route group `/api` yang sudah ada, sehingga ketika aplikasi berjalan, rutenya akan bisa diakses melalui `/api/products`.

---

## Verifikasi
Setelah diimplementasikan seluruhnya, pastikan menguji endpoint:
1. Pastikan project ter-build dan bisa berjalan tanpa peringatan (`go build ./...` dan `go run main.go`).
2. Tembak endpoint `GET /api/products` dengan tools API testing.
3. Cek kembali format response yang ada apakah semuanya sudah tertampil dan memiliki *field* id, categories_id, name, image, slug, price, dan stock_amount.

