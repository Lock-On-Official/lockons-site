import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera em .next/standalone um servidor enxuto (só o necessário do node_modules),
  // usado pela imagem Docker do servidor próprio. A Vercel ignora esta opção.
  output: "standalone",
  // Não anuncia o framework no cabeçalho HTTP.
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
