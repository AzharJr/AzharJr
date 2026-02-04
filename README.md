# Movie Link Manager

Aplikasi web modern untuk mengelola dan berbagi link film favorit Anda. Dibuat dengan HTML, CSS, dan JavaScript vanilla.

## 🎬 Fitur Utama

- **Tambah Film**: Tambahkan film baru dengan judul, link, kategori, dan deskripsi
- **Pencarian**: Cari film berdasarkan judul atau deskripsi
- **Filter Kategori**: Filter film berdasarkan kategori (Action, Drama, Comedy, dll.)
- **Pemutaran Video**: Putar video langsung di aplikasi (mendukung format M3U8 dan MP4)
- **Berbagi**: Salin link atau bagikan film ke platform lain
- **Export/Import**: Export dan import data film dalam format JSON
- **Responsif**: Tampilan yang optimal di desktop, tablet, dan mobile
- **Local Storage**: Data tersimpan di browser pengguna

## 🚀 Cara Menjalankan

1. **Clone atau download** semua file ke folder lokal Anda
2. **Buka file `index.html`** di browser web
3. **Mulai menggunakan** aplikasi!

Tidak perlu server atau instalasi tambahan - aplikasi berjalan langsung di browser.

## 📁 Struktur File

```
movie-link-manager/
├── index.html          # File HTML utama
├── styles.css          # Styling CSS
├── script.js           # JavaScript functionality
├── README.md           # Dokumentasi ini
├── README.m3u8         # File playlist contoh
└── TvKUU.m3u8          # File playlist contoh
```

## 🎯 Cara Penggunaan

### Menambah Film Baru
1. Isi form "Tambah Film Baru"
2. Masukkan judul film
3. Paste link film (mendukung M3U8, MP4, atau link eksternal)
4. Pilih kategori
5. Tambahkan deskripsi (opsional)
6. Klik "Simpan Film"

### Memutar Film
1. Klik tombol "Putar" pada kartu film
2. Video akan terbuka dalam modal player
3. Gunakan kontrol video standar untuk play/pause/seek

### Mencari dan Filter
- Gunakan kotak pencarian untuk mencari film berdasarkan judul atau deskripsi
- Klik tombol kategori untuk filter film berdasarkan genre

### Mengelola Film
- **Edit**: Klik tombol "Edit" untuk mengedit film
- **Hapus**: Klik tombol "Hapus" untuk menghapus film
- **Bagikan**: Klik tombol "Bagikan" di player untuk berbagi film

### Export/Import Data
- **Export**: Klik tombol "Export" untuk mengunduh data film dalam format JSON
- **Import**: Klik tombol "Import" untuk mengunggah file JSON dengan data film

## 🎨 Kategori Film

Aplikasi mendukung kategori film berikut:
- Action
- Drama
- Comedy
- Horror
- Romance
- Sci-Fi
- Documentary
- Lainnya

## 📱 Format Video yang Didukung

- **M3U8 (HLS)**: Format streaming yang umum digunakan
- **MP4**: Format video standar
- **Link Eksternal**: Link ke platform streaming lain

## 🔧 Teknologi yang Digunakan

- **HTML5**: Struktur aplikasi
- **CSS3**: Styling modern dengan Flexbox dan Grid
- **JavaScript ES6+**: Fungsionalitas aplikasi
- **Local Storage**: Penyimpanan data lokal
- **Font Awesome**: Ikon-ikon
- **Responsive Design**: Tampilan yang responsif

## 🌟 Fitur Lanjutan

### Keyboard Shortcuts
- **Escape**: Tutup modal player

### Auto-save
- Data film otomatis tersimpan di browser
- Tidak ada data yang hilang saat refresh halaman

### Responsive Design
- Tampilan optimal di semua ukuran layar
- Mobile-friendly interface

### Error Handling
- Validasi input form
- Pesan error yang informatif
- Fallback untuk browser lama

## 🛠️ Customization

### Menambah Kategori Baru
Edit file `script.js` dan tambahkan kategori baru di:
1. Array `categoryLabels` dalam method `createMovieCard`
2. Option baru di HTML select element

### Mengubah Tema Warna
Edit file `styles.css` dan ubah variabel CSS custom properties di bagian `:root`

### Menambah Fitur Baru
Aplikasi menggunakan class-based architecture yang mudah diperluas. Tambahkan method baru di class `MovieManager`

## 📋 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Kontribusi

Kontribusi selalu diterima! Beberapa ide untuk pengembangan:
- Menambah sistem rating film
- Integrasi dengan API film (TMDB, OMDB)
- Menambah playlist/folder untuk mengorganisir film
- Menambah fitur bookmark
- Menambah sistem komentar

## 📄 Lisensi

Aplikasi ini open source dan dapat digunakan untuk tujuan pribadi maupun komersial.

## 🆘 Troubleshooting

### Video tidak dapat diputar
- Pastikan link video valid dan dapat diakses
- Untuk M3U8, pastikan server mendukung CORS
- Coba buka link langsung di browser

### Data hilang
- Data tersimpan di Local Storage browser
- Pastikan tidak menggunakan mode incognito/private
- Coba export data secara berkala sebagai backup

### Aplikasi tidak berfungsi
- Pastikan JavaScript diaktifkan di browser
- Coba refresh halaman
- Periksa console browser untuk error

## 📞 Support

Jika mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ untuk pecinta film**