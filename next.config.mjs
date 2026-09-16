/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
{
        source: '/moving--storage',
        destination: '/',
        permanent: true,
      },
      {
        source: '/roofer',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tmp/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
