import './globals.css'
import { Nunito } from "next/font/google"
import Script from 'next/script'
import { Suspense } from 'react'
import MobileNav from './components/MobileNav'
import Navigation from './components/Navigation'
import ExtensionBanner from './components/ExtensionBanner'
import TopNav from "./components/TopNav"
import Footer from './components/Footer'
import Logo from './components/Logo'
import VersionsPreloader from './components/VersionsPreloader'

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['system-ui', 'arial'],
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
    yandex: '63b445e8cd86247b'
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
    <html lang="ru" className={`scroll-smooth ${nunito.variable}`}>
      <head>
        <title>ModrinthProxy</title>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105182235', 'ym');
          ym(105182235, 'init', {ssr:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
        </Script>
      </head>
      <body className={`${nunito.className} overflow-x-hidden min-h-screen m-0`}>
        <noscript dangerouslySetInnerHTML={{ __html: '<div><img src="https://mc.yandex.ru/watch/105182235" style="position:absolute; left:-9999px;" alt="" /></div>' }} />
        <VersionsPreloader />
        <TopNav />
        <nav className="bg-modrinth-darker shadow-lg hidden lg:block">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center gap-4 md:gap-6">
              <Suspense fallback={<div className="w-9 h-9 flex-shrink-0"></div>}>
                <Logo />
              </Suspense>
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
