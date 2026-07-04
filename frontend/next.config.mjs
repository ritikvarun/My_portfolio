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
};

export default nextConfig;
