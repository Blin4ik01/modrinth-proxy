const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest.json$/],
  additionalManifestEntries: [],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.modrinth.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = withPWA(nextConfig)
