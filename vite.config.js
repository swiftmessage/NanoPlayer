import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'NanoPlayer',
      formats: ['es', 'umd'],
      fileName: format => `nanoplayer.${format}.js`
    }
  }
})
