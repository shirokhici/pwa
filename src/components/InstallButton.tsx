'use client';

import { useState, useEffect } from 'react';
import { useInstall } from '@/contexts/InstallContext';
import { pwaLauncher, PWALaunchResult } from '@/utils/pwaLauncher';
import ProgressBar, { SteppedProgressBar } from './ProgressBar';

export default function InstallButton() {
  const { 
    isInstalled, 
    isInstalling, 
    canInstall, 
    deferredPrompt, 
    startInstallation,
    installDate 
  } = useInstall();

  // Installation progress states
  const [installProgress, setInstallProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // PWA launch states
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState<string>('');

  const installSteps = [
    'Mempersiapkan',
    'Mengunduh',
    'Menginstal',
    'Menyelesaikan'
  ];

  // Simulate installation progress
  useEffect(() => {
    if (isInstalling) {
      setInstallProgress(0);
      setCurrentStep(1);
      
      const progressInterval = setInterval(() => {
        setInstallProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= installSteps.length) {
            clearInterval(stepInterval);
            return installSteps.length;
          }
          return prev + 1;
        });
      }, 1500);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }
  }, [isInstalling]);

  // Show confetti when installation completes
  useEffect(() => {
    if (isInstalled && !showConfetti) {
      setShowConfetti(true);
      // Trigger confetti animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstalled, showConfetti]);

  const handleInstallClick = async () => {
    if (!canInstall || !deferredPrompt) return;

    try {
      // Show the install prompt first
      const result = await deferredPrompt.prompt();
      
      if (result.outcome === 'accepted') {
        // User accepted, start installation process
        startInstallation();
      }
      // If dismissed, do nothing - stay on current page
    } catch (error) {
      console.error('Installation failed:', error);
      // On error, stay on current page
    }
  };

  const handleOpenApp = async () => {
    setIsLaunching(true);
    setLaunchStatus('Membuka aplikasi...');

    try {
      const result: PWALaunchResult = await pwaLauncher.launchPWA();
      
      if (result.success) {
        setLaunchStatus(`Berhasil dibuka via ${result.method}`);
        
        // If launched successfully, close current window after delay
        setTimeout(() => {
          if (result.method === 'standalone' || result.method === 'manifest' || result.method === 'serviceWorker') {
            window.close();
          }
        }, 1000);
      } else {
        setLaunchStatus('Gagal membuka aplikasi, mengalihkan...');
        // Fallback: redirect to home page
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (error) {
      console.error('Launch failed:', error);
      setLaunchStatus('Error saat membuka aplikasi');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } finally {
      setTimeout(() => {
        setIsLaunching(false);
        setLaunchStatus('');
      }, 2000);
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

  // Installing state with progress bar
  if (isInstalling) {
    return (
      <div className="w-full space-y-4 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Menginstal Aplikasi
          </h3>
          <p className="text-sm text-blue-700 mb-4">
            Mohon tunggu, aplikasi sedang diinstal...
          </p>
        </div>
        
        <SteppedProgressBar 
          currentStep={currentStep}
          totalSteps={installSteps.length}
          steps={installSteps}
          className="mb-4"
        />
        
        <ProgressBar 
          progress={installProgress}
          isAnimating={true}
          showPercentage={true}
        />
      </div>
    );
  }

  // Installed state with confetti and open app button
  if (isInstalled) {
    return (
      <div className="w-full space-y-4">
        {/* Confetti effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            🎉 Aplikasi Berhasil Diinstal!
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Aplikasi telah terpasang di perangkat Anda
          </p>
          {installDate && (
            <p className="text-xs text-green-600 mb-4">
              Diinstal pada {formatInstallDate(installDate)}
            </p>
          )}
        </div>

        {/* Launch status */}
        {launchStatus && (
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-700">{launchStatus}</p>
          </div>
        )}

        {/* Open App Button */}
        <button
          onClick={handleOpenApp}
          disabled={isLaunching}
          className={`w-full min-h-[60px] px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 ${
            isLaunching
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900'
          }`}
        >
          {isLaunching ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Membuka...</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Buka Aplikasi</span>
            </>
          )}
        </button>
      </div>
    );
  }

  // Default install button
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