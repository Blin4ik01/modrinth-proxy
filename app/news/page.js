import Link from 'next/link'
import MarkCommitsRead from '../components/MarkCommitsRead'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

async function getCommits() {
  try {
    const res = await fetch(
      'https://api.github.com/repos/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy/commits',
      {
        next: { revalidate: 1800 },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    )
    
    if (!res.ok) {
      throw new Error('Failed to fetch commits')
    }
    
    const commits = await res.json()
    return commits.slice(0, 20)
  } catch (error) {
    console.error('Error fetching commits:', error)
    return []
  }
}

function getPluralForm(number, one, few, many) {
  const absNumber = Math.abs(number)
  const lastDigit = absNumber % 10
  const lastTwoDigits = absNumber % 100
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many
  }
  if (lastDigit === 1) {
    return one
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few
  }
  return many
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  
  if (diffMs < 0) {
    return 'только что'
  }
  
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)
  
  if (diffMins < 1) {
    return 'только что'
  } else if (diffMins < 60) {
    return `${diffMins} ${getPluralForm(diffMins, 'минуту', 'минуты', 'минут')} назад`
  } else if (diffHours < 24) {
    return `${diffHours} ${getPluralForm(diffHours, 'час', 'часа', 'часов')} назад`
  } else if (diffDays < 31) {
    return `${diffDays} ${getPluralForm(diffDays, 'день', 'дня', 'дней')} назад`
  } else if (diffMonths < 12) {
    return `${diffMonths} ${getPluralForm(diffMonths, 'месяц', 'месяца', 'месяцев')} назад`
  } else {
    return `${diffYears} ${getPluralForm(diffYears, 'год', 'года', 'лет')} назад`
  }
}

function getCommitType(message) {
  const msg = message.toLowerCase()
  const firstWord = msg.split(/[\s:]/)[0]
  
  if (msg.includes('улучшение') || msg.includes('улучшен') || msg.includes('улучшена') || msg.includes('улучшено')) {
    return {
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500',
      bg: 'from-blue-500/20 to-cyan-500/20',
      label: 'Обновление'
    }
  }
  
  const types = [
    { 
      keywords: ['fix', 'исправл', 'баг', 'исправлен', 'исправлена', 'исправлено'], 
      icon: '🔧', 
      color: 'from-orange-500 to-red-500',
      bg: 'from-orange-500/20 to-red-500/20',
      label: 'Исправление',
      priority: 1
    },
    { 
      keywords: ['remove', 'delete', 'удал', 'удаление', 'удалён', 'удалена', 'удалено'], 
      icon: '🗑️', 
      color: 'from-red-500 to-rose-500',
      bg: 'from-red-500/20 to-rose-500/20',
      label: 'Удаление',
      priority: 2
    },
    { 
      keywords: ['add', 'new', 'добавл', 'создан', 'добавлено', 'добавлена', 'добавлен'], 
      icon: '✨', 
      color: 'from-green-500 to-emerald-500',
      bg: 'from-green-500/20 to-emerald-500/20',
      label: 'Новое',
      priority: 3
    },
    { 
      keywords: ['design', 'redesign', 'ui', 'style', 'шрифт', 'дизайн', 'стиль'], 
      icon: '🎨', 
      color: 'from-purple-500 to-pink-500',
      bg: 'from-purple-500/20 to-pink-500/20',
      label: 'Дизайн',
      priority: 4
    },
    { 
      keywords: ['update', 'обновл', 'улучш', 'api', 'теперь', 'изменил', 'изменён', 'изменена', 'изменено', 'получаем', 'роутинг', 'обработка', 'показать', 'попытка'], 
      icon: '🚀', 
      color: 'from-blue-500 to-cyan-500',
      bg: 'from-blue-500/20 to-cyan-500/20',
      label: 'Обновление',
      priority: 5
    },
  ]
  
  for (const type of types.sort((a, b) => (a.priority || 999) - (b.priority || 999))) {
    if (type.keywords.some(keyword => firstWord.startsWith(keyword))) {
      return type
    }
  }
  
  for (const type of types.sort((a, b) => (a.priority || 999) - (b.priority || 999))) {
    if (type.keywords.some(keyword => msg.includes(keyword))) {
      return type
    }
  }
  
  return { 
    icon: '📝', 
    color: 'from-gray-500 to-slate-500',
    bg: 'from-gray-500/20 to-slate-500/20',
    label: 'Изменение' 
  }
}

