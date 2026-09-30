'use client';

import { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Smartphone, Laptop, Sparkles, CheckCircle2 } from 'lucide-react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // Check if already running in standalone (installed app) mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      setIsStandalone(true);
      return;
    }

    // Check device OS
    const ua = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(ua);
    const androidDevice = /android/.test(ua);
    setIsIOS(iosDevice);
    setIsAndroid(androidDevice);

    // Register service worker for PWA caching & offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[SoftTap PWA] Service Worker registered:', reg.scope);
          // Check for service worker updates immediately
          reg.update();
        })
        .catch((err) => {
          console.warn('[SoftTap PWA] Service Worker registration failed:', err);
        });
    }

    // Capture standard PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredSoftTapPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for custom trigger from any button across the app (Navbar, Dashboard, etc.)
    const handleCustomTrigger = () => {
      triggerInstall();
    };
    window.addEventListener('softtap-trigger-install', handleCustomTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('softtap-trigger-install', handleCustomTrigger);
    };
  }, []);

  const triggerInstall = async () => {
    // 1. If native deferred prompt is available (Chrome, Android, Edge)
    const prompt = deferredPrompt || window.deferredSoftTapPrompt;
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        setIsDismissed(true);
      }
      setDeferredPrompt(null);
      window.deferredSoftTapPrompt = null;
      return;
    }

    // 2. Otherwise open the device-specific guided installation modal
    setShowGuideModal(true);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Don't show floating banner again for 12 hours on dismiss
    try {
      localStorage.setItem('softtap_pwa_dismissed', Date.now().toString());
    } catch {
      // storage unavailable fallback
    }
  };

  // If already running as an installed standalone app, don't show the banner
  if (isStandalone) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Installation Banner (Shown to every user) */}
      {!isDismissed && (
        <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-bottom duration-500">
          <div className="bg-slate-900/98 backdrop-blur-xl text-white p-3.5 sm:p-4 rounded-2xl border-2 border-orange-500/50 shadow-2xl shadow-orange-500/25 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-500 via-orange-600 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
                <span className="font-black text-white text-base tracking-tighter">ST</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-wider bg-orange-500/20 px-1.5 py-0.5 rounded">
                    Mobile App
                  </span>
                  <span className="text-[10px] text-green-400 font-bold flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Instant
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight mt-0.5">
                  Install SoftTap on Device
                </h4>
                <p className="text-[11px] text-gray-300">Fast 1-tap access with zero downloads</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={triggerInstall}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-orange-500/40 active:scale-95 touch-manipulation cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Install
              </button>
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white transition"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal Device Installation Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-gray-800 space-y-5 shadow-2xl border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
                  <span className="font-black text-sm">ST</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-blue-900 text-base leading-tight">Install SoftTap</h3>
                  <p className="text-[11px] text-gray-500">Quick 2-step setup on your device</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* iOS Instructions */}
            {isIOS && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Smartphone className="w-4 h-4 text-orange-500" /> iPhone / iPad (Safari):
                </div>
                <div className="space-y-2.5 bg-orange-50/60 p-4 rounded-2xl border border-orange-100 text-xs text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Share className="w-3.5 h-3.5" />
                    </div>
                    <span>1. Tap the <strong>Share</strong> button at bottom of Safari.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <PlusSquare className="w-3.5 h-3.5" />
                    </div>
                    <span>2. Scroll down &amp; tap <strong>&quot;Add to Home Screen&quot;</strong>.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Android Instructions */}
            {isAndroid && !isIOS && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Smartphone className="w-4 h-4 text-orange-500" /> Android Device:
                </div>
                <div className="space-y-2.5 bg-orange-50/60 p-4 rounded-2xl border border-orange-100 text-xs text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-xs">
                      ⋮
                    </div>
                    <span>1. Tap the <strong>three dots menu (⋮)</strong> in your browser.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Download className="w-3.5 h-3.5" />
                    </div>
                    <span>2. Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop / Laptop Instructions */}
            {!isIOS && !isAndroid && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Laptop className="w-4 h-4 text-orange-500" /> Laptop or Desktop:
                </div>
                <div className="space-y-2.5 bg-orange-50/60 p-4 rounded-2xl border border-orange-100 text-xs text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-xs">
                      ⊕
                    </div>
                    <span>Look for the <strong>Install icon (⊕)</strong> on the right side of your address bar.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-xs">
                      ⋮
                    </div>
                    <span>Or click browser menu (⋮) $\rightarrow$ <strong>&quot;Install SoftTap&quot;</strong>.</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition cursor-pointer"
            >
              Got It, Done!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
