import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Não anuncia o framework no cabeçalho HTTP.
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
