import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Prefer `frontend/.env` for standalone frontend runs and Vercel deployments.
  envDir: __dirname,
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    // Vercel deploy support (SSR/server functions) via Nitro
    nitro({ preset: "vercel" }),
    // React plugin must come after tanstackStart()
    viteReact(),
    tailwindcss(),
  ],
});
