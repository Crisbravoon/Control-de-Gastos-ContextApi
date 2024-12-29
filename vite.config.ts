import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'types': path.resolve(__dirname, 'src/types'),
      'context': path.resolve(__dirname, 'src/context'),
      'helpers': path.resolve(__dirname, 'src/helpers'),
      'images': path.resolve(__dirname, 'src/images')
    }
  }
})