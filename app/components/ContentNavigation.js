'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ContentNavigation({ slug, contentType, versionsCount = 0, galleryCount = 0 }) {
  const pathname = usePathname()
  
  const isActive = (path) => {
    if (path === `/${contentType}/${slug}`) {
      return pathname === path
    }
    if (path === `/${contentType}/${slug}/versions`) {
      return pathname.startsWith(path) || pathname.includes(`/${contentType}/${slug}/version/`)
    }
    return pathname.startsWith(path)
  }
  
  const tabs = [
    { href: `/${contentType}/${slug}`, label: 'Описание' },
    galleryCount > 0 && { href: `/${contentType}/${slug}/gallery`, label: `Галерея (${galleryCount})` },
    { href: `/${contentType}/${slug}/changelog`, label: 'Изменения' },
    { href: `/${contentType}/${slug}/versions`, label: `Версии${versionsCount > 0 ? ` (${versionsCount})` : ''}` },
  ].filter(Boolean)
  
  return (
    <div className="overflow-x-auto mb-4 mobile-nav-spacing">
      <nav className="relative flex w-fit overflow-x-auto rounded-full bg-gray-800 p-1 text-sm font-bold">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`button-animation z-[1] flex flex-row items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              isActive(tab.href)
                ? 'bg-modrinth-green text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}


