import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import * as path from "path";
const reactSvgPlugin = require("vite-plugin-react-svg");
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000, // Please keep it 5000
  },
  build: {
    target: ["es2020"],
  },
  plugins: [
    reactSvgPlugin({
      defaultExport: "component",

      // Boolean flag to enable/disable SVGO
      svgo: true,
      overlay: false,
      //hmr: { overlay: false } ,
    }),

    reactRefresh(),
  ],
  define: {
    "process.env.STAGE_API_URL": JSON.stringify(process.env.STAGE_API_URL),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
