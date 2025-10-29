import './globals.css'
import { JetBrains_Mono } from "next/font/google"
import Link from 'next/link'
import MobileNav from './components/MobileNav'
import Navigation from './components/Navigation'
import ExtensionBanner from './components/ExtensionBanner'
import CurrentDomain from './components/CurrentDomain'
import TopNav from "./components/TopNav"
import Footer from './components/Footer'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export const metadata = {
  title: 'ModrinthProxy',
  description: 'Удобный поиск и скачивание модов, плагинов, шейдеров для Minecraft на русском языке',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ModrinthProxy'
  },
  verification: {
    yandex: '79af01936dc8fd7f'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1bd96a'
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`scroll-smooth ${jetbrainsMono.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${jetbrainsMono.className} overflow-x-hidden min-h-screen m-0`}>
        <TopNav />
        <nav className="bg-modrinth-darker shadow-lg hidden lg:block">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0 relative">
                <img
                  src="/icon.png"
                  alt="Logo"
                  draggable="false"
                  className="w-8 h-8 md:w-9 md:h-9 object-contain drop-shadow-[0_0_8px_rgba(26,230,109,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_12px_rgba(26,230,109,0.7)] select-none pointer-events-none"
                />
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-modrinth-green to-green-400 bg-clip-text text-transparent hidden sm:block group-hover:from-green-400 group-hover:to-modrinth-green transition-all select-none">ModrinthProxy</span>
                <div className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-[2px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-50 select-none">
                  <div className="relative select-none">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-gray-800 select-none"></div>
                    <div className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-xs whitespace-nowrap shadow-xl border border-gray-700 select-none">
                      <div className="flex items-center gap-1.5 select-none">
                        <svg className="w-3.5 h-3.5 text-modrinth-green animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03-3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <CurrentDomain />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Navigation />
            </div>
          </div>
        </nav>
        <main className="container">
          {children}
        </main>
        <MobileNav />
        <Footer />
        <ExtensionBanner />
      </body>
    </html>
  )
}
