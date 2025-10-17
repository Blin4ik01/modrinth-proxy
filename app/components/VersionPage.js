import Link from 'next/link'
import { formatDownloads, formatDate, formatFileSize } from '@/lib/modrinth'
import { filterVersionChangelog, filterAvatar } from '@/lib/contentFilter'
import { CATEGORIES } from '@/lib/categories'
import { RESOURCEPACK_CATEGORIES } from '@/lib/resourcepackCategories'
import { SHADER_STYLES, SHADER_FEATURES, SHADER_PERFORMANCE } from '@/lib/shaderCategories'
import { LOADERS } from '@/lib/loaders'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import CopyButton from './CopyButton'
import ContentNavigation from './ContentNavigation'

class VersionPageData {
  constructor(project, version) {
    this.project = project
    this.version = version
  }

  getPrimaryFile() {
    return this.version.files.find(f => f.primary) || this.version.files[0]
  }

  getSecondaryFiles() {
    return this.version.files.filter(f => !f.primary)
  }

  getVersionTypeInfo() {
    const types = {
      release: { color: 'green', label: 'Release' },
      beta: { color: 'yellow', label: 'Beta' },
      alpha: { color: 'red', label: 'Alpha' }
    }
    return types[this.version.version_type] || types.release
  }

  formatPublicationDate() {
    const date = new Date(this.version.date_published)
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

class VersionMetadata {
  constructor(version, author) {
    this.version = version
    this.author = author ? {
      ...author,
      avatar_url: filterAvatar(author.avatar_url)
    } : null
  }

  render() {
    const versionType = this.getVersionTypeInfo()
    
    return (
      <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-3">Метаданные</h2>
        <div className="space-y-3.5">
          <MetadataItem
            label="Канал релиза"
            value={
              <span className={`inline-block px-3 py-1 rounded-full bg-${versionType.color}-900 text-${versionType.color}-300 font-semibold text-sm`}>
                {versionType.label}
              </span>
            }
          />
          <MetadataItem label="Номер версии" value={this.version.version_number} />
          <MetadataItem
            label="Загрузчики"
            value={
              <div className="flex flex-wrap gap-1.5">
                {this.version.loaders.filter(l => l !== 'minecraft').map(loaderId => {
                  const loaderData = LOADERS.find(l => l.id === loaderId)
                  if (!loaderData) return null
                  
                  return (
                    <span 
                      key={loaderId} 
                      className="inline-flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: loaderData.color || '#d1d5db' }}
                    >
                      <div className="w-4 h-4 flex-shrink-0">
                        {loaderData.icon}
                      </div>
                      {loaderData.name}
                    </span>
                  )
                })}
              </div>
            }
          />
          <MetadataItem
            label="Версии игры"
            value={
              <div className="flex flex-wrap gap-1.5">
                {this.version.game_versions.map(v => (
                  <span key={v} className="text-sm">
                    {v}
                  </span>
                ))}
              </div>
            }
          />
          <MetadataItem label="Загрузок" value={formatDownloads(this.version.downloads)} />
          <MetadataItem label="Дата публикации" value={this.formatPublicationDate()} />
          <MetadataItem
            label="Загрузил"
            value={
              <div className="flex items-center gap-2">
                {this.author && (
                  <>
                    {this.author.avatar_url && (
                      <img 
                        src={this.author.avatar_url} 
                        alt={this.author.username}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="font-semibold">{this.author.username}</span>
                  </>
                )}
                {!this.author && (
                  <span className="text-gray-400">{this.version.author_id}</span>
                )}
              </div>
            }
          />
          <MetadataItem label="ID версии" value={
            <CopyButton text={this.version.id} />
          } />
        </div>
      </div>
    )
  }

  getVersionTypeInfo() {
    const types = {
      release: { color: 'green', label: 'Release' },
      beta: { color: 'yellow', label: 'Beta' },
      alpha: { color: 'red', label: 'Alpha' }
    }
    return types[this.version.version_type] || types.release
  }

  formatPublicationDate() {
    const date = new Date(this.version.date_published)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }
}

function MetadataItem({ label, value }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-1.5 text-gray-300">{label}</h4>
      <div className="text-white text-sm">{value}</div>
    </div>
  )
}

class FilesList {
  constructor(files) {
    this.files = files
  }

  render() {
    return (
      <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-3">Файлы</h2>
        <div className="space-y-2">
          {this.files.map(file => (
            <FileItem key={file.hashes.sha1} file={file} />
          ))}
        </div>
      </div>
    )
  }
}

function FileItem({ file }) {
  const isPrimary = file.primary
  
  return (
    <div 
      className={`flex items-center justify-between gap-3 p-2 transition ${
        isPrimary 
          ? 'hover:bg-[rgba(27,217,106,.3)]' 
          : 'hover:bg-[#3a3c42]'
      }`}
      style={{ 
        backgroundColor: isPrimary ? 'rgba(27,217,106,.25)' : '#34363c',
        borderRadius: '.75rem'
      }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5zM14 2v6h6" />
        </svg>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="font-semibold text-white truncate">{file.filename}</span>
            <span className="text-sm text-gray-400 flex-shrink-0">({formatFileSize(file.size)})</span>
          </div>
          {isPrimary && (
            <span className="inline-block px-2 py-0.5 bg-blue-900 text-blue-300 text-xs rounded-full font-semibold">
              Основной
            </span>
          )}
        </div>
      </div>
      <a
        href={file.url}
        download
        className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition ${
          isPrimary
            ? 'bg-modrinth-green hover:bg-green-400 text-black'
            : 'hover:bg-[#2f3136]'
        }`}
        style={!isPrimary ? { 
          backgroundColor: '#27292e',
          color: '#b0bac5'
        } : {}}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="text-sm">Скачать</span>
      </a>
    </div>
  )
}

export default function VersionPage({ project, version, author, contentType, pluralName, singularName, versionsCount }) {
  const pageData = new VersionPageData(project, version)
  const primaryFile = pageData.getPrimaryFile()
  const versionType = pageData.getVersionTypeInfo()
  const metadata = new VersionMetadata(version, author)
  const filesList = new FilesList(version.files)
  
  let allCategories = CATEGORIES
  if (pluralName === 'resourcepacks') {
    allCategories = [...CATEGORIES, ...RESOURCEPACK_CATEGORIES]
  } else if (pluralName === 'shaders') {
    allCategories = [...CATEGORIES, ...SHADER_STYLES, ...SHADER_FEATURES, ...SHADER_PERFORMANCE]
  }
  
  const allProjectCategories = [
    ...(project.categories || []),
    ...(project.additional_categories || [])
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 md:mb-6 flex items-center gap-2 text-sm flex-wrap">
        <Link 
          href={`/${pluralName}`}
          className="text-gray-400 hover:text-modrinth-green transition-colors duration-200 font-medium"
        >
          {pluralName === 'mods' ? 'Моды' : 
           pluralName === 'plugins' ? 'Плагины' :
           pluralName === 'datapacks' ? 'Датапаки' :
           pluralName === 'resourcepacks' ? 'Ресурспаки' :
           pluralName === 'shaders' ? 'Шейдеры' :
           pluralName === 'modpacks' ? 'Модпаки' : pluralName}
        </Link>
        <span className="text-gray-600">/</span>
        <Link 
          href={`/${singularName}/${project.slug}`}
          className="text-gray-400 hover:text-modrinth-green transition-colors duration-200 font-medium"
        >
          {project.title}
        </Link>
        <span className="text-gray-600">/</span>
        <Link 
          href={`/${singularName}/${project.slug}?tab=versions`}
          className="text-gray-400 hover:text-modrinth-green transition-colors duration-200 font-medium"
        >
          Версии
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-white font-semibold">{version.name}</span>
      </div>

      <div className="border-b pb-4 md:pb-6 mb-6 md:mb-8" style={{ borderBottomColor: '#34363c' }}>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start">
          <div className="flex gap-3 md:gap-4 flex-1">
            {project.icon_url && (
              <img
                src={project.icon_url}
                alt={project.title}
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-gray-300 mb-3 text-sm md:text-base">{project.description}</p>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                {project.downloads != null && (
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="font-semibold text-white">{formatDownloads(project.downloads)}</span>
                  </div>
                )}
                {(project.followers != null || project.follows != null) && (
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="font-semibold text-white">{formatDownloads(project.followers || project.follows)}</span>
                  </div>
                )}
                {allProjectCategories.length > 0 && (
                  <div className="hidden sm:flex flex-wrap gap-1.5">
                    {allProjectCategories.slice(0, 4).map((catId) => {
                      try {
                        if (!catId || typeof catId !== 'string') return null
                        const category = allCategories.find(c => c.id === catId)
                        if (!category || !category.icon || !category.name) return null
                        
                        return (
                          <Link
                            key={catId}
                            href={`/${pluralName}?f=categories:${catId}`}
                            className="px-2 py-1 text-xs font-semibold rounded-lg hover:brightness-110 transition-all flex items-center gap-1.5"
                            style={{ backgroundColor: '#34363c', color: '#80878f' }}
                          >
                            <div className="h-3.5 w-3.5 flex-shrink-0">{category.icon}</div>
                            <span>{category.name}</span>
                          </Link>
                        )
                      } catch (e) {
                        return null
                      }
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:flex lg:items-center">
            {primaryFile && (
              <>
                <div className="hidden lg:block w-full lg:w-auto">
                  <a
                    href={primaryFile.url}
                    download
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-modrinth-green hover:bg-green-400 text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Скачать
                  </a>
                </div>
                
                <div className="lg:hidden flex items-center gap-3 justify-between">
                  <div className="flex flex-col gap-2 text-xs">
                    {project.downloads != null && (
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="font-semibold text-white">{formatDownloads(project.downloads)}</span>
                      </div>
                    )}
                    {(project.followers != null || project.follows != null) && (
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span className="font-semibold text-white">{formatDownloads(project.followers || project.follows)}</span>
                      </div>
                    )}
                  </div>
                  
                  <a
                    href={primaryFile.url}
                    download
                    className="flex items-center justify-center w-12 h-12 bg-modrinth-green hover:bg-green-400 text-black rounded-full transition-all duration-300 hover:scale-105 flex-shrink-0"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ContentNavigation slug={project.slug} contentType={singularName} versionsCount={versionsCount || 0} />

      <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Link 
            href={`/${singularName}/${project.slug}?tab=versions`}
            className="hover:text-modrinth-green transition-colors"
          >
            Все версии
          </Link>
          <span>→</span>
          <span className="text-white font-semibold">{version.name}</span>
        </div>
        <h2 className="text-xl font-bold mb-2">{version.name}</h2>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-${versionType.color}-900 text-${versionType.color}-300`}>
            {versionType.label}
          </span>
          <span className="text-gray-400 text-sm">{formatDate(version.date_published)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div>
          {version.changelog && (
            <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-bold mb-3">Список изменений</h2>
              <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {filterVersionChangelog(version.changelog)}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {filesList.render()}
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          {metadata.render()}
        </div>
      </div>
    </div>
  )
}


