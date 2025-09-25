# 🚀 Deployment Guide - Vercel

Panduan lengkap untuk deploy PWA Installation Page ke Vercel.

## 📋 Prerequisites

1. **Akun Vercel** - Daftar di [vercel.com](https://vercel.com)
2. **Git Repository** - Push code ke GitHub/GitLab/Bitbucket
3. **Node.js** terinstall di local (untuk testing)

## 🔧 Persiapan Deployment

### 1. Install Vercel CLI (Opsional)

```bash
npm i -g vercel
```

### 2. Test Build Local

Pastikan aplikasi bisa di-build tanpa error:

```bash
npm install
npm run build
npm start
```

## 🌐 Deploy ke Vercel

### Metode 1: Via Vercel Dashboard (Recommended)

1. **Login ke Vercel Dashboard**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub/GitLab/Bitbucket

2. **Import Project**
   - Klik "New Project"
   - Pilih repository PWA Anda
   - Klik "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai (2-3 menit)

### Metode 2: Via Vercel CLI

```bash
# Login ke Vercel
vercel login

# Deploy dari folder project
vercel

# Follow prompts:
# ? Set up and deploy "~/PWA"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? pwa-installation-page
# ? In which directory is your code located? ./
```

## ⚙️ Konfigurasi PWA di Vercel

File `vercel.json` sudah dikonfigurasi untuk:

- ✅ **Service Worker Headers** - Proper caching
- ✅ **Manifest Headers** - Content-Type yang benar
- ✅ **Security Headers** - XSS protection, CSRF protection
- ✅ **Cache Control** - Optimal caching strategy

## 🔍 Verifikasi Deployment

### 1. Cek PWA Functionality

Setelah deploy berhasil:

1. **Buka URL Vercel** (contoh: `https://your-app.vercel.app`)
2. **Test di Chrome Mobile**:
   - Buka Developer Tools
   - Toggle device simulation
   - Refresh halaman
   - Cek tab "Application" untuk:
     - ✅ Service Worker registered
     - ✅ Manifest valid
     - ✅ Install prompt available

### 2. PWA Audit

1. **Lighthouse Audit**:
   - Buka DevTools → Lighthouse
   - Select "Progressive Web App"
   - Run audit
   - Target score: 90+ PWA score

2. **Manual Testing**:
   - Install prompt muncul
   - App bisa diinstall
   - Offline functionality works
   - Icons tampil dengan benar

## 🌍 Custom Domain (Opsional)

### 1. Via Vercel Dashboard

1. Go to Project Settings
2. Domains tab
3. Add custom domain
4. Configure DNS records

### 2. DNS Configuration

```
Type: CNAME
Name: www (atau subdomain lain)
Value: cname.vercel-dns.com
```

## 🔧 Environment Variables

Jika butuh environment variables:

1. **Vercel Dashboard**:
   - Project Settings → Environment Variables
   - Add variables untuk Production/Preview/Development

2. **Via CLI**:
   ```bash
   vercel env add NEXT_PUBLIC_APP_URL
   ```

## 📊 Monitoring & Analytics

### 1. Vercel Analytics

```bash
npm install @vercel/analytics
```

Tambahkan di `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Web Vitals

Vercel otomatis track Core Web Vitals di dashboard.

## 🚨 Troubleshooting

### Build Errors

```bash
# Clear cache dan rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Service Worker Issues

- Pastikan `sw.js` di folder `public/`
- Cek headers di Network tab
- Clear browser cache

### Manifest Issues

- Validate manifest di Chrome DevTools
- Cek Content-Type headers
- Pastikan icons path benar

## 📱 Testing di Mobile

1. **Android Chrome**:
   - Buka URL di Chrome mobile
   - Menu → "Add to Home screen"
   - Test install functionality

2. **iOS Safari** (Limited PWA support):
   - Buka di Safari
   - Share → "Add to Home Screen"

## 🔄 Auto-Deploy

Vercel otomatis deploy ketika:
- ✅ Push ke main/master branch
- ✅ Merge pull request
- ✅ Manual trigger di dashboard

## 📈 Performance Tips

1. **Image Optimization**: Gunakan Next.js Image component
2. **Code Splitting**: Otomatis dengan Next.js
3. **Caching**: Sudah dikonfigurasi di `vercel.json`
4. **Compression**: Enabled di `next.config.js`

## 🎉 Selesai!

PWA Anda sekarang live di Vercel dengan:
- ✅ HTTPS otomatis
- ✅ Global CDN
- ✅ Auto-scaling
- ✅ PWA functionality
- ✅ Mobile-optimized

**URL Example**: `https://pwa-installation-page.vercel.app`

Selamat! PWA Installation Page Anda sudah siap digunakan! 🚀