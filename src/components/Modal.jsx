/**
 * Modal.jsx - Componente de ventana emergente (modal)
 *
 * Muestra un cuadro de diálogo encima del contenido de la página.
 * Se usa para mostrar formularios de creación/edición y para
 * pedir confirmación antes de eliminar un usuario.
 *
 * Al hacer clic en el fondo oscuro o en el botón X, el modal se cierra.
 * También se cierra al presionar la tecla Escape.
 *
 * Props:
 *   visible   -> booleano que controla si el modal está abierto
 *   titulo    -> texto del encabezado del modal
 *   onCerrar  -> función que se ejecuta al cerrar el modal
 *   children  -> contenido que se muestra dentro del modal
 */
import { useEffect } from 'react'

function Modal({ visible, titulo, onCerrar, children }) {
  // Agregamos un listener para cerrar el modal con la tecla Escape
  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key === 'Escape' && visible) onCerrar()
    }
    document.addEventListener('keydown', manejarTecla)
    // Limpiamos el listener cuando el componente se desmonta o cambia
    return () => document.removeEventListener('keydown', manejarTecla)
  }, [visible, onCerrar])

  // Si no está visible no renderizamos nada
  if (!visible) return null

  return (
    // Fondo oscuro semitransparente que cubre toda la pantalla
    <div
      className="modal-fondo"
      onClick={(e) => {
        // Cerramos si se hace clic en el fondo (no en el contenido)
        if (e.target === e.currentTarget) onCerrar()
      }}
    >
      <div className="modal-contenido">
        {/* Encabezado del modal con título y botón de cierre */}
        <div className="modal-cabecera">
          <h3>{titulo}</h3>
          <button className="modal-cerrar" onClick={onCerrar} title="Cerrar">
            ✕
          </button>
        </div>

        {/* Cuerpo del modal: aquí van el formulario o el mensaje */}
        <div className="modal-cuerpo">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
