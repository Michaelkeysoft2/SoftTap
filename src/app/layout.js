import './globals.css';

export const metadata = {
  title: 'SoftTap – Fast Data, TV & Electricity Payments | Powered by michalkeysoft',
  description: 'SoftTap lets you easily buy cheap data, airtime top-ups, TV subscriptions, electricity bills, and result checker pins instantly.',
  keywords: 'SoftTap, michalkeysoft, cheap data Nigeria, VTU platform Nigeria, buy cheap MTN data, electricity bills Nigeria, TV subscription, WAEC pin',
  authors: [{ name: 'michalkeysoft' }],
  creator: 'michalkeysoft',
  publisher: 'michalkeysoft',
  openGraph: {
    title: 'SoftTap – Fast Data, TV & Electricity Payments',
    description: 'All your bills, one tap away. Fast, reliable, and secure VTU payments by michalkeysoft.',
    url: 'https://softtap.com.ng',
    siteName: 'SoftTap',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#0b0914] text-slate-100 min-h-screen flex flex-col selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
