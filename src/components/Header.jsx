/**
 * Header.jsx - Componente de encabezado superior
 *
 * Muestra la barra de navegación superior con el logo y nombre
 * de Tecnoquia S.A.S. Cuando hay un usuario con sesión activa,
 * también muestra su nombre y el botón para cerrar sesión.
 *
 * Props:
 *   usuarioActivo  -> objeto con los datos del usuario logueado
 *   onCerrarSesion -> función que se ejecuta al hacer clic en "Cerrar sesión"
 */
function Header({ usuarioActivo, onCerrarSesion }) {
  return (
    <header className="header">
      {/* Sección izquierda: logo e identidad de la empresa */}
      <div className="header-marca">
        <div className="header-logo">T</div>
        <div>
          <h1 className="header-titulo">Tecnoquia S.A.S.</h1>
          <p className="header-subtitulo">Sistema de Gestión de Usuarios</p>
        </div>
      </div>

      {/* Sección derecha: solo se muestra si hay una sesión activa */}
      {usuarioActivo && (
        <div className="header-usuario">
          <span className="header-bienvenida">
            Hola, <strong>{usuarioActivo.nombres}</strong>
          </span>
          <button className="btn-cerrar-sesion" onClick={onCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
