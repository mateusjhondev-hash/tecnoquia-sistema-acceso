/**
 * SearchBar.jsx - Componente de barra de búsqueda
 *
 * Muestra un campo de texto con ícono de búsqueda que permite
 * al administrador filtrar la lista de usuarios en tiempo real
 * por nombre, apellido o número de cédula.
 *
 * Props:
 *   valor      -> texto actual del campo de búsqueda
 *   onChange   -> función que se llama cada vez que el usuario escribe
 *   placeholder -> texto de ayuda que se muestra cuando el campo está vacío
 */
function SearchBar({ valor, onChange, placeholder = 'Buscar usuario...' }) {
  return (
    <div className="searchbar">
      {/* Ícono de lupa */}
      <span className="searchbar-icono">🔍</span>

      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        // El aria-label es importante para la accesibilidad del campo
        aria-label="Buscar usuarios"
      />

      {/* Si hay texto escrito, mostramos un botón para limpiar la búsqueda */}
      {valor && (
        <button
          onClick={() => onChange('')}
          title="Limpiar búsqueda"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0 12px', color: 'var(--gris)', fontSize: '16px'
          }}
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
