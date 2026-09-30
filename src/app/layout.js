import './globals.css';
import InstallPWA from '@/components/InstallPWA';

export const metadata = {
  title: 'SoftTap – Fast Data, TV & Electricity Payments | Powered by michalkeysoft',
  description: 'SoftTap lets you easily buy cheap data, airtime top-ups, TV subscriptions, electricity bills, and result checker pins instantly.',
  keywords: 'SoftTap, michalkeysoft, cheap data Nigeria, VTU platform Nigeria, buy cheap MTN data, electricity bills Nigeria, TV subscription, WAEC pin',
  authors: [{ name: 'michalkeysoft' }],
  creator: 'michalkeysoft',
  publisher: 'michalkeysoft',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SoftTap',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'SoftTap – Fast Data, TV & Electricity Payments',
    description: 'All your bills, one tap away. Fast, reliable, and secure VTU payments by michalkeysoft.',
    url: 'https://softtap.com.ng',
    siteName: 'SoftTap',
    locale: 'en_NG',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b1329',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('softtap_theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SoftTap" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-white text-gray-800 min-h-screen flex flex-col selection:bg-orange-400 selection:text-white">
        {children}
        <InstallPWA />
      </body>
    </html>
  );
}
