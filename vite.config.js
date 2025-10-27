//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

//export default defineConfig({
 // plugins: [react()],
 // base: '/',
//})

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-vite-gh-pages/' ,
});
