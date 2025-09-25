'use client';

import InstallButton from '@/components/InstallButton';
import RatingStars from '@/components/RatingStars';
import AppScreenshots from '@/components/AppScreenshots';

const mockScreenshots = [
  { id: 1, src: '/screenshots/mobile-1.png', alt: 'Main screen' },
  { id: 2, src: '/screenshots/mobile-2.png', alt: 'Features screen' },
  { id: 3, src: '/screenshots/mobile-3.png', alt: 'Settings screen' },
];

const mockReviews = [
  {
    id: 1,
    name: 'Ahmad Rizki',
    rating: 5,
    comment: 'Aplikasi yang sangat berguna dan mudah digunakan!',
    date: '2 hari yang lalu',
    avatar: 'AR'
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    rating: 4,
    comment: 'Fitur-fiturnya lengkap, tapi masih ada beberapa bug kecil.',
    date: '1 minggu yang lalu',
    avatar: 'SN'
  },
  {
    id: 3,
    name: 'Budi Santoso',
    rating: 5,
    comment: 'Perfect! Exactly what I needed.',
    date: '2 minggu yang lalu',
    avatar: 'BS'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button className="p-2 -ml-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-medium text-gray-900 flex-1">Detail Aplikasi</h1>
          <button className="p-2 -mr-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* App Info Section */}
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            {/* App Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>

            {/* App Details */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-medium text-gray-900 mb-1">My Awesome PWA</h2>
              <p className="text-sm text-gray-600 mb-2">Developer Studio</p>
              <div className="flex items-center gap-2 mb-2">
                <RatingStars rating={4.5} size="sm" />
                <span className="text-xs text-gray-500">1.2rb ulasan</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>10rb+ unduhan</span>
                <span>•</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">3+</span>
              </div>
            </div>
          </div>

          {/* Install Button */}
          <InstallButton />

          {/* Quick Info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <RatingStars rating={4.5} size="sm" showNumber={false} />
              </div>
              <p className="text-xs text-gray-500">4.5</p>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 mb-1">10rb+</div>
              <p className="text-xs text-gray-500">Unduhan</p>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 mb-1">3+</div>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 mb-1">2.1 MB</div>
              <p className="text-xs text-gray-500">Ukuran</p>
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        <div className="px-4 py-6 border-t border-gray-100">
          <AppScreenshots screenshots={mockScreenshots} />
        </div>

        {/* About Section */}
        <div className="px-4 py-6 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Tentang aplikasi ini</h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            My Awesome PWA adalah aplikasi Progressive Web App yang memberikan pengalaman native-like 
            di browser Anda. Dengan fitur-fitur canggih dan antarmuka yang intuitif, aplikasi ini 
            dirancang untuk meningkatkan produktivitas dan memberikan pengalaman pengguna yang luar biasa.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Fitur utama meliputi mode offline, notifikasi push, instalasi mudah, dan performa yang 
            optimal di semua perangkat.
          </p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Bekerja offline</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Notifikasi push</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Instalasi cepat</span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-4 py-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Rating dan ulasan</h3>
            <button className="text-sm text-google-blue font-medium">
              Lihat semua
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-1">4.5</div>
              <RatingStars rating={4.5} size="sm" showNumber={false} />
              <p className="text-xs text-gray-500 mt-1">1.2rb ulasan</p>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-600 w-2">{star}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-google-blue rounded-full"
                      style={{ 
                        width: star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '5%' : star === 2 ? '3%' : '2%' 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-google-blue text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{review.name}</span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <RatingStars rating={review.rating} size="sm" showNumber={false} />
                    <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Info Footer */}
        <div className="px-4 py-6 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Diperbarui</p>
              <p className="text-gray-900">15 Des 2024</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Ukuran</p>
              <p className="text-gray-900">2.1 MB</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Versi</p>
              <p className="text-gray-900">1.0.0</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Kategori</p>
              <p className="text-gray-900">Produktivitas</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}