/**
 * UserForm.jsx - Formulario de creación y edición de usuarios
 *
 * Este formulario funciona en dos modos:
 *   - Modo CREAR: los campos aparecen vacíos (cuando usuarioEditar es null)
 *   - Modo EDITAR: los campos se precargan con los datos del usuario
 *
 * Incluye las mismas validaciones que se definieron en la evidencia AA3-EV02:
 *   - Campos obligatorios: no pueden quedar vacíos
 *   - Nombres y apellidos: solo letras y espacios
 *   - Cédula: solo números, máximo 15 dígitos
 *   - Correo: formato válido usuario@dominio.com
 *   - Contraseña: mínimo 6 caracteres (obligatoria solo al crear)
 *
 * Props:
 *   usuarioEditar -> objeto con datos del usuario a editar, o null si es creación
 *   onGuardar     -> función que recibe los datos validados del formulario
 *   onCancelar    -> función que cierra el formulario sin guardar
 */
import { useState, useEffect } from 'react'

// Límites de longitud para cada campo (igual que en el módulo Hibernate)
const LIMITES = {
  nombres:   60,
  apellidos: 60,
  cedula:    15,
  correo:    100,
  usuario:   30,
  password:  50
}

function UserForm({ usuarioEditar, onGuardar, onCancelar }) {
  // Estado inicial del formulario con todos los campos vacíos
  const camposVacios = {
    nombres: '', apellidos: '', cedula: '',
    correo: '', usuario: '', password: ''
  }

  const [campos,  setCampos]  = useState(camposVacios)
  const [errores, setErrores] = useState({})

  // Cuando llega un usuario para editar, precargamos sus datos en el formulario
  useEffect(() => {
    if (usuarioEditar) {
      setCampos({
        nombres:   usuarioEditar.nombres,
        apellidos: usuarioEditar.apellidos,
        cedula:    usuarioEditar.cedula,
        correo:    usuarioEditar.correo,
        usuario:   usuarioEditar.usuario,
        password:  '' // La contraseña no se precarga por seguridad
      })
    } else {
      // Si no hay usuario para editar, limpiamos todos los campos
      setCampos(camposVacios)
    }
    setErrores({})
  }, [usuarioEditar])

  // Actualiza el valor de un campo y limpia su error al empezar a escribir
  const manejarCambio = (campo, valor) => {
    setCampos(prev => ({ ...prev, [campo]: valor }))
    if (errores[campo]) {
      setErrores(prev => ({ ...prev, [campo]: '' }))
    }
  }

  /**
   * Valida todos los campos del formulario.
   * Retorna un objeto con los mensajes de error encontrados.
   * Si el objeto está vacío, significa que todos los campos son válidos.
   */
  const validar = () => {
    const nuevosErrores = {}
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/
    const formatoCorreo = /^[\w._%+\-]+@[\w.\-]+\.[a-zA-Z]{2,}$/

    // Validación de Nombres
    if (!campos.nombres.trim()) {
      nuevosErrores.nombres = 'El nombre es obligatorio.'
    } else if (!soloLetras.test(campos.nombres.trim())) {
      nuevosErrores.nombres = 'Solo se permiten letras y espacios.'
    } else if (campos.nombres.length > LIMITES.nombres) {
      nuevosErrores.nombres = `Máximo ${LIMITES.nombres} caracteres.`
    }

    // Validación de Apellidos
    if (!campos.apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios.'
    } else if (!soloLetras.test(campos.apellidos.trim())) {
      nuevosErrores.apellidos = 'Solo se permiten letras y espacios.'
    } else if (campos.apellidos.length > LIMITES.apellidos) {
      nuevosErrores.apellidos = `Máximo ${LIMITES.apellidos} caracteres.`
    }

    // Validación de Cédula: solo dígitos numéricos
    if (!campos.cedula.trim()) {
      nuevosErrores.cedula = 'La cédula es obligatoria.'
    } else if (!/^[0-9]+$/.test(campos.cedula.trim())) {
      nuevosErrores.cedula = 'Solo se permiten dígitos numéricos.'
    } else if (campos.cedula.length > LIMITES.cedula) {
      nuevosErrores.cedula = `Máximo ${LIMITES.cedula} dígitos.`
    }

    // Validación de Correo electrónico
    if (!campos.correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.'
    } else if (!formatoCorreo.test(campos.correo.trim())) {
      nuevosErrores.correo = 'Formato inválido. Ejemplo: usuario@dominio.com'
    } else if (campos.correo.length > LIMITES.correo) {
      nuevosErrores.correo = `Máximo ${LIMITES.correo} caracteres.`
    }

    // Validación de Nombre de usuario
    if (!campos.usuario.trim()) {
      nuevosErrores.usuario = 'El nombre de usuario es obligatorio.'
    } else if (campos.usuario.length > LIMITES.usuario) {
      nuevosErrores.usuario = `Máximo ${LIMITES.usuario} caracteres.`
    }

    // Validación de Contraseña
    // En modo edición, si el campo está vacío se mantiene la contraseña anterior
    if (!usuarioEditar && !campos.password) {
      nuevosErrores.password = 'La contraseña es obligatoria.'
    } else if (campos.password && campos.password.length < 6) {
      nuevosErrores.password = 'Mínimo 6 caracteres.'
    } else if (campos.password && campos.password.length > LIMITES.password) {
      nuevosErrores.password = `Máximo ${LIMITES.password} caracteres.`
    }

    return nuevosErrores
  }

  // Maneja el envío del formulario: valida y llama a onGuardar si todo está bien
  const manejarEnvio = (e) => {
    e.preventDefault()
    const erroresEncontrados = validar()

    if (Object.keys(erroresEncontrados).length > 0) {
      // Hay errores: los mostramos y no guardamos
      setErrores(erroresEncontrados)
      return
    }

    // Todo está bien: enviamos los datos al componente padre
    onGuardar(campos)
  }

  const modoEdicion = Boolean(usuarioEditar)

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div className="formulario-grid">
        {/* Campo: Nombres */}
        <div className="campo-formulario">
          <label htmlFor="nombres">Nombres *</label>
          <input
            id="nombres"
            type="text"
            value={campos.nombres}
            onChange={(e) => manejarCambio('nombres', e.target.value)}
            className={errores.nombres ? 'campo-error' : ''}
            placeholder="Ej: Jhon Álvaro"
            maxLength={LIMITES.nombres}
          />
          {errores.nombres && <span className="mensaje-error">{errores.nombres}</span>}
        </div>

        {/* Campo: Apellidos */}
        <div className="campo-formulario">
          <label htmlFor="apellidos">Apellidos *</label>
          <input
            id="apellidos"
            type="text"
            value={campos.apellidos}
            onChange={(e) => manejarCambio('apellidos', e.target.value)}
            className={errores.apellidos ? 'campo-error' : ''}
            placeholder="Ej: Mateus Saganome"
            maxLength={LIMITES.apellidos}
          />
          {errores.apellidos && <span className="mensaje-error">{errores.apellidos}</span>}
        </div>

        {/* Campo: Cédula */}
        <div className="campo-formulario">
          <label htmlFor="cedula">Cédula *</label>
          <input
            id="cedula"
            type="text"
            value={campos.cedula}
            onChange={(e) => manejarCambio('cedula', e.target.value)}
            className={errores.cedula ? 'campo-error' : ''}
            placeholder="Solo números"
            maxLength={LIMITES.cedula}
          />
          {errores.cedula && <span className="mensaje-error">{errores.cedula}</span>}
        </div>

        {/* Campo: Correo electrónico */}
        <div className="campo-formulario">
          <label htmlFor="correo">Correo electrónico *</label>
          <input
            id="correo"
            type="email"
            value={campos.correo}
            onChange={(e) => manejarCambio('correo', e.target.value)}
            className={errores.correo ? 'campo-error' : ''}
            placeholder="usuario@dominio.com"
            maxLength={LIMITES.correo}
          />
          {errores.correo && <span className="mensaje-error">{errores.correo}</span>}
        </div>

        {/* Campo: Nombre de usuario */}
        <div className="campo-formulario">
          <label htmlFor="usuario">Nombre de usuario *</label>
          <input
            id="usuario"
            type="text"
            value={campos.usuario}
            onChange={(e) => manejarCambio('usuario', e.target.value)}
            className={errores.usuario ? 'campo-error' : ''}
            placeholder="Ej: jhonm"
            maxLength={LIMITES.usuario}
          />
          {errores.usuario && <span className="mensaje-error">{errores.usuario}</span>}
        </div>

        {/* Campo: Contraseña */}
        <div className="campo-formulario">
          <label htmlFor="password">
            Contraseña {modoEdicion ? '(dejar vacío para no cambiar)' : '*'}
          </label>
          <input
            id="password"
            type="password"
            value={campos.password}
            onChange={(e) => manejarCambio('password', e.target.value)}
            className={errores.password ? 'campo-error' : ''}
            placeholder={modoEdicion ? 'Nueva contraseña (opcional)' : 'Mínimo 6 caracteres'}
            maxLength={LIMITES.password}
          />
          {errores.password && <span className="mensaje-error">{errores.password}</span>}
          <small>* Campos obligatorios</small>
        </div>
      </div>

      {/* Botones de acción del formulario */}
      <div className="formulario-acciones">
        <button type="button" className="btn-secundario" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn-primario">
          {modoEdicion ? '💾 Actualizar usuario' : '➕ Crear usuario'}
        </button>
      </div>
    </form>
  )
}

export default UserForm
