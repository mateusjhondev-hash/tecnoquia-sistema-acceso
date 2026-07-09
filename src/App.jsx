/**
 * App.jsx - Componente raíz de la aplicación
 *
 * Este componente es el encargado de organizar el sistema de
 * enrutamiento (navegación entre páginas) usando React Router v6.
 * Define todas las rutas disponibles en la aplicación:
 *
 *   /          -> Redirige automáticamente al login
 *   /login     -> Página de inicio de sesión
 *   /dashboard -> Panel de administración (módulo de usuarios)
 *   *          -> Página de error 404 para rutas no encontradas
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    // BrowserRouter habilita la navegación sin recargar el navegador
    <Router>
      <Routes>
        {/* La raíz "/" redirige directamente al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Página de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Panel de administración con el módulo de usuarios */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Cualquier ruta que no existe carga la página de error 404 */}
        <Route
          path="*"
          element={
            <ErrorPage
              codigoError={404}
              mensaje="La página que buscas no existe o fue movida."
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
