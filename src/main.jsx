/**
 * main.jsx - Punto de entrada de la aplicación React
 *
 * Este es el primer archivo que ejecuta React cuando carga el proyecto.
 * Su única función es conectar el componente raíz <App /> con el
 * elemento <div id="root"> que está en el archivo index.html.
 *
 * Proyecto: Sistema de Gestión de Usuarios - Tecnoquia S.A.S.
 * Evidencia: GA7-220501096-AA4-EV03
 * Autores: Jhon Álvaro Mateus Saganome
 *          Tania Mildred Arciniegas Yáñez
 *          Adrian Camilo Marín Isaza
 *          Blanca Azucena González Clavijo
 * Ficha: 3134707 - Grupo 6
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

// Creamos la raíz de React y montamos el componente principal
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
