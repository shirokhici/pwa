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
    if (!canInstall || !deferredPrompt) return;

    try {
      // Show the install prompt first
      const result = await deferredPrompt.prompt();
      
      if (result.outcome === 'accepted') {
        // User accepted, start installation process
        startInstallation();
        // Navigate to installing page only on acceptance
        router.push('/installing');
      }
      // If dismissed, do nothing - stay on current page
    } catch (error) {
      console.error('Installation failed:', error);
      // On error, stay on current page
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
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
      <button
        onClick={handleInstallClick}
        disabled={!canInstall && !deferredPrompt}
        className={`w-full min-h-[60px] px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 ${
          canInstall || deferredPrompt
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        } sm:min-h-[56px] sm:text-base md:min-h-[64px] md:text-lg lg:min-h-[68px] lg:text-xl`}
      >
        <svg className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="font-bold">
          {isInstalled ? 'Sudah Terinstall' : 
           canInstall || deferredPrompt ? 'Install Aplikasi' : 'Tidak Dapat Diinstall'}
        </span>
      </button>
    </div>
  );
}