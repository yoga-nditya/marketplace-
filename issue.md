# Perencanaan Implementasi API Register dan Login

**Tujuan:**
Dokumen ini berisi panduan teknis langkah demi langkah untuk mengimplementasikan fitur autentikasi (Register dan Login) pada backend.
---

## 1. Struktur Folder dan File
Meskipun fitur ini terkait autentikasi, ikuti pola struktur dan pemisahan *logic* yang sudah ada sebelumnya (seperti pada modul `categories`). 
Buat direktori dan file untuk modul autentikasi (bisa ditempatkan di `src/auth` atau sesuai dengan standar penamaan seperti arahan awal `src/products`):

- **Folder `routes`**: Berisi file routing untuk menangani definisi *endpoint* API.
  - *Contoh format penamaan*: `auth-route.ts` / `auth-route.go` (sesuaikan dengan bahasa backend yang digunakan).
- **Folder `service`**: Berisi file untuk menangani *business logic* aplikasi.
  - *Contoh format penamaan*: `auth-service.ts` / `auth-service.go`.

*Catatan: Penerapannya harus mirip dan konsisten dengan gaya penulisan kode pada fitur `categories` yang sudah berjalan saat ini.*

---

## 2. Implementasi Endpoint API

### A. Endpoint POST `/api/register`
**Fungsi**: Mendaftarkan pengguna baru ke dalam sistem.

**Tahapan Pengerjaan Service & Route:**
1. Tambahkan *route* baru `POST /api/register` di dalam file `routes`.
2. Arahkan *route* tersebut ke fungsi di dalam `service` yang menangani logika register.
3. Terima *request body* JSON yang berisi data pendaftaran user (`userName`, `email`, `password`, `confirmPassword`).
4. Lakukan validasi data input:
   - Pastikan format email valid.
   - Pastikan nilai `password` dan `confirmPassword` sama (cocok).
   - Lakukan pengecekan ke database untuk memastikan email belum terdaftar.
5. Jika validasi gagal (email sudah ada, password tidak cocok, format salah, dsb.), kembalikan response *error*.
6. Jika data valid, lakukan *hashing* pada password sebelum disimpan (jangan pernah menyimpan password dalam bentuk *plain text*).
7. Simpan data user ke dalam database. Pastikan respons mengeluarkan seluruh *field* dari database untuk user tersebut.
8. Kembalikan response sukses dengan **HTTP Status 201**.

**Format Request (Input):**
```json
{
    "userName": "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
}
```

**Format Response Berhasil (HTTP Status 201):**
```json
{
    "success": true,
    "message": "Register berhasil",
    "data": {
        "id": "string",
        "name": "string",
        "email": "string",
        "role": "string"
    }
}
```
*(Catatan: Field di dalam "data" harus menyesuaikan dengan skema database yang sebenarnya, keluarkan semua field yang relevan sesuai instruksi).*

**Format Response Gagal (Error):**
```json
{
    "success": false,
    "message": "error(bisa email sudah ada atau password tidak cocok atau error bad request atau internal server error)"
}
```

---

### B. Endpoint POST `/api/login`
**Fungsi**: Autentikasi pengguna untuk masuk ke dalam sistem.

**Tahapan Pengerjaan Service & Route:**
1. Tambahkan *route* baru `POST /api/login` di dalam file `routes`.
2. Arahkan *route* tersebut ke fungsi di dalam `service` yang menangani logika login.
3. Terima *request body* JSON yang berisi kredensial login (`email` dan `password`).
4. Lakukan *query* ke database untuk mencari data user berdasarkan email yang diberikan.
5. Jika user tidak ditemukan, kembalikan response *error*.
6. Jika user ditemukan, lakukan verifikasi password dengan mencocokkan *password* dari *request* dengan *hash password* yang ada di database.
7. Jika password salah/tidak cocok, kembalikan response *error*.
8. Jika verifikasi password berhasil, *generate* token autentikasi (seperti JWT).
9. Kembalikan response sukses yang berisi data token autentikasi.

**Format Request (Input):**
```json
{
    "email": "string",
    "password": "string"
}
```

**Format Response Berhasil (Success):**
```json
{
    "success": true,
    "message": "Login berhasil",
    "data": {
        "access_token": "",
        "token_type": "",
        "expires_in": 0,
        ".issued": "",
        ".expires": ""
    }
}
```

**Format Response Gagal (Error):**
```json
{
    "success": false,
    "message": "error(bisa email salah , password salah , user tidak ditemukan atau error bad request atau internal server error)"
}
```

---

## 3. Catatan Penting Tambahan
- **Field Data Menyesuaikan Database:** Pastikan data yang dikembalikan pada blok `data` pada response Register benar-benar mengeluarkan **semua field** yang ada sesuai dengan skema tabel user di database (sesuai referensi gambar).
- **Error Handling:** Seluruh penanganan *error* (seperti *bad request*, email tidak ditemukan, maupun *internal server error*) harus ditangkap dan menggunakan format *response error* standar seperti di atas dengan `success: false`.
