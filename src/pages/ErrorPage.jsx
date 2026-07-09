/**
 * ErrorPage.jsx - Página de error
 *
 * Se muestra cuando el usuario intenta acceder a una ruta que
 * no existe en la aplicación (error 404) o cuando no tiene
 * permisos para ver cierto contenido (error 403).
 *
 * Incluye un botón para regresar a la página de inicio de sesión.
 *
 * Props:
 *   codigoError -> número del error (404 o 403)
 *   mensaje     -> descripción del problema para mostrar al usuario
 */
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

function ErrorPage({ codigoError = 404, mensaje = 'La página no fue encontrada.' }) {
  const navegar = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main className="error-pagina" style={{ flex: 1 }}>
        {/* Código de error grande y visible */}
        <div className="error-codigo">{codigoError}</div>

        <h2 className="error-titulo">
          {codigoError === 404 ? 'Página no encontrada' : 'Acceso denegado'}
        </h2>

        <p className="error-mensaje">{mensaje}</p>

        {/* Botón para regresar al inicio */}
        <button
          className="error-btn"
          onClick={() => navegar('/login')}
        >
          ← Volver al inicio
        </button>
      </main>
      <Footer />
    </div>
  )
}

export default ErrorPage
