'use client'

import { useEffect } from 'react'

export default function GalleryModal({ image, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  if (!image) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <img
        src={image.raw_url}
        alt={image.title || 'Gallery image'}
        className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-2 opacity-60 hover:opacity-100 transition-all duration-200">
        
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 text-white"
          aria-label="Закрыть"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414" clipRule="evenodd" />
          </svg>
        </button>

        <a
          href={image.raw_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 text-white"
          aria-label="Открыть в новой вкладке"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
          </svg>
        </a>

        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 text-white"
            aria-label="Предыдущее изображение"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
              <path d="m12 19-7-7 7-7M19 12H5" />
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 text-white"
            aria-label="Следующее изображение"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

