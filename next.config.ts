import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // ESLint в проект не добавлен намеренно (минимум зависимостей); типы проверяет TypeScript при сборке.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
