import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'pinia'],
          antd: ['ant-design-vue', '@ant-design/icons-vue', 'dayjs'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
