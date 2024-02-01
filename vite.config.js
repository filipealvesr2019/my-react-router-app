import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Substitua 'localhost' pelo host desejado
    port: 7000, // Substitua pelo número da porta desejado
  },
  
})
