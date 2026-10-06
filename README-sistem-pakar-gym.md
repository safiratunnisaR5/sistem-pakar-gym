# 🏋️ Sistem Pakar Gym

Sistem pakar berbasis aturan (*rule-based*) untuk memberikan rekomendasi program latihan gym yang sesuai dengan kondisi dan tujuan pengguna.

> ✏️ Bagian bertanda **[ISI]** perlu kamu sesuaikan dengan project aslimu, lalu hapus tanda kurung dan catatan ini.

---

## 📌 Latar Belakang

Banyak pemula di gym bingung memilih program latihan yang tepat, sehingga hasilnya kurang maksimal atau bahkan berisiko cedera. Sistem ini meniru cara berpikir seorang pelatih (pakar): pengguna menjawab beberapa pertanyaan, lalu sistem memberikan rekomendasi berdasarkan aturan yang sudah ditentukan.

## ✨ Fitur Utama

- Input data pengguna: **[ISI: misalnya usia, berat badan, tinggi badan, tujuan, tingkat pengalaman]**
- Proses inferensi dengan metode **[ISI: Forward Chaining / Certainty Factor / lainnya]**
- Hasil rekomendasi program latihan: **[ISI: misalnya jenis latihan, frekuensi, tingkat intensitas]**
- Basis pengetahuan (aturan) yang bisa dikelola: **[ISI: ada panel admin atau tidak]**
- **[ISI: fitur lain, misalnya riwayat konsultasi, cetak hasil]**

## 🧠 Cara Kerja Sistem

1. Pengguna mengisi data dan menjawab pertanyaan.
2. Sistem mencocokkan jawaban dengan basis aturan (*IF–THEN*).
3. Mesin inferensi menarik kesimpulan.
4. Sistem menampilkan rekomendasi program latihan.

Contoh aturan:

```
IF tujuan = "menurunkan berat badan" AND pengalaman = "pemula"
THEN program = "Full body + kardio ringan, 3x seminggu"
```
**[ISI: ganti dengan contoh aturan dari project kamu]**

## 🛠️ Teknologi yang Digunakan

| Bagian | Teknologi |
|---|---|
| Bahasa | **[ISI: PHP / Python / dll.]** |
| Database | **[ISI: MySQL / dll.]** |
| Frontend | **[ISI: HTML, CSS, Bootstrap, dll.]** |
| Metode | **[ISI: Forward Chaining / Certainty Factor]** |

## 📸 Tampilan Aplikasi

> Tambahkan screenshot di folder `screenshots/`, lalu tampilkan di sini.

| Halaman Utama | Form Konsultasi | Hasil Rekomendasi |
|---|---|---|
| ![Home](screenshots/home.png) | ![Konsultasi](screenshots/konsultasi.png) | ![Hasil](screenshots/hasil.png) |

## 🚀 Cara Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/safiratunnisaR5/sistem-pakar-gym.git
cd sistem-pakar-gym
```

**[ISI: langkah sesuai teknologi kamu. Contoh untuk PHP + MySQL:]**

1. Pindahkan folder ke `htdocs` (XAMPP) atau `www` (Laragon).
2. Buat database baru, misalnya `sistem_pakar_gym`.
3. Import file SQL: `database/sistem_pakar_gym.sql`.
4. Sesuaikan konfigurasi koneksi database di **[ISI: nama file config]**.
5. Jalankan Apache dan MySQL, lalu buka `http://localhost/sistem-pakar-gym`.

## 🔐 Akun Demo *(jika ada)*

| Role | Username | Password |
|---|---|---|
| Admin | **[ISI]** | **[ISI]** |

## 📂 Struktur Folder

```
sistem-pakar-gym/
├── [ISI: sesuaikan dengan isi repo]
└── README.md
```

## 🔮 Rencana Pengembangan

- [ ] **[ISI: misalnya tambah rekomendasi menu makanan]**
- [ ] **[ISI: misalnya versi mobile / responsif]**

## 👩‍💻 Pembuat

**Safiratunnisa**
- GitHub: [@safiratunnisaR5](https://github.com/safiratunnisaR5)
- Email: Safiratunnisa13@gmail.com
