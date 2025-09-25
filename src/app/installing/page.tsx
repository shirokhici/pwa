'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InstallingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const installationSteps = [
    'Mempersiapkan instalasi...',
    'Mengunduh komponen aplikasi...',
    'Mengonfigurasi pengaturan...',
    'Menginstal aplikasi...',
    'Menyelesaikan instalasi...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Redirect to success page after installation completes
          setTimeout(() => {
            router.push('/installed');
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < installationSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, 2000);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* App Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Menginstal Aplikasi
        </h1>
        <p className="text-gray-600 mb-8">
          Mohon tunggu, aplikasi sedang diinstal ke perangkat Anda
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm font-medium text-blue-600">
            {progress}% selesai
          </div>
        </div>

        {/* Current Step */}
        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-4">
            {installationSteps[currentStep]}
          </div>
          
          {/* Loading Animation */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Installation Steps List */}
        <div className="text-left space-y-3">
          {installationSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                index < currentStep ? 'bg-green-500' : 
                index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {index < currentStep ? (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : index === currentStep ? (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                ) : null}
              </div>
              <span className={`text-sm ${
                index <= currentStep ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Cancel Button */}
        <button
          onClick={() => router.push('/')}
          className="mt-8 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Batalkan Instalasi
        </button>
      </div>
    </div>
  );
}