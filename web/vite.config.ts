import { defineConfig } from "vite";
import suidPlugin from "@suid/vite-plugin";
import solidPlugin from "vite-plugin-solid";
import SVGInjectPlugin from "vite-plugin-svg-inject";

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin(), SVGInjectPlugin()],
  server: {
    host: "0.0.0.0",
    port: 8081,
  },
  build: {
    target: "esnext",
  },
});
