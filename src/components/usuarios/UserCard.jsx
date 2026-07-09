/**
 * UserCard.jsx - Fila de usuario en la tabla
 *
 * Representa visualmente los datos de un único usuario como
 * una fila dentro de la tabla de la lista de usuarios.
 * Incluye los botones de acción para editar y eliminar.
 *
 * Props:
 *   usuario    -> objeto con los datos del usuario a mostrar
 *   onEditar   -> función que se llama con el usuario al hacer clic en Editar
 *   onEliminar -> función que se llama con el usuario al hacer clic en Eliminar
 */
function UserCard({ usuario, onEditar, onEliminar }) {
  return (
    <tr>
      {/* ID del usuario resaltado con un badge azul */}
      <td>
        <span className="badge-id">#{usuario.id}</span>
      </td>

      {/* Nombre completo del usuario */}
      <td>
        <strong>{usuario.nombres}</strong><br />
        <span style={{ fontSize: '12px', color: 'var(--gris)' }}>
          {usuario.apellidos}
        </span>
      </td>

      {/* Número de cédula */}
      <td>{usuario.cedula}</td>

      {/* Correo electrónico */}
      <td style={{ fontSize: '13px' }}>{usuario.correo}</td>

      {/* Nombre de usuario del sistema */}
      <td>
        <code style={{
          background: 'var(--gris-claro)', padding: '2px 8px',
          borderRadius: '4px', fontSize: '13px'
        }}>
          {usuario.usuario}
        </code>
      </td>

      {/* Botones de acción: editar y eliminar */}
      <td>
        <div className="acciones-celda">
          <button
            className="btn-editar"
            onClick={() => onEditar(usuario)}
            title="Editar este usuario"
          >
            ✏️ Editar
          </button>
          <button
            className="btn-eliminar"
            onClick={() => onEliminar(usuario)}
            title="Eliminar este usuario"
          >
            🗑️ Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default UserCard
