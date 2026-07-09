/**
 * NavBar.jsx - Componente de barra de navegación
 *
 * Muestra los elementos de navegación del sistema como una barra
 * de botones/tabs dentro del panel de administración.
 * El ítem activo se resalta visualmente con un color diferente.
 *
 * Props:
 *   items     -> arreglo de objetos { id, etiqueta, icono }
 *   activo    -> id del ítem que está seleccionado actualmente
 *   onCambiar -> función que se llama cuando el usuario hace clic en un ítem
 */
function NavBar({ items, activo, onCambiar }) {
  return (
    <nav style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onCambiar(item.id)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '14px',
            fontWeight: activo === item.id ? '600' : '400',
            background: activo === item.id ? 'var(--azul)' : 'var(--gris-claro)',
            color: activo === item.id ? 'var(--blanco)' : 'var(--gris-oscuro)',
            transition: 'all 0.2s'
          }}
        >
          {item.icono} {item.etiqueta}
        </button>
      ))}
    </nav>
  )
}

export default NavBar
