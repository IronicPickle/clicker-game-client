import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),

      "@config": path.resolve(__dirname, "./src/config"),
      "@api": path.resolve(__dirname, "./src/api"),

      "@utils": path.resolve(__dirname, "./src/lib/utils"),
      "@constants": path.resolve(__dirname, "./src/lib/constants"),
      "@ts": path.resolve(__dirname, "./src/lib/ts"),
      "@lib": path.resolve(__dirname, "./src/lib"),

      "@images": path.resolve(__dirname, "./images"),
      "@media": path.resolve(__dirname, "./media"),
      "@styles": path.resolve(__dirname, "./styles"),

      "@src": path.resolve(__dirname, "./src"),
    },
  },
});
