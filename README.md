<div align="center">

# 📖 Dopamine Buddies — Scrapbook Kenangan AMA Batch 5

**Album Kenangan Digital Interaktif Berbalut Estetika Vintage & Modern Web Experience**

[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-Framer_Motion-F01F7A?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](LICENSE)

<br />

<p align="center">
  <i>"30 Hari Bertumbuh, Belajar, dan Berbagi Cerita Bersama — Abadi dalam Lembaran Kenangan."</i>
</p>

[✨ Jelajahi Fitur](#-fitur-utama) •
[🚀 Memulai Cepat](#-panduan-instalasi--menjalankan) •
[🛠️ Tech Stack](#%EF%B8%8F-tech-stack) •
[📂 Struktur Folder](#-struktur-proyek) •
[👥 Tim Dopamine](#-tim-dopamine-ama-batch-5)

---

</div>

## 🌟 Sekilas Tentang Proyek

**Dopamine Buddies** adalah aplikasi web scrapbook kenangan digital interaktif yang didedikasikan untuk seluruh anggota **Dopamine Team** pada program **AwareMind Ambassador (AMA) Batch 5 (2024)**. 

Menggabungkan estetika *vintage scrapbook* (tekstur kertas daur ulang, selotip *washi tape*, perangko klasik, dan surat personal) dengan teknologi frontend modern (*fluid animations*, efek *page-flip* 3D, serta instrumen musik latar lo-fi/vinyl), platform ini merangkum perjalanan 23 anggota selama 30 hari penuh dedikasi dan inspirasi.

---

## ✨ Fitur Utama

- 📖 **Interactive 3D Book Page Flip**
  - Efek membalik halaman buku layaknya album foto fisik sungguhan.
  - Lengkap dengan efek suara kertas (*page-turn sound effect*) dan transisi halus berbasis Motion.
  
- 🪪 **Lanyard ID Badge & Profile Cards**
  - Kartu identitas virtual dengan gantungan lanyard realistis untuk setiap anggota.
  - Memuat biodata singkat, peran, dan kesan pertama.

- ✉️ **Surat Personal & Vintage Envelope**
  - Amplop interaktif yang dapat dibuka (*unsealed*) untuk membaca surat dan pesan hangat dari setiap *buddy*.
  - Dilengkapi ornamen perangko klasik dan pita washi tape beraneka ragam corak.

- 🖼️ **Polaroid Memory Wall**
  - Galeri dinding polaroid yang memajang momen berharga dan dokumentasi kegiatan.
  - Dilengkapi fitur filter pencarian, zoom foto, dan cerita di balik setiap gambar.

- 🎵 **Floating Vinyl & Lo-Fi Audio Player**
  - Widget pemutar audio mengambang berdesain piringan hitam (*vinyl*).
  - Menghadirkan alunan musik instrumental lembut untuk menemani eksplorasi kenangan.

- ✍️ **Guestbook Wall & Confetti Celebration**
  - Papan buku tamu interaktif untuk meninggalkan pesan, doa, dan kesan pesan.
  - Efek ledakan konfeti (*canvas-confetti*) yang memeriahkan momen kelulusan dan perpisahan tim.

- 📱 **Ultra Responsive & Modern Dark Palette**
  - Tampilan elegan dengan palet warna *midnight dark* (`#0c0e23`), sentuhan aksen ungu-emas, dan tipografi modern yang nyaman di semua perangkat (ponsel, tablet, maupun desktop).

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Core Framework** | [React 19](https://react.dev/) | Library UI modern dengan performa render optimal |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe code untuk skalabilitas & keandalan |
| **Bundler & Tooling** | [Vite 8](https://vitejs.dev/) | Build tool super cepat dengan Instant HMR |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework versi terbaru |
| **Animations** | [Motion](https://motion.dev/) | Animasi gesture, spring transitions, dan transisi layout |
| **Icons** | [Lucide React](https://lucide.dev/) | Koleksi icon SVG modern dan konsisten |
| **Effects & Audio** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) & Web Audio | Partikel konfeti interaktif dan sound effects synthesizer |
| **AI Integration** | [@google/genai](https://www.npmjs.com/package/@google/genai) | Integrasi API Google Gemini untuk fitur cerdas |

---

## 📂 Struktur Proyek

```text
dopamine-buddies/
├── 📁 public/
│   ├── 📁 img/               # Asset kartu dan foto profil optimasi web
│   └── 📁 photos/            # Foto kenangan dan potret dokumentasi
├── 📁 src/
│   ├── 📁 components/        # Komponen modular UI
│   │   ├── AboutPage.tsx           # Halaman informasi tim & value Awaremind
│   │   ├── AudioPlayerWidget.tsx   # Pemutar musik piringan hitam terapung
│   │   ├── AwaremindLogos.tsx      # Komponen logo & identitas visual
│   │   ├── BookPageFlip.tsx        # Mesin buku interaktif flip-page
│   │   ├── CoverPage.tsx           # Halaman sampul pembuka scrapbook
│   │   ├── GuestbookWall.tsx       # Buku tamu interaktif & pesan perpisahan
│   │   ├── LetterEnvelope.tsx      # Animasi amplop & surat kenangan
│   │   ├── MemberAvatar.tsx        # Avatar artistik bergradasi
│   │   ├── MemberLanyardBadge.tsx  # Kartu ID badge lanyard interaktif
│   │   ├── MemoryWall.tsx          # Dinding galeri foto polaroid
│   │   └── Navbar.tsx              # Navigasi utama dengan audio control
│   ├── 📁 data/
│   │   └── memoriesData.ts   # Database lokal data 23 anggota & pesan
│   ├── 📁 utils/
│   │   └── audioPlayer.ts    # Audio controller & sound effect synthesizer
│   ├── App.tsx               # Root component & routing state
│   ├── index.css             # Tailwind v4 directives & font imports
│   └── main.tsx              # Entry point aplikasi
├── .env.example              # Template variabel lingkungan (API Key)
├── package.json              # Daftar dependensi & npm scripts
├── tsconfig.json             # Konfigurasi compiler TypeScript
└── vite.config.ts            # Konfigurasi bundler Vite & plugin
```

---

## 🚀 Panduan Instalasi & Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal:

### 1. Prasyarat
- Pastikan telah menginstal **Node.js** (versi 18.x atau yang lebih baru).
- Package manager: **npm**, **yarn**, **pnpm**, atau **bun**.

### 2. Clone Repositori
```bash
git clone https://github.com/G-than12/dopamine-buddies.git
cd dopamine-buddies
```

### 3. Instal Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variable *(Opsional)*
Jika Anda ingin mengaktifkan kapabilitas Google Gemini API:
```bash
cp .env.example .env.local
```
Buka file `.env.local` dan masukkan API Key Anda:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Jalankan Local Development Server
```bash
npm run dev
```
Buka peramban Anda di `http://localhost:3000` (atau port yang tertera pada terminal).

### 6. Build untuk Produksi
```bash
npm run build
```
File siap rilis akan dikompilasi ke dalam folder `dist/`.

---

## 👥 Tim Dopamine (AMA Batch 5)

Proyek ini dibuat dengan cinta untuk mengabadikan kebersamaan seluruh tim:

- 👑 **Mind Captain:** Fellika
- 💫 **Dopamine Buddies (23 Anggota):**
  - Fellika • Gathan Hilabi • Dwita Amanda • Amelia Fitrianti • Andromeda Assyura
  - Attar Fatihul Ihsan • Carissa Nur • Cecilia Dwi • Diddit • Dika Irvansyah
  - Radinka Ravee (Dinkaa) • Fajri Slamet Nugraha • Hanifa Iskandar • Jolia Anabella
  - Najwa Kamilatunnuha • Laila Ramadhani • Marni Agustin • Masyifah Asasiyah
  - Reskika Nur Oktaviani • Rina Astagina • Sepriana Gurning • Tiara Zendrato • Zihan Cantika

---

## 🤝 Kontribusi & Saran

Apresiasi dan saran selalu terbuka lebar! Jika Anda ingin menambahkan fitur atau mempercantik album ini:
1. Fork repositori ini.
2. Buat branch baru untuk fitur Anda (`git checkout -b feature/fitur-keren`).
3. Commit perubahan Anda (`git commit -m 'feat: tambah efek foto baru'`).
4. Push ke branch Anda (`git push origin feature/fitur-keren`).
5. Buat **Pull Request**.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi **Apache-2.0**. Lihat file `LICENSE` untuk informasi selengkapnya.

---

<div align="center">
  <b>Dopamine Team · AwareMind Indonesia Ambassador (AMA) Batch 5 · 2024</b><br>
  <i>"Once a Dopamine Buddy, Always a Dopamine Buddy!"</i>
</div>
