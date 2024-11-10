import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import ngrokIntegration from "./astro-ngrok";
import cloudflare from "@astrojs/cloudflare"

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
  ],
  output: "server",
  adapter: cloudflare(),
});
