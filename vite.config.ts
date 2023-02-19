import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/quizlet/',
    optimizeDeps: {
        exclude: [
            'firebase',
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
            'firebase/analytics',
            'firebase/storage',
            'firebase/compat'
        ],
    },
    plugins: [ react() ],
})
