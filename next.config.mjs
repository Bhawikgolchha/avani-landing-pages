/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/prototype-1',
        destination: '/',
        permanent: false,
      },
      {
        source: '/prototype-2',
        destination: '/',
        permanent: false,
      },
      {
        source: '/hub',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
