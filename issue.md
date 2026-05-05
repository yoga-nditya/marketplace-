# Perencanaan Integrasi Frontend: Halaman Admin Banner dengan API

Dokumen ini berisi panduan tahap demi tahap untuk mengintegrasikan tampilan halaman Admin Banner (Frontend) dengan endpoint API `api/admin/banners` yang sudah tersedia di Backend.

## Tujuan
Membuat agar halaman daftar banner, form tambah banner, dan form edit banner di panel admin dapat mengambil (fetch), menambah, mengubah, dan menghapus data menggunakan API Admin Banners.

---

## Referensi API Backend yang Sudah Ada

### 1. GET `/api/admin/banners` (Mengambil Data)
**Response (200 Success):**
```json
{
   "success": true,
   "message": "data berhasil ditemukan",
   "Bannerdata": [
        {
            "id": "string",
            "title": "string",
            "image": "string",
            "is_active": "integer",
            "deleted_at": "timestamp | null",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
   ]
}
```

### 2. POST `/api/admin/banners` (Tambah Data)
**Request Body (FormData):**
- `title`: string
- `image`: file/string
- `is_active`: integer (0 atau 1)

**Response (201 Created):**
```json
{
    "success": true,
    "message": "data banners berhasil ditambahkan",
    "Bannerdata": [
        { ...struktur banner... }
   ]
}
```

### 3. PUT `/api/admin/banners/{id}` atau `?id={id}` (Update Data)
**Request Body (FormData):** (Sama seperti POST, hanya field yang diubah)

**Response (200 Success):**
```json
{
    "success": true,
    "message": "data banners berhasil di update",
    "Bannerdata": [
        { ...struktur banner... }
   ]
}
```

### 4. DELETE `/api/admin/banners/{id}` atau `?id={id}` (Hapus Data)
**Response (200 Success):**
```json
{
    "success": true,
    "message": "data banners berhasil dihapus"
}
```

### 5. Response Error (Global)
```json
{
    "success": false,
    "message": "error (pesan disesuaikan...)"
}
```

---

## Tahapan Implementasi Frontend (Action Plan)

Bagi programmer atau model AI yang akan mengimplementasikan ini, silakan ikuti alur kerja berikut secara berurutan. **Penting:** Tampilan UI harus selaras dan mirip dengan modul Kategori dan Produk.

### Tahap 1: Persiapan Service API (Frontend)
1. Buat file service baru (misal: `services/adminBannerService.ts`).
2. Definisikan antarmuka/tipe data (`interface` atau `type`) untuk objek Banner yang sesuai dengan struktur JSON dari backend.
3. Buat 5 fungsi untuk melakukan pemanggilan HTTP menggunakan Axios atau Fetch:
   - `fetchAdminBanners()`: Memanggil endpoint GET.
   - `fetchBannerById(id)`: Memanggil endpoint GET dengan spesifik ID (untuk keperluan form edit).
   - `createBanner(data)`: Memanggil endpoint POST. Pastikan *header* diset sebagai `multipart/form-data` karena ada upload gambar.
   - `updateBanner(id, data)`: Memanggil endpoint PUT. Header juga `multipart/form-data`.
   - `deleteBanner(id)`: Memanggil endpoint DELETE.

### Tahap 2: Halaman Daftar Banner (List View)
1. Buat halaman utama untuk admin banner (misal: `app/admin/banners/page.tsx`).
2. Buat tabel data dengan kolom: ID, Gambar, Judul, Status (Aktif/Non-Aktif), dan Aksi.
3. Gunakan `useEffect` untuk memanggil fungsi `fetchAdminBanners()` saat halaman pertama kali dimuat, dan simpan hasilnya di dalam state.
4. Implementasikan fungsionalitas pendukung (mirip halaman produk):
   - Kolom pencarian (Search).
   - Pengurutan data (Sorting).
   - Paginasi (Pagination).
5. Pada kolom aksi, sediakan tombol **Edit** (mengarahkan ke rute edit) dan tombol **Delete**.
6. Untuk tombol Delete, tampilkan konfirmasi menggunakan SweetAlert2 sebelum memanggil `deleteBanner(id)`. Jika sukses, *refresh* tabel data.

### Tahap 3: Halaman Tambah Banner (Create View)
1. Buat halaman form tambah (misal: `app/admin/banners/add/page.tsx`).
2. Buat elemen form yang terdiri dari:
   - Input teks untuk Judul.
   - Dropdown (Select) untuk Status Aktif (1) atau Non-Aktif (0).
   - Input file untuk Gambar (dilengkapi dengan *preview* gambar yang dipilih).
3. Tangani *submit* form dengan mengemas data ke dalam objek `FormData`.
4. Panggil fungsi `createBanner()`. Jika balikan JSON `success` bernilai true, tampilkan pop-up sukses dan arahkan (*redirect*) user kembali ke halaman daftar banner. Jika false, tampilkan pesan error.

### Tahap 4: Halaman Edit Banner (Update View)
1. Buat halaman form edit yang menerima ID dari parameter URL (misal: `app/admin/banners/edit/[id]/page.tsx`).
2. Gunakan `useEffect` untuk memanggil `fetchBannerById(id)` dan jadikan responsenya sebagai *default value* pada inputan form.
3. Sediakan struktur form yang persis sama dengan halaman Tambah Banner, namun informasikan bahwa input gambar bersifat opsional (jika tidak diunggah, tidak mengubah gambar lama).
4. Saat disubmit, kemas perubahan ke dalam `FormData` dan panggil `updateBanner(id)`. Berikan notifikasi sukses/gagal lalu arahkan kembali ke halaman daftar.

### Tahap 5: Integrasi Navigasi (Sidebar)
1. Buka komponen Sidebar admin (`AdminSidebar.tsx`).
2. Tambahkan menu baru bernama "Banner" dengan ikon yang merepresentasikan gambar, lalu arahkan tautannya ke `/admin/banners`.
