import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // 로컬 개발(dev) 시에는 루트('/'), 배포 빌드(build) 시에는 GitHub 저장소 경로 적용
  base: command === "build" ? "/Limyeonsun_Portfolio_web/" : "/",
  plugins: [react()],
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-v8.js`,
        chunkFileNames: `assets/[name]-[hash]-v8.js`,
        assetFileNames: `assets/[name]-[hash]-v8.[ext]`,
      },
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    host: true,
  },
}));
