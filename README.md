# Notes App

## Deskripsi Singkat

Notes App adalah aplikasi web sederhana yang memungkinkan pengguna untuk membuat, melihat, mengarsipkan, dan menghapus catatan. Aplikasi ini dibangun menggunakan teknologi web standar (HTML, CSS, JavaScript) dengan pendekatan Custom Elements untuk komponen UI dan Webpack sebagai module bundler.

**Proyek ini merupakan submission untuk kelas "Belajar Fundamental Front-End Web Development" dari Dicoding.**

## Fitur

-   **Buat Catatan Baru**: Pengguna dapat menambahkan catatan baru dengan judul dan isi.
-   **Tampilkan Catatan**: Menampilkan daftar catatan yang aktif.
-   **Tampilkan Catatan Terarsip**: Menampilkan daftar catatan yang telah diarsipkan.
-   **Arsipkan/Batalkan Arsip Catatan**: Pengguna dapat memindahkan catatan antara daftar aktif dan arsip.
-   **Hapus Catatan**: Pengguna dapat menghapus catatan (dengan dialog konfirmasi).
-   **Validasi Form**: Form input memiliki validasi sederhana untuk judul dan isi catatan.
-   **Indikator Loading**: Menampilkan indikator saat memuat data catatan.
-   **Desain Responsif**: Tampilan aplikasi menyesuaikan dengan berbagai ukuran layar.

## Teknologi & Tools

-   **Frontend**:
    -   HTML5
    -   CSS3
    -   JavaScript (ES6+ Modules)
    -   Custom Elements (Web Components)
-   **Styling**:
    -   CSS Kustom
    -   Google Fonts (Poppins)
    -   Ionicons (untuk ikon)
-   **Animasi & Interaksi**:
    -   GSAP (GreenSock Animation Platform)
    -   SweetAlert2 (untuk dialog konfirmasi)
-   **Build Tool**:
    -   Webpack 5
    -   Babel (untuk kompatibilitas JavaScript)
-   **Linting**:
    -   ESLint (dengan konfigurasi Airbnb)
-   **API**:
    -   Menggunakan Notes API eksternal dari Dicoding (`https://notes-api.dicoding.dev/v2`)

## Prasyarat

-   Node.js (disarankan versi LTS)
-   npm (biasanya terinstal bersama Node.js)

## Instalasi & Setup

**Install dependencies**:
    Dari direktori `/notes-app`, jalankan:
    ```bash
    npm install
    ```

## Skrip yang Tersedia

Di dalam direktori `notes-app`, Anda dapat menjalankan beberapa skrip npm:

-   **`npm run start-dev`**
    Menjalankan aplikasi dalam mode development dengan webpack-dev-server. Aplikasi akan otomatis terbuka di browser dan akan me-reload jika ada perubahan pada kode sumber.

-   **`npm run build`**
    Mem-bundle aplikasi untuk production ke dalam direktori `dist`.

-   **`npm run lint`**
    Menjalankan ESLint untuk memeriksa potensi error dan isu konsistensi kode.

-   **`npm run lint:fix`**
    Menjalankan ESLint dan mencoba memperbaiki masalah yang dapat diperbaiki secara otomatis.

-   **`npm run start`**
    (Setelah menjalankan `npm run build`) Menjalankan server HTTP sederhana (`http-server`) untuk menyajikan file dari direktori `dist`. Ini berguna untuk menguji build production secara lokal.
