/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Images
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },

  // Headers anti-cache agressifs
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },

  // Webpack config pour forcer Next.js
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/vite.config.*',
          '**/src/main.*',
        ],
      }
    }
    return config
  },

  // Config expérimentale (ex. : import optimisé)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Configuration stricte
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
