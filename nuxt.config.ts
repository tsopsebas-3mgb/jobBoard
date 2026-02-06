import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  alias: {
    '@': resolve(__dirname, './'),
  },
  modules: [],
  css: ['@/app/assets/css/main.css'],
});
