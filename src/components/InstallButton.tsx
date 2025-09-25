'use client';

import { useRouter } from 'next/navigation';
import { useInstall } from '@/contexts/InstallContext';

export default function InstallButton() {
  const router = useRouter();
  const { 
    isInstalled, 
    isInstalling, 
    canInstall, 
    deferredPrompt, 
    startInstallation,
    installDate 
  } = useInstall();

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If no deferred prompt, show installation flow anyway
      startInstallation();
      router.push('/installing');
      return;
    }

    try {
      // Start installation process
      startInstallation();
      
      // Navigate to installing page immediately
      router.push('/installing');
      
      // Trigger the actual PWA install prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        // The appinstalled event will handle the rest
      } else {
        console.log('User dismissed the install prompt');
        // Navigate back to main page if user dismisses
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Installation error:', error);
      // Navigate back to main page on error
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  };

  const formatInstallDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isInstalling) {
    return (
      <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-6 py-3 rounded-lg">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        <span className="font-medium">Menginstal...</span>
      </div>
    );
  }

  if (isInstalled) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-6 py-3 rounded-lg">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Terpasang</span>
        </div>
        {installDate && (
          <p className="text-xs text-gray-500 text-center">
            Diinstal pada {formatInstallDate(installDate)}
          </p>
        )}
        <button
          onClick={() => router.push('/installed')}
          className="w-full text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Lihat detail instalasi
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleInstallClick}
      disabled={!canInstall && !deferredPrompt}
      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 ${
        canInstall || deferredPrompt
          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:scale-100'
      }`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      <span>
        {canInstall || deferredPrompt ? 'Install' : 'Install tidak tersedia'}
      </span>
    </button>
  );
}