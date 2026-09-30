'use client';

import { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Smartphone } from 'lucide-react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running as standalone app
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      setIsStandalone(true);
      return;
    }

    // Check if user previously dismissed prompt today
    const dismissedAt = localStorage.getItem('softtap_pwa_dismissed');
    if (dismissedAt) {
      const hoursAgo = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60);
      if (hoursAgo < 24) {
        setIsDismissed(true);
      }
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[SoftTap PWA] Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('[SoftTap PWA] Service Worker registration failed:', err);
        });
    }

    // Capture standard PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSPrompt(true);
      return;
    }

    if (!deferredPrompt) {
      // Fallback instruction
      alert('To install SoftTap, open your browser menu (⋮) and tap "Install app" or "Add to Home screen".');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('softtap_pwa_dismissed', Date.now().toString());
  };

  // If already installed or dismissed, do not render banner
  if (isStandalone || isDismissed) {
    return null;
  }

  // Only show if installable on Android/Desktop or on iOS Safari
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom App Install Banner */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-bottom duration-500">
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl border border-orange-500/40 shadow-2xl shadow-orange-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-md shrink-0">
              <span className="font-black text-white text-base tracking-tighter">ST</span>
            </div>
            <div>
              <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">Install SoftTap App</p>
              <h4 className="text-sm font-extrabold text-white leading-tight">Fast 1-Tap Access</h4>
              <p className="text-[11px] text-gray-300">Add to home screen for faster recharging</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-orange-500/30 touch-manipulation active:scale-95"
            >
              <Download className="w-3.5 h-3.5" /> Install
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white transition"
              aria-label="Dismiss install prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSPrompt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-gray-800 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-500" />
                <h3 className="font-extrabold text-blue-900 text-base">Install on iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIOSPrompt(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Install <strong>SoftTap</strong> on your iOS device in 2 easy taps:
            </p>

            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Share className="w-4 h-4" />
                </div>
                <span>1. Tap the <strong>Share button</strong> at the bottom of Safari.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <span>2. Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSPrompt(false)}
              className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-xs uppercase tracking-wider"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}
