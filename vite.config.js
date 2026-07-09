import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * vite.config.js - Configuración de Vite
 * Vite es la herramienta de construcción que usamos para
 * desarrollar y empaquetar el proyecto React de forma rápida.
 */
export default defineConfig({
  plugins: [react()]
})
