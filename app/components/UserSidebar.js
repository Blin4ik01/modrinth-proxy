import Link from 'next/link'

export default function UserSidebar({ organizations = [], badges = [], debug = false }) {
  return (
    <div className="space-y-4">
      {debug && (
        <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
          <h3 className="text-sm font-bold text-yellow-400 mb-2">Debug Info</h3>
          <p className="text-xs text-yellow-300">Organizations: {organizations.length}</p>
          <pre className="text-xs text-yellow-300 mt-2 overflow-auto">
            {JSON.stringify(organizations, null, 2)}
          </pre>
        </div>
      )}
      
      {organizations.length > 0 && (
        <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Организации
          </h3>
          <div className="flex flex-wrap gap-2">
            {organizations.map((org, idx) => (
              <Link
                key={org.id || org.name || idx}
                href={`/organization/${org.id || org.name}`}
                className="group relative"
                title={org.name || org.title || org.id || 'Organization'}
              >
                {org.icon_url ? (
                  <img 
                    src={org.icon_url} 
                    alt={`Icon for ${org.name || org.title || 'Organization'}`}
                    className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                    {(org.name || org.title || org.id || '?').charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {badges.length > 0 && (
        <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Значки
          </h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center"
                title={badge.name || 'Badge'}
              >
                {badge.icon ? (
                  <div className="w-8 h-8 text-white">
                    {badge.icon}
                  </div>
                ) : (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Информация
        </h3>
        <div className="space-y-2 text-xs text-gray-400">
          <p>Профиль создан на основе данных Modrinth API</p>
        </div>
      </div>
    </div>
  )
}