function getShortSha(sha) {
  return sha.substring(0, 7)
}

export const metadata = {
  title: 'Новости и обновления | ModrinthProxy',
  description: 'Последние обновления и изменения ModrinthProxy',
}

export default async function NewsPage() {
  const commits = await getCommits()

  return (
    <div className="min-h-screen bg-modrinth-darker py-12 px-4">
      {commits.length > 0 && <MarkCommitsRead latestSha={commits[0].sha} />}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-modrinth-green/50 to-blue-500/50 blur-3xl opacity-50 animate-pulse-slow"></div>
              <h1 className="relative text-5xl md:text-6xl font-black bg-gradient-to-r from-modrinth-green via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Новости и обновления
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Следите за последними изменениями и улучшениями нашего сервиса
          </p>
          
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-modrinth-green to-emerald-400 bg-clip-text text-transparent">
                {commits.length}
              </div>
              <div className="text-sm text-gray-500">Последних обновлений</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                30мин
              </div>
              <div className="text-sm text-gray-500">Кеш</div>
            </div>
          </div>
        </div>

        {commits.length > 0 ? (
          <div className="space-y-4">
            {commits.map((commit, index) => {
              const type = getCommitType(commit.commit.message)
              
              return (
                <div
                  key={commit.sha}
                  className="group relative bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                    <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>

                  <div className="relative flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="hidden md:block flex-shrink-0 relative group/icon">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${type.bg} border border-white/20 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        {type.icon}
                      </div>
                      
                      
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="prose prose-invert prose-sm max-w-none mb-3 break-words">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                        >
                          {commit.commit.message}
                        </ReactMarkdown>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          {commit.author?.avatar_url ? (
                            <img 
                              src={commit.author.avatar_url} 
                              alt={commit.commit.author.name}
                              className="w-6 h-6 rounded-full ring-1 ring-white/10 hover:ring-white/30 transition-all duration-300 hover:scale-110 shadow-md"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-modrinth-green to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                              {commit.commit.author.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="group/author relative">
                            <span className="hidden md:inline">{commit.commit.author.name}</span>
                            <span className="md:hidden">
                              {commit.commit.author.name.length > 20 
                                ? `${commit.commit.author.name.slice(0, 10)}...${commit.commit.author.name.slice(-4)}`
                                : commit.commit.author.name
                              }
                            </span>
                            {commit.commit.author.name.length > 20 && (
                              <span className="md:hidden absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover/author:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap z-10">
                                {commit.commit.author.name}
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{formatDate(commit.commit.author.date)}</span>
                        </div>

                        <a
                          href={commit.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/commit relative flex items-center gap-2 text-modrinth-green hover:text-green-400 transition-all duration-300 hover:scale-105"
                        >
                          <svg className="w-4 h-4 group-hover/commit:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          <code className="font-mono font-semibold">{getShortSha(commit.sha)}</code>
                          
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-gradient-to-r from-modrinth-green to-emerald-500 text-black text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover/commit:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap transform group-hover/commit:-translate-y-1">
                            Перейти к коммиту на GitHub
                            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-emerald-500"></span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-white mb-2">Нет обновлений</h2>
            <p className="text-gray-500">Не удалось загрузить новости. Попробуйте позже.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-modrinth-green/30 to-blue-500/30 blur-2xl"></div>
            <Link
              href="https://github.com/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 bg-gradient-to-r from-modrinth-green to-emerald-500 hover:from-modrinth-green/90 hover:to-emerald-500/90 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_40px_rgba(26,230,109,0.4)]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>Смотреть на GitHub</span>
            </Link>
          </div>
          
          <div className="mt-6">
            <Link
              href="/"
              className="text-gray-400 hover:text-modrinth-green transition-colors duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Вернуться на главную</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


