/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'arameshplus.ir'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig