# PWA Installation Page

Progressive Web App dengan halaman instalasi bergaya Google Play Store untuk mobile Android.

## Fitur

- ✅ Desain mirip Google Play Store
- ✅ Progressive Web App (PWA) functionality
- ✅ Logika instalasi before/after install
- ✅ Komponen rating dan ulasan
- ✅ Screenshot carousel
- ✅ Responsive design untuk mobile
- ✅ Service Worker untuk offline functionality
- ✅ Web App Manifest

## Teknologi

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **PWA** - Progressive Web App features

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka [http://localhost:3000](http://localhost:3000) di browser

## PWA Features

- **Service Worker**: Caching dan offline functionality
- **Web App Manifest**: Konfigurasi instalasi aplikasi
- **Install Prompt**: Tombol install dengan logika before/after install
- **Responsive**: Optimized untuk mobile Android

## Struktur Project

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AppScreenshots.tsx
│   ├── InstallButton.tsx
│   └── RatingStars.tsx
public/
├── icons/
├── manifest.json
└── sw.js
```

## Deployment

Build aplikasi untuk production:

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Edge (Android & Desktop)
- Firefox (Android & Desktop)
- Safari (iOS - limited PWA support)

## License

MIT License