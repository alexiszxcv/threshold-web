/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Cloud Run deployment
  output: "standalone",

  // Environment variables for build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://threshold-1054224705034.us-east4.run.app",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "https://threshold-1054224705034.us-east4.run.app",
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Images configuration for Cloud Run
  images: {
    unoptimized: true,
  },

  // Headers for CORS and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ]
  },

  // Redirects for Cloud Run health checks
  async redirects() {
    return [
      {
        source: "/health",
        destination: "/api/health",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
