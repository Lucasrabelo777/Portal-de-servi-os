/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Sem turbopack para evitar problemas
  }
}

module.exports = nextConfig