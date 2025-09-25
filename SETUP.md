# Setup Instructions - PWA Installation Page

## Prerequisites

Sebelum menjalankan aplikasi, pastikan Anda telah menginstall:

1. **Node.js** (versi 18 atau lebih baru)
   - Download dari: https://nodejs.org/
   - Pilih versi LTS (Long Term Support)

2. **npm** (biasanya sudah termasuk dengan Node.js)

## Cara Menjalankan Aplikasi

### 1. Install Dependencies

Buka terminal/command prompt di folder project dan jalankan:

```bash
npm install
```

### 2. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di: http://localhost:3000

### 3. Testing PWA Features

Untuk menguji fitur PWA:

1. **Buka di Chrome/Edge** (browser yang mendukung PWA)
2. **Buka Developer Tools** (F12)
3. **Aktifkan Device Simulation** untuk mobile view
4. **Refresh halaman** untuk memuat service worker
5. **Cek tab Application** di DevTools untuk melihat:
   - Service Worker status
   - Manifest details
   - Cache storage

### 4. Testing Install Prompt

1. Buka aplikasi di Chrome mobile atau desktop
2. Tunggu beberapa detik untuk install prompt muncul
3. Klik tombol "Install" untuk menguji instalasi
4. Aplikasi akan terinstall sebagai PWA

### 5. Build untuk Production

```bash
npm run build
npm start
```

## Troubleshooting

### Node.js belum terinstall
- Download dan install Node.js dari nodejs.org
- Restart terminal setelah instalasi
- Verifikasi dengan: `node --version`

### Install prompt tidak muncul
- Pastikan menggunakan HTTPS atau localhost
- Cek bahwa service worker terdaftar
- Pastikan manifest.json valid
- Refresh halaman beberapa kali

### Service Worker tidak bekerja
- Cek tab Application di DevTools
- Pastikan file sw.js dapat diakses
- Clear cache dan reload

## File Structure

```
PWA/
├── public/
│   ├── icons/           # App icons
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service worker
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── AppScreenshots.tsx
│       ├── InstallButton.tsx
│       └── RatingStars.tsx
├── package.json
├── tailwind.config.ts
└── next.config.js
```

## Features Implemented

✅ Google Play Store-like design
✅ PWA installation logic
✅ Before/after install states
✅ Service worker for offline support
✅ App manifest configuration
✅ Rating and review components
✅ Screenshot carousel
✅ Responsive mobile design
✅ TypeScript support
✅ Tailwind CSS styling

## Browser Compatibility

- ✅ Chrome (Android & Desktop)
- ✅ Edge (Android & Desktop)
- ✅ Firefox (Android & Desktop)
- ⚠️ Safari (iOS - limited PWA support)

## Next Steps

1. Customize app content and branding
2. Add real screenshots
3. Configure real app icons
4. Deploy to production server
5. Test on real mobile devices