// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  build: {
    assets: '_assets',
  },

  vite: {
    plugins: [tailwindcss(), svgr(), basicSsl()],
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
})
