🛠️ IT Support Center

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-111827)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

*IT Support Center** adalah aplikasi web untuk mengelola layanan bantuan dan penanganan masalah IT di lingkungan perusahaan.

Sistem ini membantu proses pelaporan masalah, penugasan teknisi, monitoring progres tiket, penyelesaian tiket, pengelolaan pengguna, hingga laporan operasional dalam satu dashboard.

---

🚀 Live Demo

🌐 *Demo*  
https://it-support-center.vercel.app/

💻 *Repository** 
https://github.com/khalilurrahmanmahdi12/IT_support_center-ku

---

✨ Fitur Utama

📊 Dashboard Monitoring
Menampilkan ringkasan operasional layanan IT seperti:

- Total tiket
- Tiket terbuka
- Tiket sedang diproses
- Tiket selesai
- Tiket prioritas kritis
- Grafik tren tiket
- Statistik kategori tiket
- Statistik prioritas
- Performa teknisi
- Tiket terbaru

---

🎫 Manajemen Tiket

Karyawan dapat membuat tiket bantuan IT dengan informasi:

- Judul masalah
- Kategori tiket
- Prioritas
- Departemen
- Deskripsi kendala

Administrator dapat melihat seluruh tiket yang masuk dan melakukan penugasan kepada teknisi.

Teknisi kemudian dapat memproses tiket hingga selesai.

🔄 Alur Tiket

```text
Karyawan Membuat Tiket
        ↓
      Terbuka
        ↓
Admin Menugaskan Teknisi
        ↓
 Sedang Diproses
        ↓
Teknisi Menyelesaikan Tiket
        ↓
      Selesai
        ↓
Karyawan Konfirmasi
        ↓
      Ditutup
````

---

👥 Role-Based Access Control

Sistem memiliki 3 jenis pengguna:

👨‍💼 Administrator

Administrator memiliki akses untuk:

* Dashboard monitoring
* Melihat seluruh tiket
* Melihat detail tiket
* Menugaskan teknisi
* Mengelola data karyawan
* Mengelola data teknisi
* Mengelola departemen
* Melihat laporan
* Export laporan Excel
* Mengelola profil
* Mengatur preferensi sistem

---

🧑‍🔧 Teknisi IT

Teknisi memiliki akses untuk:

* Dashboard teknisi
* Melihat tiket yang ditugaskan
* Melihat detail tiket
* Memproses tiket
* Menambahkan catatan penyelesaian
* Menyelesaikan tiket
* Melihat riwayat pekerjaan
* Mengelola profil
* Mengatur preferensi notifikasi

---

👨‍💻 Karyawan

Karyawan dapat:

* Melihat dashboard
* Membuat tiket IT
* Melihat tiket sendiri
* Melihat perkembangan tiket
* Melihat detail tiket
* Mengkonfirmasi tiket yang telah selesai
* Mengelola profil
* Mengatur preferensi

---

🔔 Sistem Notifikasi

Sistem menyediakan panel notifikasi untuk menampilkan aktivitas penting seperti:

* Tiket baru dibuat
* Tiket prioritas kritis
* Tiket baru ditugaskan
* Tiket perlu ditindaklanjuti
* Tiket selesai ditangani

Notifikasi dilengkapi dengan:

* Badge jumlah notifikasi
* Status sudah/belum dibaca
* Tombol tandai semua sebagai dibaca
* Navigasi langsung menuju detail tiket

---

👨‍💼 Manajemen Karyawan

Administrator dapat:

* Menambah karyawan
* Mengedit data karyawan
* Menghapus karyawan
* Mencari data karyawan
* Filter berdasarkan departemen
* Mengatur status aktif/nonaktif

Data yang dikelola meliputi:

* ID karyawan
* Nama
* Email
* Nomor WhatsApp
* Departemen
* Jabatan
* Status

---

🧑‍🔧 Manajemen Teknisi

Administrator dapat mengelola teknisi IT seperti:

* Menambah teknisi
* Mengedit teknisi
* Menghapus teknisi
* Mencari teknisi
* Filter berdasarkan status

Informasi teknisi meliputi:

* ID teknisi
* Nama
* Email
* Nomor WhatsApp
* Spesialisasi
* Status ketersediaan
* Jumlah tiket aktif

---

🏢 Manajemen Departemen

Administrator dapat mengelola data departemen perusahaan:

* Kode departemen
* Nama departemen
* Kepala departemen
* Jumlah karyawan

---

📑 Laporan Operasional

Halaman laporan menyediakan:

* Filter berdasarkan periode
* Filter status tiket
* Filter prioritas
* Ringkasan total tiket
* Ringkasan tiket terbuka
* Ringkasan tiket diproses
* Ringkasan tiket selesai
* Ringkasan tiket kritis
* Tabel laporan tiket

---

📊 Export Excel

Laporan dapat diekspor ke format:

```text
.xlsx
```

Fitur ini dapat digunakan untuk:

* Rekap data
* Dokumentasi
* Evaluasi layanan IT
* Arsip perusahaan
* Analisis operasional

---

🔐 Autentikasi & Keamanan Akses

Sistem menggunakan login berbasis:

```text
Nomor WhatsApp + OTP
```

Role pengguna ditentukan secara otomatis berdasarkan akun yang digunakan.

Fitur keamanan meliputi:

* Protected Route
* Role-Based Access Control
* Redirect berdasarkan role
* Logout
* Halaman 404 untuk URL tidak tersedia

---

📱 Responsive Design

Tampilan sudah dioptimalkan untuk:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Tablet
* 📲 Smartphone

Termasuk:

* Mobile sidebar
* Responsive table
* Responsive modal
* Dropdown profil
* Panel notifikasi
* Form mobile-friendly
* Scroll area khusus untuk modal pada Safari iPhone

---

💾 LocalStorage

Project ini menggunakan `localStorage` untuk menyimpan beberapa data demo seperti:

* Session login
* Data tiket
* Perubahan status tiket
* Penugasan teknisi
* Preferensi pengguna

Sehingga data tetap tersedia meskipun halaman direfresh.

---

🧪 Akun Demo

👨‍💼 Administrator

```text
Nomor WhatsApp: 081234567890
OTP: 123456
```

🧑‍🔧 Teknisi IT

```text
Nomor WhatsApp: 081234567891
OTP: 123456
```

👨‍💻 Karyawan

```text
Nomor WhatsApp: 081299999999
OTP: 123456
```

> OTP merupakan simulasi. Sistem menerima 6 digit angka.

---

🛠️ Teknologi yang Digunakan

* ⚛️ React
* 🔷 TypeScript
* ⚡ Vite
* 🎨 Tailwind CSS
* 🛣️ React Router
* 🐻 Zustand
* 📊 Recharts
* 🎯 Lucide React
* 📗 SheetJS / XLSX
* 💾 LocalStorage
* 🐙 GitHub
* ▲ Vercel

---

🚀 Menjalankan Project

Clone repository:

```bash
git clone https://github.com/khalilurrahmanmahdi12/IT_support_center-ku.git
```

Masuk ke folder project:

```bash
cd IT_support_center-ku
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

