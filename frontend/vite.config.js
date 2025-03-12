import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.OPEN_AI_KEY": JSON.stringify(env.OPEN_AI_KEY),
      "process.env.GEMINI_AI_KEY": JSON.stringify(env.GEMINI_AI_KEY),
      "process.env.DomainUrl": JSON.stringify(env.DomainUrl),
    },
    plugins: [tailwindcss(), react()],
  };
});
