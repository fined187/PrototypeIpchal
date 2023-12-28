/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: "Access-Control-Allow-Origin", value: "localhost:3000"
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://www.juso.go.kr/:path*',
      }
    ];
  }
}

module.exports = nextConfig
