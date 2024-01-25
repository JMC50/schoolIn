import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server:{
    port: 5050,
    strictPort: true,
    proxy:{
      "/weather": {
        target: "https://api.openweathermap.org/data/2.5/weather?q=ansan&appid=1eb1d18602c0e2dde562cdc2005a4495&units=metric",
        changeOrigin: true,
        secure: true,
        rewrite(p){
          return p.replace(/^\/weather/, '');
        }
      },
      "/server": {
        // target: "http://localhost:3000",
        target: "http://ansaninserver.kro.kr:3000",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/server/, ''),
      }
    }
  }
})