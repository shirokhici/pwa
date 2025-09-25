'use client';

import { useState, useEffect, useRef } from 'react';
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
    completeInstallation,
    cancelInstallation,
    installDate 
  } = useInstall();

  // Installation progress states
  const [installProgress, setInstallProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // PWA launch states
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState<string>('');

  // Refs to track intervals for cancellation
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const installSteps = [
    'Mempersiapkan',
    'Mengunduh',
    'Menginstal',
    'Menyelesaikan'
  ];

  // Handle cancel installation
  const handleCancel = () => {
    // Clear intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
    
    // Reset progress states
    setInstallProgress(0);
    setCurrentStep(0);
    
    // Cancel installation in context
    cancelInstallation();
  };

  // Simulate installation progress (10 seconds total)
  useEffect(() => {
    if (isInstalling) {
      setInstallProgress(0);
      setCurrentStep(1);
      
      // Progress bar: 100% in 10 seconds = 1% every 100ms
      progressIntervalRef.current = setInterval(() => {
        setInstallProgress(prev => {
          if (prev >= 100) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
            }
            return 100;
          }
          return prev + 1;
        });
      }, 100);

      // Steps: 4 steps in 10 seconds = every 2.5 seconds
      stepIntervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= installSteps.length) {
            if (stepIntervalRef.current) {
              clearInterval(stepIntervalRef.current);
              stepIntervalRef.current = null;
            }
            return installSteps.length;
          }
          return prev + 1;
        });
      }, 2500);

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        if (stepIntervalRef.current) {
          clearInterval(stepIntervalRef.current);
          stepIntervalRef.current = null;
        }
      };
    }
  }, [isInstalling]);

  // Complete installation when progress reaches 100%
  useEffect(() => {
    if (isInstalling && installProgress >= 100) {
      // Small delay to show 100% before completing
      const timer = setTimeout(() => {
        completeInstallation();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInstalling, installProgress, completeInstallation]);

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
    // Always start installation process for demo/testing
    startInstallation();
    
    // If browser supports PWA installation, also show the native prompt
    if (canInstall && deferredPrompt) {
      try {
        const result = await deferredPrompt.prompt();
        console.log('Native install prompt result:', result.outcome);
      } catch (error) {
        console.error('Native installation prompt failed:', error);
      }
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

  // Installing state with enhanced progress bar and animations
  if (isInstalling) {
    return (
      <div className="w-full space-y-4">
        {/* Enhanced loading header with pulse animation */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 text-center animate-success-pulse">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            Menginstal Aplikasi
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            Mohon tunggu, aplikasi sedang diinstal...
          </p>
          <p className="text-xs text-blue-600 font-medium">
            {installSteps[currentStep - 1]} • {installProgress}%
          </p>
        </div>
        
        {/* Enhanced stepped progress bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <SteppedProgressBar 
            currentStep={currentStep}
            totalSteps={installSteps.length}
            steps={installSteps}
            className="mb-4"
          />
        </div>
        
        {/* Enhanced main progress bar with shimmer effect */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress Instalasi</span>
            <span className="text-sm font-bold text-blue-600">{installProgress}%</span>
          </div>
          <ProgressBar 
            progress={installProgress}
            isAnimating={true}
            showPercentage={false}
          />
          
          {/* Cancel button */}
          <button
            onClick={handleCancel}
            className="w-full mt-4 min-h-[60px] px-6 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Batalkan</span>
          </button>
        </div>
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