export const metadata = {
  title: 'Расширение ModrinthProxy - Автоматический редирект с Modrinth',
  description: 'Официальное браузерное расширение ModrinthProxy для автоматического перенаправления с modrinth.com на наш русскоязычный сервис.',
}

export default function ExtensionPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-modrinth-green to-green-400 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-modrinth-green via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Расширение ModrinthProxy
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Автоматически перенаправляет с Modrinth на наш русскоязычный сервис
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-modrinth-green/10 to-transparent rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-modrinth-green/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Что это?</h2>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Официальное браузерное расширение, которое автоматически перенаправляет все ссылки с 
                <span className="text-modrinth-green font-semibold"> modrinth.com</span> на наш сервис 
                <span className="text-modrinth-green font-semibold"> modrinth.white-minecraft.net</span>
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-modrinth-green rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Мгновенное перенаправление</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-modrinth-green rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Работает на всех страницах Modrinth</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-modrinth-green rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Сохраняет все параметры URL</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-modrinth-green rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Легкое и быстрое</span>
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Установка
              </h2>
              
              <div className="bg-gradient-to-r from-modrinth-green/20 to-transparent rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Chrome Web Store</h3>
                    <p className="text-gray-300">Официальное расширение для браузеров на базе Chromium</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 mb-6">
                  Поддерживает Chrome, Edge, Opera, Brave и другие браузеры на базе Chromium
                </p>
                
                <a 
                  href="https://chromewebstore.google.com/detail/modrinth-redirect/poamgpbaabemlgienajmcolicdiapekg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-modrinth-green to-green-400 text-black font-bold py-6 px-8 rounded-2xl hover:from-green-400 hover:to-modrinth-green transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Установить из Chrome Web Store
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-modrinth-green/5 to-transparent rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Как это работает?</h2>
            <p className="text-xl text-gray-400">Простой и прозрачный процесс</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-modrinth-green to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Переход на Modrinth</h3>
              <p className="text-gray-400">Вы переходите по любой ссылке на modrinth.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Автоматический редирект</h3>
              <p className="text-gray-400">Расширение мгновенно перенаправляет на наш сервис</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Готово!</h3>
              <p className="text-gray-400">Вы попадаете на русскоязычную версию сайта</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-modrinth-green/10 to-transparent rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">Начните использовать прямо сейчас</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Установите расширение и наслаждайтесь удобным русскоязычным интерфейсом ModrinthProxy
            </p>
            
            <div className="flex justify-center">
              <a 
                href="https://chromewebstore.google.com/detail/modrinth-redirect/poamgpbaabemlgienajmcolicdiapekg"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-modrinth-green to-green-400 text-black font-bold py-6 px-12 rounded-2xl hover:from-green-400 hover:to-modrinth-green transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Установить расширение
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
