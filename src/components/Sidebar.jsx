/**
 * Sidebar.jsx - Componente de menú lateral
 *
 * Muestra el panel de navegación lateral del área de administración.
 * Cada ítem del menú representa un módulo del sistema.
 * El ítem activo se resalta con un borde azul a la izquierda.
 *
 * Props:
 *   menuItems  -> arreglo de objetos { id, etiqueta, icono }
 *   itemActivo -> id del módulo que está activo en este momento
 *   onSeleccionar -> función que cambia el módulo visible al hacer clic
 */
function Sidebar({ menuItems, itemActivo, onSeleccionar }) {
  return (
    <aside className="sidebar">
      {/* Título de la sección del menú */}
      <p className="sidebar-titulo">Módulos del sistema</p>

      {/* Renderizamos cada ítem del menú como un botón de navegación */}
      {menuItems.map(item => (
        <button
          key={item.id}
          className={`sidebar-item ${itemActivo === item.id ? 'activo' : ''}`}
          onClick={() => onSeleccionar(item.id)}
          style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
        >
          <span className="sidebar-icono">{item.icono}</span>
          {item.etiqueta}
        </button>
      ))}
    </aside>
  )
}

export default Sidebar
