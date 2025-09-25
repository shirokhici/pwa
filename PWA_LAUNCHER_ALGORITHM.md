# PWA Launcher Algorithm Documentation

## Overview
Algoritma canggih untuk mendeteksi dan meluncurkan Progressive Web App (PWA) yang telah terinstall di perangkat user.

## Algorithm Flow

### 1. Detection Strategy (Multi-Layer)
```
┌─────────────────────────────────────┐
│          PWA Launch Request         │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│    Strategy 1: Check if Already    │
│         Running in PWA Mode        │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│   Strategy 2: Launch via Manifest  │
│        (Web App Manifest)          │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Strategy 3: Launch via Service    │
│         Worker Detection           │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│   Strategy 4: Launch via Window    │
│      (window.open with params)     │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│    Strategy 5: Fallback Launch     │
│      (Simple Navigation)           │
└─────────────────────────────────────┘
```

## Implementation Details

### Strategy 1: PWA Mode Detection
```typescript
isRunningInPWA(): boolean {
  // Check display modes
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
  const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches;
  
  // Check iOS standalone mode
  const isIOSStandalone = (window.navigator as any).standalone === true;
  
  return isStandalone || isFullscreen || isMinimalUI || isIOSStandalone;
}
```

### Strategy 2: Manifest-Based Launch
```typescript
launchViaManifest(): Promise<PWALaunchResult> {
  // 1. Find manifest link in DOM
  // 2. Fetch manifest.json
  // 3. Extract start_url
  // 4. Launch with PWA parameters
  
  const pwaWindow = window.open(
    fullStartUrl,
    '_blank',
    'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=390,height=844'
  );
}
```

### Strategy 3: Service Worker Detection
```typescript
launchViaServiceWorker(): Promise<PWALaunchResult> {
  // 1. Check if Service Worker is supported
  // 2. Get all registrations
  // 3. If registrations exist, PWA is installed
  // 4. Launch with optimized parameters
  
  const registrations = await navigator.serviceWorker.getRegistrations();
  if (registrations.length > 0) {
    // Launch PWA
  }
}
```

### Strategy 4: Window-Based Launch
```typescript
launchViaWindow(): PWALaunchResult {
  // 1. Detect device type (mobile/desktop)
  // 2. Set appropriate window parameters
  // 3. Launch with optimized dimensions
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  let windowFeatures = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
  
  if (isMobile) {
    windowFeatures += ',width=390,height=844,left=0,top=0';
  } else {
    windowFeatures += ',width=414,height=896,left=100,top=100';
  }
}
```

## PWA Status Detection

### Installation Status Check
```typescript
getPWAStatus(): Promise<{
  isInstalled: boolean;
  isStandalone: boolean;
  hasServiceWorker: boolean;
  hasManifest: boolean;
}>
```

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 67+ (Android/Desktop)
- ✅ Firefox 58+ (Android/Desktop)
- ✅ Safari 11.1+ (iOS/macOS)
- ✅ Edge 79+ (Windows/Android)
- ✅ Samsung Internet 7.2+
- ✅ Opera 54+

### Platform-Specific Features
- **Android**: Full PWA support with Add to Home Screen
- **iOS**: Limited PWA support, uses Safari's Add to Home Screen
- **Windows**: PWA installation via Edge/Chrome
- **macOS**: PWA support in Safari 14+

## Error Handling

### Graceful Degradation
1. **Primary Method Fails**: Try next strategy
2. **All Methods Fail**: Fallback to simple navigation
3. **Error Logging**: Console logging for debugging
4. **User Feedback**: Status messages in UI

### Common Error Scenarios
- **Popup Blocked**: Browser blocks window.open
- **No Service Worker**: PWA not properly installed
- **No Manifest**: Missing or invalid manifest.json
- **Network Error**: Failed to fetch manifest

## Performance Optimizations

### Lazy Loading
- PWA Launcher is singleton pattern
- Only instantiated when needed
- Minimal memory footprint

### Caching
- Manifest data cached after first fetch
- Service Worker registration cached
- Display mode detection cached

## Security Considerations

### Same-Origin Policy
- All launches respect same-origin policy
- Manifest URLs validated
- No external redirects allowed

### User Consent
- All launches require user interaction
- No automatic launches
- Clear user feedback provided

## Usage Example

```typescript
import { pwaLauncher } from '@/utils/pwaLauncher';

const handleLaunchPWA = async () => {
  const result = await pwaLauncher.launchPWA();
  
  if (result.success) {
    console.log(`Launched via ${result.method}: ${result.message}`);
  } else {
    console.error(`Launch failed: ${result.message}`);
  }
};
```

## Testing Scenarios

### Test Cases
1. **Already in PWA**: Should detect and not relaunch
2. **Fresh Install**: Should launch via manifest
3. **Service Worker Active**: Should launch via SW detection
4. **Fallback Mode**: Should use window.open
5. **Error Handling**: Should gracefully degrade

### Device Testing
- 📱 Mobile Chrome (Android)
- 📱 Mobile Safari (iOS)
- 💻 Desktop Chrome
- 💻 Desktop Firefox
- 💻 Desktop Safari
- 💻 Desktop Edge

## Future Enhancements

### Planned Features
- [ ] Deep linking support
- [ ] Custom launch parameters
- [ ] Analytics integration
- [ ] A/B testing for launch methods
- [ ] Background sync detection

### Browser API Improvements
- [ ] Web App Launch Handler API
- [ ] File System Access API integration
- [ ] Web Share Target API
- [ ] Background Fetch API