import Link from 'next/link'
import AnimatedBackground from './components/AnimatedBackground'
import AnimatedProjectCarousel from './components/AnimatedProjectCarousel'

export const metadata = {
  title: 'ModrinthProxy',
  description: 'Скачать моды, плагины, шейдеры, ресурспаки и датапаки для Minecraft. Удобный каталог на русском языке. Тысячи модификаций для любой версии.',
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
   
      <AnimatedBackground />
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-modrinth-green/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-20 animate-fade-in-up">
          
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 animate-fade-in-up animation-delay-200 px-4">
            <span className="bg-gradient-to-r from-modrinth-green via-green-400 to-blue-500 bg-clip-text text-transparent animate-gradient bg-300">
              ModrinthProxy
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-3 md:mb-4 animate-fade-in-up animation-delay-400 font-light px-4">
            Весь контент <span className="text-modrinth-green font-semibold">Minecraft</span> в одном месте
          </p>
          
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-in-up animation-delay-600 px-4">
            Моды, плагины, шейдеры, ресурспаки, датапаки, модпаки — всё из Modrinth API.
            <br className="hidden md:block"/>Прямые ссылки на скачивание. Без хранения файлов.
          </p>

        </div>

      
      </div>

      <div className="animate-fade-in-up animation-delay-2200">
        <AnimatedProjectCarousel />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-20">
        <div className="relative overflow-hidden animate-fade-in-up animation-delay-2400">
      
          <div className="absolute inset-0 bg-gradient-to-br from-modrinth-green/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,230,109,0.1),transparent_50%)]"></div>
          
          <div className="relative backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
         
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white via-modrinth-green to-blue-400 bg-clip-text text-transparent">
                  Начните своё приключение
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Тысячи модификаций ждут вас. От простых твиков до полного преобразования игры — <span className="text-modrinth-green font-semibold">найдите своё идеальное дополнение</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/mods" className="group relative bg-gradient-to-br from-modrinth-green/10 to-green-600/5 border border-modrinth-green/20 hover:border-modrinth-green/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-modrinth-green/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-modrinth-green to-green-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-modrinth-green transition-colors">Моды</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Добавьте новые возможности и механики в игру</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-modrinth-green group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/plugins" className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Плагины</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Расширьте функционал вашего сервера</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/shaders" className="group relative bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">Шейдеры</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Преобразите графику с реалистичным освещением</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/resourcepacks" className="group relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Ресурспаки</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Измените визуальный стиль и звуки игры</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/datapacks" className="group relative bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">Датапаки</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Добавьте новые рецепты и игровую механику</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link href="/modpacks" className="group relative bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">Модпаки</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Готовые сборки модов для быстрого старта</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Все файлы проверены и загружаются напрямую с официального Modrinth CDN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

