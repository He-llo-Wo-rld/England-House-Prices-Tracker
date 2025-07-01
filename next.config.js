/** @type {import('next').NextConfig} */
const nextConfig = {
  // Completely disable ESLint and TypeScript checking during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable experimental features that might trigger linting
  swcMinify: true,
};

module.exports = nextConfig;
