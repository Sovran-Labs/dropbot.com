/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.houdiniswap.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
