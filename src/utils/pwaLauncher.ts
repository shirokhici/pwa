// PWA Launcher Utility
// Advanced algorithm to detect and launch installed PWA

export interface PWALaunchResult {
  success: boolean;
  method: string;
  message: string;
}

export class PWALauncher {
  private static instance: PWALauncher;
  private startUrl: string;

  constructor() {
    this.startUrl = 'https://www.pwawiki.com';
  }

  public static getInstance(): PWALauncher {
    if (!PWALauncher.instance) {
      PWALauncher.instance = new PWALauncher();
    }
    return PWALauncher.instance;
  }

  /**
   * Main method to launch PWA with multiple fallback strategies
   */
  public async launchPWA(): Promise<PWALaunchResult> {
    // Strategy 1: Check if running in standalone mode (already in PWA)
    if (this.isRunningInPWA()) {
      return {
        success: true,
        method: 'already_in_pwa',
        message: 'Already running in PWA mode'
      };
    }

    // Strategy 2: Try to launch using Web App Manifest
    const manifestResult = await this.launchViaManifest();
    if (manifestResult.success) {
      return manifestResult;
    }

    // Strategy 3: Try to launch using Service Worker detection
    const swResult = await this.launchViaServiceWorker();
    if (swResult.success) {
      return swResult;
    }

    // Strategy 4: Try to launch using window.open with PWA parameters
    const windowResult = this.launchViaWindow();
    if (windowResult.success) {
      return windowResult;
    }

    // Strategy 5: Fallback to regular navigation
    return this.fallbackLaunch();
  }

  /**
   * Check if currently running in PWA standalone mode
   */
  private isRunningInPWA(): boolean {
    if (typeof window === 'undefined') return false;

    // Check display mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
    const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches;

    // Check if launched from home screen (iOS)
    const isIOSStandalone = (window.navigator as any).standalone === true;

    return isStandalone || isFullscreen || isMinimalUI || isIOSStandalone;
  }

  /**
   * Launch PWA using Web App Manifest
   */
  private async launchViaManifest(): Promise<PWALaunchResult> {
    try {
      // Check if manifest is available
      const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
      if (!manifestLink) {
        return { success: false, method: 'manifest', message: 'No manifest found' };
      }

      // Fetch manifest to get start_url
      const response = await fetch(manifestLink.href);
      const manifest = await response.json();
      
      if (manifest.start_url) {
        const fullStartUrl = new URL(manifest.start_url, window.location.origin).href;
        
        // Try to open with PWA-like parameters
        const pwaWindow = window.open(
          fullStartUrl,
          '_blank',
          'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=390,height=844'
        );

        if (pwaWindow) {
          return {
            success: true,
            method: 'manifest',
            message: 'Launched via manifest start_url'
          };
        }
      }

      return { success: false, method: 'manifest', message: 'Failed to open PWA window' };
    } catch (error) {
      return { success: false, method: 'manifest', message: `Manifest error: ${error}` };
    }
  }

  /**
   * Launch PWA using Service Worker detection
   */
  private async launchViaServiceWorker(): Promise<PWALaunchResult> {
    try {
      if (!('serviceWorker' in navigator)) {
        return { success: false, method: 'service_worker', message: 'Service Worker not supported' };
      }

      const registrations = await navigator.serviceWorker.getRegistrations();
      
      if (registrations.length > 0) {
        // PWA is installed, try to launch
        const pwaWindow = window.open(
          this.startUrl,
          'pwa_app',
          'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes'
        );

        if (pwaWindow) {
          // Focus the new window
          pwaWindow.focus();
          
          return {
            success: true,
            method: 'service_worker',
            message: 'Launched via Service Worker detection'
          };
        }
      }

      return { success: false, method: 'service_worker', message: 'No active service worker or failed to open' };
    } catch (error) {
      return { success: false, method: 'service_worker', message: `Service Worker error: ${error}` };
    }
  }

  /**
   * Launch PWA using window.open with mobile-optimized parameters
   */
  private launchViaWindow(): PWALaunchResult {
    try {
      // Detect mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      let windowFeatures = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
      
      if (isMobile) {
        // Mobile-optimized window
        windowFeatures += ',width=390,height=844,left=0,top=0';
      } else {
        // Desktop-optimized window
        windowFeatures += ',width=414,height=896,left=100,top=100';
      }

      const pwaWindow = window.open(this.startUrl, 'pwa_launcher', windowFeatures);

      if (pwaWindow) {
        pwaWindow.focus();
        
        return {
          success: true,
          method: 'window_open',
          message: 'Launched via window.open'
        };
      }

      return { success: false, method: 'window_open', message: 'Failed to open window' };
    } catch (error) {
      return { success: false, method: 'window_open', message: `Window open error: ${error}` };
    }
  }

  /**
   * Fallback launch method
   */
  private fallbackLaunch(): PWALaunchResult {
    try {
      // Simple navigation to start URL
      window.location.href = this.startUrl;
      
      return {
        success: true,
        method: 'fallback',
        message: 'Launched via fallback navigation'
      };
    } catch (error) {
      return { success: false, method: 'fallback', message: `Fallback error: ${error}` };
    }
  }

  /**
   * Get PWA installation status
   */
  public async getPWAStatus(): Promise<{
    isInstalled: boolean;
    isStandalone: boolean;
    hasServiceWorker: boolean;
    hasManifest: boolean;
  }> {
    const isStandalone = this.isRunningInPWA();
    const hasManifest = !!document.querySelector('link[rel="manifest"]');
    
    let hasServiceWorker = false;
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        hasServiceWorker = registrations.length > 0;
      } catch (error) {
        hasServiceWorker = false;
      }
    }

    return {
      isInstalled: hasServiceWorker && hasManifest,
      isStandalone,
      hasServiceWorker,
      hasManifest
    };
  }
}

// Export singleton instance
export const pwaLauncher = PWALauncher.getInstance();