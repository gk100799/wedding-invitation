/** @type {import('next').NextConfig} */
// GH Pages serves project pages at /<repo>/. CI sets NEXT_PUBLIC_BASE_PATH=/wedding-invitation.
// Locally NEXT_PUBLIC_BASE_PATH is unset → basePath = '' (root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // Static export can't run the optimization endpoint at request time.
    unoptimized: true,
  },
};

export default nextConfig;
