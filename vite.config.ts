// vite.config.ts

import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': {
      VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY
    }
  },
  // other Vite configurations...
});