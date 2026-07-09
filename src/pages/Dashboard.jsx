/**
 * Dashboard.jsx - Panel de administración
 *
 * Esta es la página principal del área restringida del sistema.
 * Contiene el módulo de gestión de usuarios con todas las
 * operaciones CRUD (Crear, Consultar, Actualizar, Eliminar).
 *
 * Si el usuario intenta acceder sin haber iniciado sesión,
 * es redirigido automáticamente al login.
 *
 * Maneja el estado global del módulo de usuarios:
 *   - Lista de usuarios
 *   - Modal del formulario (crear/editar)
 *   - Modal de confirmación de eliminación
 *   - Alertas de resultado de operaciones
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import Modal from '../components/Modal'
import UserList from '../components/usuarios/UserList'
import UserForm from '../components/usuarios/UserForm'
import * as usuarioService from '../services/usuarioService'

// Configuración de los ítems del menú lateral
const MENU_ITEMS = [
  { id: 'usuarios', etiqueta: 'Usuarios',    icono: '👥' },
  { id: 'perfil',   etiqueta: 'Mi perfil',   icono: '👤' },
  { id: 'ayuda',    etiqueta: 'Ayuda',        icono: '❓' }
]

function Dashboard() {
  const navegar = useNavigate()

  // Verificamos si hay un usuario con sesión activa al cargar el componente
  const usuarioGuardado = localStorage.getItem('usuarioActivo')
  const usuarioActivo = usuarioGuardado ? JSON.parse(usuarioGuardado) : null

  // Si no hay sesión activa, redirigimos al login inmediatamente
  useEffect(() => {
    if (!usuarioActivo) {
      navegar('/login')
    }
  }, [])

  // ── Estado del módulo ──────────────────────────────────────────────────────

  // Lista de todos los usuarios del sistema
  const [usuarios, setUsuarios] = useState(usuarioService.obtenerTodos())

  // Módulo activo en el sidebar (por defecto: usuarios)
  const [moduloActivo, setModuloActivo] = useState('usuarios')

  // Control del modal del formulario de usuarios
  const [modalForm, setModalForm] = useState({
    visible: false,
    usuarioEditar: null  // null = modo crear, objeto = modo editar
  })

  // Control del modal de confirmación de eliminación
  const [modalConfirmar, setModalConfirmar] = useState({
    visible: false,
    usuario: null  // usuario que se va a eliminar
  })

  // Estado de la alerta de notificaciones
  const [alerta, setAlerta] = useState({
    visible: false,
    tipo: 'info',
    mensaje: ''
  })

  // ── Función auxiliar para mostrar alertas ────────────────────────────────
  const mostrarAlerta = (tipo, mensaje) => {
    setAlerta({ visible: true, tipo, mensaje })
    // La alerta desaparece automáticamente después de 3 segundos
    setTimeout(() => {
      setAlerta(prev => ({ ...prev, visible: false }))
    }, 3000)
  }

  // ── Manejadores de cierre de sesión ─────────────────────────────────────
  const manejarCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo')
    navegar('/login')
  }

  // ── Manejadores del módulo de usuarios ──────────────────────────────────

  // Abre el formulario en modo creación (sin usuario precargado)
  const manejarCrear = () => {
    setModalForm({ visible: true, usuarioEditar: null })
  }

  // Abre el formulario en modo edición con los datos del usuario seleccionado
  const manejarEditar = (usuario) => {
    setModalForm({ visible: true, usuarioEditar: usuario })
  }

  // Abre el modal de confirmación para eliminar un usuario
  const manejarEliminar = (usuario) => {
    setModalConfirmar({ visible: true, usuario })
  }

  // Cierra el modal del formulario sin guardar cambios
  const cerrarFormulario = () => {
    setModalForm({ visible: false, usuarioEditar: null })
  }

  // Guarda un usuario nuevo o actualiza uno existente
  const manejarGuardar = (datos) => {
    if (modalForm.usuarioEditar) {
      // Modo edición: actualizamos el usuario existente
      const actualizado = usuarioService.actualizar(modalForm.usuarioEditar.id, datos)
      if (actualizado) {
        setUsuarios(usuarioService.obtenerTodos())
        mostrarAlerta('exito', '✅ Usuario actualizado correctamente.')
      } else {
        mostrarAlerta('error', '❌ No se pudo actualizar el usuario.')
      }
    } else {
      // Modo creación: creamos un nuevo usuario
      usuarioService.crear(datos)
      setUsuarios(usuarioService.obtenerTodos())
      mostrarAlerta('exito', '✅ Usuario registrado exitosamente.')
    }
    cerrarFormulario()
  }

  // Confirma y ejecuta la eliminación del usuario seleccionado
  const manejarConfirmarEliminar = () => {
    const eliminado = usuarioService.eliminar(modalConfirmar.usuario.id)
    if (eliminado) {
      setUsuarios(usuarioService.obtenerTodos())
      mostrarAlerta('exito', `✅ Usuario "${modalConfirmar.usuario.nombres}" eliminado.`)
    } else {
      mostrarAlerta('error', '❌ No se pudo eliminar el usuario.')
    }
    setModalConfirmar({ visible: false, usuario: null })
  }

  // Si no hay sesión, no renderizamos nada (el useEffect ya redirige)
  if (!usuarioActivo) return null

  // Determinamos el título del módulo activo para el área de contenido
  const tituloModulo = MENU_ITEMS.find(m => m.id === moduloActivo)?.etiqueta || ''

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Encabezado con datos del usuario y botón de cierre de sesión */}
      <Header
        usuarioActivo={usuarioActivo}
        onCerrarSesion={manejarCerrarSesion}
      />

      {/* Alerta flotante de notificaciones */}
      <Alert
        visible={alerta.visible}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
      />

      {/* Contenido principal: sidebar + área de módulos */}
      <div className="layout" style={{ flex: 1 }}>
        {/* Menú lateral con los módulos disponibles */}
        <Sidebar
          menuItems={MENU_ITEMS}
          itemActivo={moduloActivo}
          onSeleccionar={setModuloActivo}
        />

        {/* Área de contenido del módulo seleccionado */}
        <main className="contenido-principal">
          <h2 className="pagina-titulo">{tituloModulo}</h2>

          {/* ── Módulo de Usuarios ─────────────────────────────────── */}
          {moduloActivo === 'usuarios' && (
            <>
              <p className="pagina-descripcion">
                Administra los usuarios registrados en el sistema.
                Puedes crear, consultar, editar y eliminar usuarios.
              </p>
              <UserList
                usuarios={usuarios}
                onCrear={manejarCrear}
                onEditar={manejarEditar}
                onEliminar={manejarEliminar}
              />
            </>
          )}

          {/* ── Módulo Mi Perfil ───────────────────────────────────── */}
          {moduloActivo === 'perfil' && (
            <div className="card">
              <h3 style={{ marginBottom: '16px', color: 'var(--navy)' }}>
                Información del usuario activo
              </h3>
              <p><strong>Nombre:</strong> {usuarioActivo.nombres} {usuarioActivo.apellidos}</p>
              <p style={{ marginTop: '8px' }}>
                <strong>Usuario:</strong> {usuarioActivo.usuario}
              </p>
              <p style={{ marginTop: '16px', color: 'var(--gris)', fontSize: '13px' }}>
                Para modificar tu información, solicítalo al administrador del sistema.
              </p>
            </div>
          )}

          {/* ── Módulo Ayuda ───────────────────────────────────────── */}
          {moduloActivo === 'ayuda' && (
            <div className="card">
              <h3 style={{ marginBottom: '16px', color: 'var(--navy)' }}>
                Guía de uso del sistema
              </h3>
              <p style={{ marginBottom: '12px' }}>
                Este sistema permite gestionar los usuarios de Tecnoquia S.A.S.
                Las operaciones disponibles son:
              </p>
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li><strong>Crear usuario:</strong> clic en el botón "Nuevo usuario".</li>
                <li><strong>Buscar usuario:</strong> escribe en la barra de búsqueda.</li>
                <li><strong>Editar usuario:</strong> clic en el botón "Editar" de la fila.</li>
                <li><strong>Eliminar usuario:</strong> clic en "Eliminar" y confirma.</li>
              </ul>
              <p style={{ marginTop: '16px', color: 'var(--gris)', fontSize: '13px' }}>
                Proyecto formativo ADSO — Ficha 3134707 — Grupo 6
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* ── Modal: Formulario de creación/edición ─────────────────────── */}
      <Modal
        visible={modalForm.visible}
        titulo={modalForm.usuarioEditar ? '✏️ Editar usuario' : '➕ Nuevo usuario'}
        onCerrar={cerrarFormulario}
      >
        <UserForm
          usuarioEditar={modalForm.usuarioEditar}
          onGuardar={manejarGuardar}
          onCancelar={cerrarFormulario}
        />
      </Modal>

      {/* ── Modal: Confirmación de eliminación ────────────────────────── */}
      <Modal
        visible={modalConfirmar.visible}
        titulo="🗑️ Confirmar eliminación"
        onCerrar={() => setModalConfirmar({ visible: false, usuario: null })}
      >
        {modalConfirmar.usuario && (
          <>
            <p style={{ marginBottom: '12px' }}>
              ¿Estás seguro de que deseas eliminar al usuario{'  '}
              <strong>{modalConfirmar.usuario.nombres} {modalConfirmar.usuario.apellidos}</strong>?
            </p>
            <p style={{ fontSize: '13px', color: 'var(--rojo)', marginBottom: '20px' }}>
              ⚠️ Esta acción no se puede deshacer.
            </p>
            <div className="modal-acciones" style={{ padding: 0 }}>
              <button
                className="btn-secundario"
                onClick={() => setModalConfirmar({ visible: false, usuario: null })}
              >
                Cancelar
              </button>
              <button className="btn-peligro" onClick={manejarConfirmarEliminar}>
                Sí, eliminar
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}

export default Dashboard
