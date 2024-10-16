import path from "path";
import { VitePWA } from 'vite-plugin-pwa';

export default {
  build: {
    outDir: path.join(__dirname, "../docs"),
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'RubyJS-Vite | Docs',
        short_name: 'RubyJS-Vite',
        description: 'Documentation for RubyJS-Vite, a tool that transpiles Ruby syntax into JavaScript.',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/rjsv-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/rjsv-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
};
