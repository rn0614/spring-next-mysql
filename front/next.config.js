/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'localhost']
  },
}

module.exports = nextConfig
