/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `https://b9zm4cxhn1.execute-api.us-west-2.amazonaws.com/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
