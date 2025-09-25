'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface InstallContextType {
  isInstalled: boolean;
  isInstalling: boolean;
  installDate: string | null;
  canInstall: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  startInstallation: () => void;
  completeInstallation: () => void;
  resetInstallation: () => void;
}

const InstallContext = createContext<InstallContextType | undefined>(undefined);

export const useInstall = () => {
  const context = useContext(InstallContext);
  if (context === undefined) {
    throw new Error('useInstall must be used within an InstallProvider');
  }
  return context;
};

interface InstallProviderProps {
  children: ReactNode;
}

export const InstallProvider: React.FC<InstallProviderProps> = ({ children }) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installDate, setInstallDate] = useState<string | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const checkInstallationStatus = () => {
    if (typeof window !== 'undefined') {
      const installed = localStorage.getItem('pwa_installed') === 'true';
      const date = localStorage.getItem('pwa_install_date');
      
      setIsInstalled(installed);
      setInstallDate(date);
      
      // Check if app is running in standalone mode (actually installed)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      
      if (isStandalone || isInWebAppiOS) {
        setIsInstalled(true);
        if (!localStorage.getItem('pwa_installed')) {
          localStorage.setItem('pwa_installed', 'true');
          localStorage.setItem('pwa_install_date', new Date().toISOString());
        }
      }
    }
  };

  const startInstallation = () => {
    setIsInstalling(true);
  };

  const completeInstallation = () => {
    setIsInstalling(false);
    setIsInstalled(true);
    setCanInstall(false);
    
    const now = new Date().toISOString();
    setInstallDate(now);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('pwa_installed', 'true');
      localStorage.setItem('pwa_install_date', now);
    }
  };

  const resetInstallation = () => {
    setIsInstalling(false);
    setIsInstalled(false);
    setInstallDate(null);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pwa_installed');
      localStorage.removeItem('pwa_install_date');
    }
  };

  useEffect(() => {
    checkInstallationStatus();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setCanInstall(false);
      completeInstallation();
    };

    // Listen for display mode changes
    const handleDisplayModeChange = () => {
      checkInstallationStatus();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
      
      // Listen for display mode changes
      const mediaQuery = window.matchMedia('(display-mode: standalone)');
      mediaQuery.addListener(handleDisplayModeChange);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
        mediaQuery.removeListener(handleDisplayModeChange);
      };
    }
  }, []);

  const value: InstallContextType = {
    isInstalled,
    isInstalling,
    installDate,
    canInstall,
    deferredPrompt,
    startInstallation,
    completeInstallation,
    resetInstallation
  };

  return (
    <InstallContext.Provider value={value}>
      {children}
    </InstallContext.Provider>
  );
};