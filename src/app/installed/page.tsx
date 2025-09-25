'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { pwaLauncher, PWALaunchResult } from '@/utils/pwaLauncher';

export default function InstalledPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState<string>('');

  useEffect(() => {
    // Show confetti animation
    setShowConfetti(true);
    
    // Store installation status (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('pwa_installed', 'true');
      localStorage.setItem('pwa_install_date', new Date().toISOString());
    }
  }, []);

  const handleOpenApp = async () => {
    setIsLaunching(true);
    setLaunchStatus('Meluncurkan aplikasi...');

    try {
      // Use advanced PWA launcher
      const result: PWALaunchResult = await pwaLauncher.launchPWA();
      
      if (result.success) {
        setLaunchStatus(`✅ ${result.message}`);
        console.log(`PWA launched successfully via ${result.method}`);
        
        // If launched successfully and not already in PWA mode
        if (result.method !== 'already_in_pwa') {
          // Give user feedback and close/redirect after delay
          setTimeout(() => {
            if (window.opener) {
              window.close();
            } else {
              router.push('/');
            }
          }, 2000);
        } else {
          // Already in PWA, just redirect to home
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
      } else {
        setLaunchStatus(`⚠️ ${result.message}`);
        console.warn(`PWA launch failed: ${result.message}`);
        
        // Fallback after showing error
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      setLaunchStatus('❌ Gagal meluncurkan aplikasi');
      console.error('Error launching PWA:', error);
      
      // Fallback to home page
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative z-10">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center shadow-lg animate-pulse">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          🎉 Instalasi Berhasil!
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Aplikasi telah berhasil diinstal ke perangkat Anda. Sekarang Anda dapat mengaksesnya kapan saja dari layar utama.
        </p>

        {/* App Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">PWA Installation App</h3>
              <p className="text-sm text-gray-600">Versi 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Installation Details */}
        <div className="text-left space-y-3 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Aplikasi ditambahkan ke layar utama</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Mode offline tersedia</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Notifikasi push diaktifkan</span>
          </div>
        </div>

        {/* Launch Status */}
        {launchStatus && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 text-center">{launchStatus}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleOpenApp}
            disabled={isLaunching}
            className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg ${
              isLaunching
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isLaunching ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Meluncurkan...</span>
              </div>
            ) : (
              '🚀 Buka Aplikasi'
            )}
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-blue-800 font-medium mb-1">Tips:</p>
              <p className="text-xs text-blue-700">
                Cari ikon aplikasi di layar utama perangkat Anda untuk akses cepat!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}