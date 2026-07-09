/**
 * UserList.jsx - Componente de lista de usuarios
 *
 * Muestra la tabla completa con todos los usuarios registrados
 * en el sistema. Incluye la barra de búsqueda y el botón para
 * agregar nuevos usuarios.
 *
 * Si no hay usuarios que coincidan con la búsqueda, muestra
 * un mensaje informativo en lugar de la tabla vacía.
 *
 * Props:
 *   usuarios   -> arreglo con todos los usuarios del sistema
 *   onCrear    -> función que abre el formulario de creación
 *   onEditar   -> función que abre el formulario de edición
 *   onEliminar -> función que abre la confirmación de eliminación
 */
import { useState } from 'react'
import SearchBar from './SearchBar'
import UserCard from './UserCard'

function UserList({ usuarios, onCrear, onEditar, onEliminar }) {
  // Estado local para el texto de búsqueda
  const [busqueda, setBusqueda] = useState('')

  // Filtramos los usuarios según el texto ingresado en la búsqueda
  // La búsqueda funciona sobre nombres, apellidos y cédula
  const usuariosFiltrados = usuarios.filter(u => {
    const termino = busqueda.toLowerCase()
    return (
      u.nombres.toLowerCase().includes(termino) ||
      u.apellidos.toLowerCase().includes(termino) ||
      u.cedula.includes(termino)
    )
  })

  return (
    <div className="card">
      {/* Barra de herramientas: búsqueda y botón de agregar */}
      <div className="barra-herramientas">
        <SearchBar
          valor={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar por nombre o cédula..."
        />
        <button className="btn-primario" onClick={onCrear}>
          ➕ Nuevo usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div style={{ overflowX: 'auto' }}>
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres y Apellidos</th>
              <th>Cédula</th>
              <th>Correo electrónico</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length === 0 ? (
              // Mensaje cuando no hay resultados para mostrar
              <tr>
                <td colSpan="6" className="tabla-vacia">
                  {busqueda
                    ? `No se encontraron usuarios con "${busqueda}"`
                    : 'No hay usuarios registrados en el sistema.'}
                </td>
              </tr>
            ) : (
              // Renderizamos una fila (UserCard) por cada usuario filtrado
              usuariosFiltrados.map(usuario => (
                <UserCard
                  key={usuario.id}
                  usuario={usuario}
                  onEditar={onEditar}
                  onEliminar={onEliminar}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Contador de resultados visibles */}
      <p className="contador-resultado">
        Mostrando {usuariosFiltrados.length} de {usuarios.length} usuario(s)
      </p>
    </div>
  )
}

export default UserList
