import { BLACKLIST_PROJECTS, BLACKLIST_ORGANIZATIONS, BLACKLIST_PATTERNS, BLACKLIST_AVATARS } from '@/lib/contentFilter'
import EmailCopyButton from '@/app/components/EmailCopyButton'
import TiltCard from '@/app/components/TiltCard'
import TiltCardDirectional from '@/app/components/TiltCardDirectional'

export const metadata = {
  title: 'О проекте - ModrinthProxy',
  description: 'Как работает наш сервис и технические детали',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-modrinth-green via-blue-400 to-purple-400 bg-clip-text text-transparent">
            О проекте ModrinthProxy
          </h1>
          <p className="text-xl text-gray-400">
            Технические детали и принципы работы
          </p>
        </div>

        <div className="space-y-8 animate-fade-in-up">
          <section className="relative bg-gradient-to-br from-modrinth-green/10 via-gray-900/80 to-purple-900/20 rounded-2xl p-8 md:p-12 border border-modrinth-green/30 shadow-2xl overflow-hidden">
            {/* Фоновые эффекты */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-modrinth-green/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4">
                <div className="p-3 bg-modrinth-green/20 rounded-xl border-2 border-modrinth-green/40">
                  <svg className="w-10 h-10 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
                </div>
                <span className="bg-gradient-to-r from-white via-modrinth-green to-white bg-clip-text text-transparent">
              Что это такое?
                </span>
            </h2>
              
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium">
                  ModrinthProxy — это <span className="text-modrinth-green font-bold">современная платформа</span> для поиска и скачивания модификаций для Minecraft. 
                  Мы объединяем тысячи модов, плагинов, шейдеров и других материалов в одном удобном месте с русским интерфейсом.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  <div className="group bg-gradient-to-br from-modrinth-green/5 to-transparent rounded-xl p-5 border border-modrinth-green/20 hover:border-modrinth-green/40 transition-all duration-300 hover:scale-[1.02] cursor-default select-none">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-modrinth-green/20 rounded-lg mt-1">
                        <svg className="w-5 h-5 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">Каталог контента</h3>
                        <p className="text-sm text-gray-400">Удобный доступ к информации из открытых источников. Мы собираем данные о модификациях и предоставляем их в структурированном виде.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl p-5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] cursor-default select-none">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg mt-1">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">Прямые ссылки</h3>
                        <p className="text-sm text-gray-400">Мы не храним файлы модификаций на наших серверах. Все ссылки ведут напрямую на официальные источники от авторов.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] cursor-default select-none">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">Русский интерфейс</h3>
                        <p className="text-sm text-gray-400">Полностью переведенный интерфейс, удобная навигация и понятные категории для русскоязычных пользователей.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl p-5 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02] cursor-default select-none">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-500/20 rounded-lg mt-1">
                        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">Фильтрация контента</h3>
                        <p className="text-sm text-gray-400">Применяем фильтры для соблюдения законодательства РФ. Блокировка запрещённого контента происходит автоматически.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-modrinth-green/10 via-blue-500/10 to-purple-500/10 border border-modrinth-green/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-modrinth-green/20 rounded-full">
                      <svg className="w-6 h-6 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-2">Важная информация</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Наш сервис является <span className="font-semibold text-modrinth-green">информационным агрегатором</span> — мы собираем данные о модификациях и предоставляем удобный доступ к ним. 
                        Все файлы хранятся на серверах авторов модификаций, мы лишь предоставляем ссылки и описания. 
                        Это значит, что вы всегда получаете оригинальные, проверенные файлы напрямую от создателей контента.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-8 border border-blue-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Как это работает?
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <div className="flex flex-col md:flex-row items-center gap-4 my-8">
                {/* Этап 1 */}
                <TiltCardDirectional className="flex-1 relative group" direction="top">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-6 border border-blue-600/40 text-center">
                    <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-blue-500/20 border-2 border-blue-400 mx-auto">
                      <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-2">Запрос</h3>
                    <p className="text-sm text-gray-300">Вы ищете мод, плагин или шейдер на нашем сайте</p>
                  </div>
                </TiltCardDirectional>

                {/* Стрелка */}
                <div className="hidden md:block">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="md:hidden">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Этап 2 */}
                <TiltCardDirectional className="flex-1 relative group" direction="bottom">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/30 to-teal-600/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 rounded-2xl p-6 border border-cyan-600/40 text-center">
                    <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-cyan-500/20 border-2 border-cyan-400 mx-auto">
                      <svg className="w-7 h-7 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-2">Поиск</h3>
                    <p className="text-sm text-gray-300">Система находит информацию в базах данных</p>
                  </div>
                </TiltCardDirectional>

                {/* Стрелка */}
                <div className="hidden md:block">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="md:hidden">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Этап 3 */}
                <TiltCardDirectional className="flex-1 relative group" direction="top">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600/30 to-green-600/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-teal-900/50 to-teal-800/30 rounded-2xl p-6 border border-teal-600/40 text-center">
                    <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-green-500/20 border-2 border-green-400 mx-auto">
                      <svg className="w-7 h-7 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-2">Результат</h3>
                    <p className="text-sm text-gray-300">Прямая ссылка на официальный файл автора</p>
                  </div>
                </TiltCardDirectional>
              </div>
              <p>
                Технически, наш сервис является <span className="font-semibold text-blue-400">промежуточным звеном</span> между пользователем и источниками данных. 
                Мы предоставляем удобный интерфейс на русском языке и применяем фильтрацию контента.
              </p>
              <div className="bg-blue-950/30 border border-blue-700/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-200">
                  <strong>Важно:</strong> Все ссылки на скачивание ведут на серверы авторов модификаций. 
                  Наши серверы не взаимодействуют с файлами - мы только предоставляем информацию.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-8 border border-purple-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Соблюдение законодательства РФ
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Мы стремимся соблюдать действующее законодательство Российской Федерации и применяем меры по фильтрации контента:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Блокировка проектов:</strong> Проекты, содержащие запрещенный контент, 
                    автоматически исключаются из поиска и недоступны для просмотра.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Фильтрация изображений:</strong> Изображения с запрещенной символикой 
                    автоматически заменяются на нейтральные заглушки.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Замена текста:</strong> Запрещенные термины автоматически заменяются 
                    на нейтральные символы в описаниях и названиях.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Блокировка организаций:</strong> Проекты от определенных организаций 
                    могут быть ограничены в доступе.
                  </div>
                </li>
              </ul>

              <div className="mt-8 bg-gradient-to-br from-purple-950/50 to-indigo-950/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-300 mb-6 text-center">Статистика фильтрации контента</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <TiltCard className="bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-xl p-6 border border-red-600/30 hover:border-red-500/60 transition-all duration-500 select-none cursor-default" shadowColor="rgba(239, 68, 68, 0.2)">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-red-400 mb-2 animate-pulse-slow">
                        {BLACKLIST_PROJECTS.length}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">Заблокированных</div>
                      <div className="text-lg font-semibold text-white">Проектов</div>
                      <div className="mt-3 pt-3 border-t border-red-800/50">
                        <p className="text-xs text-red-300/80 leading-relaxed">
                          Отдельные моды, плагины, шейдеры, ресурспаки, датапаки и модпаки, содержащие запрещённый контент. 
                          Эти материалы скрыты из поиска и каталога, доступ к их страницам ограничен.
                        </p>
                      </div>
                    </div>
                  </TiltCard>

                  <TiltCard className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-xl p-6 border border-orange-600/30 hover:border-orange-500/60 transition-all duration-500 select-none cursor-default" shadowColor="rgba(249, 115, 22, 0.2)">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-400 mb-2 animate-pulse-slow" style={{ animationDelay: '0.2s' }}>
                        {BLACKLIST_ORGANIZATIONS.length}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">Заблокированных</div>
                      <div className="text-lg font-semibold text-white">Организаций</div>
                      <div className="mt-3 pt-3 border-t border-orange-800/50">
                        <p className="text-xs text-orange-300/80 leading-relaxed">
                          Разработчики и команды, все проекты которых полностью скрыты. 
                          Их моды, ресурспаки, шейдеры и другие материалы не отображаются на сайте и учитываются отдельно от индивидуально заблокированных проектов.
                        </p>
                      </div>
                    </div>
                  </TiltCard>

                  <TiltCard className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 rounded-xl p-6 border border-yellow-600/30 hover:border-yellow-500/60 transition-all duration-500 select-none cursor-default" shadowColor="rgba(234, 179, 8, 0.2)">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-yellow-400 mb-2 animate-pulse-slow" style={{ animationDelay: '0.4s' }}>
                        {BLACKLIST_PATTERNS.length + BLACKLIST_AVATARS.length}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">Заблокированных</div>
                      <div className="text-lg font-semibold text-white">Медиафайлов</div>
                      <div className="mt-3 pt-3 border-t border-yellow-800/50">
                        <p className="text-xs text-yellow-300/80 leading-relaxed">
                          Изображения с запрещённой символикой: аватары авторов, иконки проектов, скриншоты в галереях и картинки в описаниях. 
                          Заблокированные медиафайлы заменяются на нейтральные заглушки.
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>

              <div className="bg-purple-950/30 border border-purple-700/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-purple-200">
                  Все фильтры работают автоматически на стороне нашего сервера. Мы регулярно обновляем списки 
                  блокировок в соответствии с требованиями законодательства.
                </p>
              </div>

              <div className="mt-6 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-900/20 rounded-2xl p-4 md:p-5">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-purple-500/20 rounded-full border-2 border-purple-400/40">
                      <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold text-white mb-2">Связь с администрацией</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      Если у вас есть вопросы о блокировках, предложения по фильтрации контента или официальные запросы от РКН и других государственных органов — напишите нам на указанный email.
                    </p>
                    <div className="flex justify-center md:justify-start">
                      <EmailCopyButton email="black-minecraft@proton.me" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-2xl p-8 border border-orange-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Технический стек
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Проект построен с использованием современных веб-технологий:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-blue-400">⚛️</span>
                    Next.js 14
                  </h4>
                  <p className="text-sm">React-фреймворк с серверным рендерингом</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-cyan-400">🎨</span>
                    Tailwind CSS
                  </h4>
                  <p className="text-sm">Современный CSS-фреймворк для UI</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-orange-400">▲</span>
                    Vercel
                  </h4>
                  <p className="text-sm">Глобальная сеть для быстрой загрузки страниц</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-green-400">🔓</span>
                    Open Source
                  </h4>
                  <p className="text-sm">Исходный код доступен на GitHub</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-2xl p-8 border border-red-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Важные уведомления
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <div className="bg-red-950/30 border border-red-700/50 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">⚠️ Официальное уведомление:</p>
                <p className="text-sm text-red-200">
                  Этот сайт НЕ является официальным сервисом Minecraft. 
                  Не одобрен и не связан с Mojang Studios или Microsoft Corporation.
                </p>
              </div>
              <div className="bg-yellow-950/30 border border-yellow-700/50 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">📋 Авторские права:</p>
                <p className="text-sm text-yellow-200">
                  Все модификации и их содержимое принадлежат их соответствующим авторам. 
                  Мы не претендуем на авторство контента и предоставляем только ссылки.
                </p>
              </div>
              <div className="bg-blue-950/30 border border-blue-700/50 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">🔗 Прямые ссылки:</p>
                <p className="text-sm text-blue-200">
                  При нажатии кнопки "Скачать" вы будете перенаправлены на серверы авторов модификаций. 
                  Файлы загружаются напрямую от разработчиков, минуя наши серверы.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-modrinth-green/20 to-green-800/20 rounded-2xl p-8 border border-green-700/50 shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Открытый исходный код</h2>
            <p className="text-gray-300 mb-6">
              Проект полностью открыт и доступен для изучения на GitHub
            </p>
            <a 
              href="https://github.com/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 group font-medium shadow-lg hover:shadow-modrinth-green/30 hover:scale-105"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>Посмотреть на GitHub</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}


