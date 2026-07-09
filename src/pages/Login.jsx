/**
 * Login.jsx - Página de inicio de sesión
 *
 * Esta es la primera vista que ve el usuario al ingresar al sistema.
 * Presenta un formulario con los campos de usuario y contraseña,
 * valida que no estén vacíos, y verifica las credenciales contra
 * el servicio de usuarios.
 *
 * Si las credenciales son correctas, guarda los datos del usuario
 * en localStorage y redirige al panel de administración.
 * Si son incorrectas, muestra un mensaje de error.
 *
 * Credenciales de prueba: admin / admin123
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { verificarCredenciales } from '../services/usuarioService'

function Login() {
  // Estado para los campos del formulario
  const [usuario,  setUsuario]  = useState('')
  const [password, setPassword] = useState('')

  // Estado para los errores de validación de cada campo
  const [errores, setErrores] = useState({})

  // Mensaje de error general (credenciales incorrectas)
  const [errorGeneral, setErrorGeneral] = useState('')

  // Hook de React Router para redirigir después del login
  const navegar = useNavigate()

  // Maneja el envío del formulario de login
  const manejarLogin = (e) => {
    e.preventDefault()

    // Limpiamos los errores anteriores antes de validar
    setErrores({})
    setErrorGeneral('')

    const nuevosErrores = {}

    // Validación: el campo de usuario no puede estar vacío
    if (!usuario.trim()) {
      nuevosErrores.usuario = 'Ingresa tu nombre de usuario.'
    }

    // Validación: el campo de contraseña no puede estar vacío
    if (!password) {
      nuevosErrores.password = 'Ingresa tu contraseña.'
    }

    // Si hay errores de validación los mostramos y no continuamos
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    // Verificamos las credenciales contra el servicio de usuarios
    const usuarioEncontrado = verificarCredenciales(usuario.trim(), password)

    if (usuarioEncontrado) {
      // Guardamos los datos del usuario en localStorage para mantener la sesión
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado))
      // Redirigimos al panel de administración
      navegar('/dashboard')
    } else {
      // Las credenciales no son correctas
      setErrorGeneral('Usuario o contraseña incorrectos. Intenta de nuevo.')
    }
  }

  return (
    <div className="login-pagina">
      {/* Encabezado sin usuario activo (sesión no iniciada) */}
      <Header />

      <main className="login-contenedor">
        <div className="login-card">
          {/* Logo circular con inicial de la empresa */}
          <div className="login-logo">T</div>

          <h2 className="login-titulo">Iniciar sesión</h2>
          <p className="login-subtitulo">
            Sistema de Gestión de Usuarios — Tecnoquia S.A.S.
          </p>

          {/* Mensaje de error general (credenciales incorrectas) */}
          {errorGeneral && (
            <div className="login-error">{errorGeneral}</div>
          )}

          <form className="login-form" onSubmit={manejarLogin} noValidate>
            {/* Campo: nombre de usuario */}
            <label>
              Usuario
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className={errores.usuario ? 'campo-error' : ''}
                placeholder="Ingresa tu usuario"
                autoComplete="username"
                autoFocus
              />
              {errores.usuario && (
                <span className="mensaje-error">{errores.usuario}</span>
              )}
            </label>

            {/* Campo: contraseña */}
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errores.password ? 'campo-error' : ''}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
              {errores.password && (
                <span className="mensaje-error">{errores.password}</span>
              )}
            </label>

            {/* Botón de envío */}
            <button type="submit" className="login-btn">
              Ingresar al sistema
            </button>
          </form>

          {/* Información de credenciales de prueba */}
          <p className="login-info">
            Credenciales de prueba: <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
