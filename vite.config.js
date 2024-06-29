import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { obfuscator } from "rollup-obfuscator";

export default defineConfig({
  plugins: [vue(), obfuscator()],
});
