/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://business.juso.go.kr/:path*',
      }
    ];
  }
}

module.exports = nextConfig
