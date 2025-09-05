
# QR Generator Wajihah Telkom University

Aplikasi web untuk membuat QR code dengan logo dan pengaturan tampilan yang mudah digunakan.

## Cara Menggunakan

1. **Install Dependency**
	- Pastikan Node.js & npm sudah terinstall.
	- Jalankan perintah berikut di folder project:
	  ```bash
	  npm install
	  ```

2. **Jalankan Aplikasi**
	- Untuk development:
	  ```bash
	  npm run dev
	  ```
	- Buka browser ke alamat yang tertera di terminal (biasanya http://localhost:5173)

3. **Fitur Utama**
	- Masukkan teks/URL yang ingin diubah menjadi QR code.
	- Pilih logo dari daftar atau upload logo sendiri.
	- Atur ukuran, warna, dan tampilan QR sesuai kebutuhan.
	- Cek preview QR, pastikan bisa di-scan.
	- Download QR code (PNG) atau pratinjau ukuran penuh.

4. **Tips**
	- Jika QR tidak bisa di-scan, coba kecilkan logo, perpendek teks, atau tingkatkan level koreksi kesalahan.
	- Gunakan fitur pratinjau untuk memastikan QR dapat dibaca sebelum digunakan.

## Dependency Utama

- [React](https://react.dev/) (v18+)
- [Vite](https://vitejs.dev/) (dev server & build)
- [framer-motion](https://www.framer.com/motion/) (animasi UI)
- [react-qrcode-logo](https://www.npmjs.com/package/react-qrcode-logo) (render QR code dengan logo)

## Struktur Project

- `src/App.jsx` — Komponen utama aplikasi
- `src/components/QRForm.jsx` — Form pengaturan QR
- `src/components/QRPreview.jsx` — Preview & render QR code
- `public/` — Aset statis & logo

---
© 2025 QR Generator For Wajihah Telkom University
