import './globals.css'
import Link from 'next/link'
import MobileNav from './components/MobileNav'
import Navigation from './components/Navigation'
import ExtensionBanner from './components/ExtensionBanner'
import EmailCopyButton from './components/EmailCopyButton'
import TopNav from './components/TopNav'

export const metadata = {
  title: 'ModrinthProxy',
  description: 'Удобный поиск и скачивание модов, плагинов, шейдеров для Minecraft на русском языке',
  manifest: '/manifest.json',
  themeColor: '#1bd96a',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ModrinthProxy',
  },
  verification: {
    yandex: '79af01936dc8fd7f',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', margin: 0 }}>
        <TopNav />
        <nav className="bg-modrinth-darker sticky top-0 z-30 backdrop-blur-lg bg-opacity-95 shadow-lg hidden lg:block">
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span className="font-medium select-none">modrinth.white-minecraft.net</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Navigation />
            </div>
          </div>
        </nav>
        <main className="container mx-auto">
          {children}
        </main>
        <MobileNav />
        <footer className="relative mt-8 md:mt-16 mb-20 lg:mb-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-modrinth-green to-transparent opacity-50"></div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-modrinth-green/30 to-transparent blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-modrinth-darker via-black to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-modrinth-green/5 via-transparent to-purple-900/5"></div>
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '50px 50px', transform: 'skewY(-2deg) translateY(10px)'}}></div>
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(26,230,109,0.03) 1px, transparent 0)', backgroundSize: '35px 35px', transform: 'skewX(3deg)'}}></div>
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(147,51,234,0.02) 1.5px, transparent 0)', backgroundSize: '60px 45px', transform: 'rotate(1deg)'}}></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-modrinth-green/10 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl opacity-20"></div>
          <div className="relative container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold bg-gradient-to-r from-modrinth-green to-green-400 bg-clip-text text-transparent mb-3 select-none">
                  ModrinthProxy
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Делаем Minecraft лучше для каждого игрока. 
                  Моды, шейдеры, плагины — всё, что нужно для идеальной игры.
                  <br/>
                  <span className="text-modrinth-green/80 font-medium">Minecraft в каждый дом. Приключения без границ.</span>
                </p>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-white mb-3">
                  Открытый код
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  Полностью открытый проект
                </p>
                <a 
                  href="https://github.com/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 group text-sm font-medium shadow-lg hover:shadow-modrinth-green/20 hover:scale-105"
                >
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>Open Source</span>
                </a>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-white mb-3">
                  Поддержка
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Нашли баг? Есть предложения? 
                  <br/>
                  <a href="https://github.com/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy/issues" target="_blank" rel="noopener noreferrer" className="text-modrinth-green hover:text-green-400 transition-colors font-medium">
                    GitHub Issues
                  </a>
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-3">
                  Связаться с нами
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  Для официальных запросов
                </p>
                <div className="!text-center">
                  <EmailCopyButton email="black-minecraft@proton.me" />
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/bmadnco" className="flex items-center gap-2 text-gray-400 hover:text-modrinth-green text-xs transition-colors group">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">О проекте и как это работает</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 mt-8">
              <div className="flex items-center justify-center">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-modrinth-green/20 via-purple-500/20 to-modrinth-green/20 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                  <div className="relative flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-2xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-modrinth-green/10 border border-modrinth-green/20">
                      <svg className="w-5 h-5 text-modrinth-green/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                        Disclaimer
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                        Not an official Minecraft service. Not approved by or associated with Mojang or Microsoft.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        
        <ExtensionBanner />
      </body>
    </html>
  )
}


