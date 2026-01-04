import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Optional – default hi hai
        proxy: {
            '/api/zego-token': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            },
            '/api': {
                target: 'https://developer.bitmaxtest.com', //
                changeOrigin: true,
                secure: false,

            },
        },
    },
})