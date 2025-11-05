'use client'

export default function MobileDownloadButton() {
  const handleClick = () => {
    window.dispatchEvent(new Event('open-download-modal'))
  }

  return (
    <button
      onClick={handleClick}
      className="lg:hidden bg-gradient-to-r from-modrinth-green to-green-400 text-black px-4 py-3 rounded-full font-bold text-sm hover:from-green-400 hover:to-modrinth-green transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 max-[340px]:px-3"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span className="max-[340px]:hidden">Скачать</span>
    </button>
  )
}