---

🌐 Deployment

Project dideploy menggunakan **Vercel**.

Konfigurasi React Router SPA menggunakan:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Dengan konfigurasi ini, route seperti:

```text
/admin/laporan
/admin/karyawan
/admin/teknisi
/teknisi/tiket
/karyawan/tiket
```

tetap dapat diakses ketika halaman direfresh atau URL dibuka secara langsung.

---

📂 Struktur Utama Project

```text
src/
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── navigation/
│   ├── tickets/
│   └── ui/
│
├── data/
│
├── layouts/
│
├── pages/
│   ├── admin/
│   ├── teknisi/
│   └── karyawan/
│
├── store/
├── types/
├── utils/
├── App.tsx
├── index.css
└── main.tsx
```

---

📌 Status Project

✅ Login WhatsApp & OTP Demo
✅ Role-Based Access Control
✅ Dashboard Monitoring
✅ Manajemen Tiket
✅ Penugasan Teknisi
✅ Workflow Penyelesaian Tiket
✅ Manajemen Karyawan
✅ Manajemen Teknisi
✅ Manajemen Departemen
✅ Laporan Operasional
✅ Export Excel
✅ Sistem Notifikasi
✅ Profil & Pengaturan
✅ Responsive Mobile
✅ LocalStorage
✅ Deployment Vercel

---

🔮 Pengembangan Selanjutnya

Project masih dapat dikembangkan dengan:

* 🗄️ Backend REST API
* 🐬 MySQL / PostgreSQL
* 🔑 JWT Authentication
* 📲 OTP WhatsApp asli
* 📎 Upload attachment tiket
* ⏱️ SLA Monitoring
* 📧 Email Notification
* 💬 WhatsApp Gateway
* 🔔 Real-Time Notification
* 📊 Advanced Analytics
* 👤 SSO / Active Directory
* 📝 Knowledge Base
* ⭐ Rating kepuasan pengguna

---

⚠️ Catatan

*IT Support Center merupakan project prototype/demo portfolio.**

Data yang digunakan adalah data simulasi dan belum terhubung ke database production atau layanan perusahaan asli.

Project ini dibuat untuk menunjukkan implementasi:

* Front-End Development
* State Management
* Role-Based Access Control
* Ticket Management Workflow
* Dashboard Analytics
* Responsive Web Design
* Export Data
* Deployment Web Application

---

👨‍💻 Developer

**Khalilurrahman Mahdi**

Software Engineer / Full Stack Developer

⭐ Repository

Jika project ini menarik, jangan lupa kasih ⭐ pada repository.

🔗 *IT Support Center*
[https://github.com/khalilurrahmanmahdi12/IT_support_center-ku](https://github.com/khalilurrahmanmahdi12/IT_support_center-ku)
