/**
 * Alert.jsx - Componente de alertas y notificaciones
 *
 * Muestra mensajes de respuesta del sistema al usuario en la
 * esquina superior derecha de la pantalla.
 *
 * Tipos disponibles:
 *   "exito"      -> fondo verde, para operaciones exitosas
 *   "error"      -> fondo rojo, para errores del sistema
 *   "info"       -> fondo azul, para información general
 *
 * Props:
 *   tipo    -> tipo de alerta (ver lista arriba)
 *   mensaje -> texto que se mostrará al usuario
 *   visible -> booleano que controla si la alerta se muestra o no
 */
function Alert({ tipo = 'info', mensaje, visible }) {
  // Si no hay que mostrarla, no renderizamos nada
  if (!visible || !mensaje) return null

  // Definimos el ícono y la clase CSS según el tipo de alerta
  const configuracion = {
    exito: { icono: '✅', clase: 'alerta-exito' },
    error: { icono: '❌', clase: 'alerta-error' },
    info:  { icono: 'ℹ️',  clase: 'alerta-info'  }
  }

  // Si el tipo no es válido usamos la configuración de "info" por defecto
  const { icono, clase } = configuracion[tipo] || configuracion.info

  return (
    <div className={`alerta ${clase}`}>
      <span className="alerta-icono">{icono}</span>
      <span>{mensaje}</span>
    </div>
  )
}

export default Alert
