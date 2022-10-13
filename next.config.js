

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["res.cloudinary.com", "scontent.fsgn4-1.fna.fbcdn.net", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;