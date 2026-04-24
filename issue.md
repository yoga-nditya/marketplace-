# Issue: Implementasi Fitur Login dan Register

## Deskripsi
Tugas ini adalah menghubungkan halaman Login dan Register yang sudah ada di frontend dengan API backend (`api/login` dan `api/register`).

## Spesifikasi API

### 1. Endpoint Login (`POST /api/login`)

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response Success:**
```json
{
    "success": true,
    "message": "Login berhasil",
    "data": {
        "access_token": "string",
        "token_type": "string",
        "expires_in": 3600,
        ".issued": "string",
        ".expires": "string"
    }
}
```

**Response Error:**
```json
{
    "success": false,
    "message": "error(bisa email salah, password salah, user tidak ditemukan atau error bad request atau internal server error)"
}
```

---

### 2. Endpoint Register (`POST /api/register`)

**Request Body:**
```json
{
    "userName": "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
}
```

**Response Success (HTTP Status 201):**
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

**Response Error:**
```json
{
    "success": false,
    "message": "error(bisa email sudah ada atau password tidak cocok atau error bad request atau internal server error)"
}
```

---

## Tahapan Implementasi

Berikut adalah langkah-langkah detail yang harus dilakukan untuk menyelesaikan task ini. Tidak perlu menuliskan kode, cukup ikuti instruksi alur berikut:

1. **Setup State Management pada Form:**
   - **Login:** Buat state/variabel untuk menampung nilai input `email` dan `password`. Hubungkan state ini dengan field input di form login.
   - **Register:** Buat state/variabel untuk menampung nilai input `userName`, `email`, `password`, dan `confirmPassword`. Hubungkan state ini dengan field input di form register.

2. **Implementasi Validasi Form (Frontend):**
   - Sebelum data dikirim ke API, buat validasi sederhana untuk memastikan semua field yang wajib sudah terisi.
   - Khusus untuk form Register, pastikan nilai `password` dan `confirmPassword` sama persis. Tampilkan pesan error di UI jika tidak sama dan cegah form dikirim.

3. **Pembuatan Fungsi Pemanggilan API:**
   - Buat fungsi asinkronus untuk mengirimkan *HTTP POST request* ke endpoint `/api/login` dengan membawa *payload* berupa object request body login.
   - Buat fungsi asinkronus untuk mengirimkan *HTTP POST request* ke endpoint `/api/register` dengan membawa *payload* berupa object request body register.
   - Pastikan *request headers* diset untuk menerima dan mengirim format JSON (misalnya `Content-Type: application/json`).

4. **Penanganan Submit Form Login:**
   - Pada event `onSubmit` di form login, cegah perilaku default *refresh* halaman dan panggil fungsi API Login.
   - **Jika berhasil (`success: true`):**
     - Ekstrak `access_token` dari dalam response `data`.
     - Simpan token tersebut ke media penyimpanan browser (misalnya `localStorage`, `sessionStorage`, atau `cookies` sesuai konvensi project).
     - Tampilkan notifikasi (misal menggunakan toast atau alert) dengan pesan keberhasilan kepada user.
     - *Redirect* (arahkan) user pindah ke halaman utama/dashboard secara otomatis.
   - **Jika gagal (`success: false` atau error jaringan):**
     - Tangkap pesan error (dari `response.message`).
     - Tampilkan pesan error tersebut di UI agar user tahu mengapa login gagal (misal: "email/password salah").

5. **Penanganan Submit Form Register:**
   - Pada event `onSubmit` di form register, cegah perilaku default *refresh* halaman dan panggil fungsi API Register.
   - **Jika berhasil (Status HTTP 201 dan `success: true`):**
     - Tampilkan notifikasi sukses kepada user bahwa registrasi telah berhasil dilakukan.
     - Kosongkan isi form dan *redirect* user ke halaman Login agar mereka bisa mencoba masuk dengan akun yang baru saja dibuat.
   - **Jika gagal (`success: false` atau error jaringan):**
     - Tangkap pesan error dari response (misalnya "email sudah terdaftar").
     - Tampilkan pesan error tersebut di bagian form yang sesuai agar user dapat memperbaikinya.

6. **Penanganan Indikator Loading (Opsional tapi Direkomendasikan):**
   - Tambahkan state indikator loading yang bernilai `true` sesaat sebelum API dipanggil, dan `false` saat API selesai memberikan response (baik sukses maupun error).
   - Gunakan indikator ini untuk menonaktifkan (*disable*) tombol submit dan menampilkan animasi loading, guna mencegah user menekan tombol berkali-kali saat proses sedang berlangsung.
