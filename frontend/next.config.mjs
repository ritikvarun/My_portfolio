/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'my-portfolio-backend-q5ig.onrender.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/RItik.pdf',
        destination: '/Ritik.pdf',
      },
      {
        source: '/ritik.pdf',
        destination: '/Ritik.pdf',
      },
      {
        source: '/resume.pdf',
        destination: '/Ritik.pdf',
      },
      {
        source: '/cv.pdf',
        destination: '/Ritik.pdf',
      },
    ];
  },
};

export default nextConfig;

