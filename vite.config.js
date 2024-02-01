import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'http://localhost:7000/', // Substitua 'seu-novo-host' pelo host desejado
  },
  
})
