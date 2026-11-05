import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import {
  limpiarRut,
  formatearRut,
  validarRut,
  validarEmail,
  validarTelefono
} from '../utils/validaciones';

export interface UserRegistrationData {
  nombre: string;
  apellido: string;
  rut: string;
  correo: string;
  telefono: string;
}

export interface RegistrarUsuarioProps {
  onNavigateLogin?: () => void;
  onRegisterSuccess?: (userData: UserRegistrationData) => void;
}

export const RegistrarUsuario: React.FC<RegistrarUsuarioProps> = ({
  onNavigateLogin,
  onRegisterSuccess
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
    confirmarCorreo: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const limpio = limpiarRut(raw);
    const formateado = limpio.length >= 2 ? formatearRut(limpio) : raw;
    setFormData((prev) => ({ ...prev, rut: formateado }));

    if (errors.rut) {
      setErrors((prev) => ({ ...prev, rut: '' }));
    }
  };

  const handleRutBlur = () => {
    if (!formData.rut.trim()) return;
    if (!validarRut(formData.rut)) {
      setErrors((prev) => ({ ...prev, rut: 'RUT invalido. Verifica el digito verificador.' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio.';

    if (!formData.rut.trim()) {
      newErrors.rut = 'El RUT es obligatorio.';
    } else if (!validarRut(formData.rut)) {
      newErrors.rut = 'RUT invalido. Verifica el digito verificador.';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio.';
    } else if (!validarEmail(formData.correo)) {
      newErrors.correo = 'Formato de correo invalido.';
    }

    if (formData.correo !== formData.confirmarCorreo) {
      newErrors.confirmarCorreo = 'Los correos no coinciden.';
    }

    if (formData.telefono.trim() && !validarTelefono(formData.telefono)) {
      newErrors.telefono = 'Telefono invalido (ej: 9 1234 5678).';
    }

    if (!formData.contrasena) {
      newErrors.contrasena = 'La contrasena es obligatoria.';
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = 'La contrasena debe tener al menos 6 caracteres.';
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contrasenas no coinciden.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      if (onRegisterSuccess) {
        onRegisterSuccess(formData);
      } else {
        alert(`¡Usuario ${formData.nombre} registrado correctamente!`);
        navigate('/iniciar-sesion');
      }
    }, 1200);
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="register-container" style={{ maxWidth: '700px' }}>
          {/* Titulo del formulario */}
          <div className="form-banner">Crear Cuenta</div>

          {success && (
            <div className="alert alert-success text-center mb-4" role="alert">
              🎉 ¡Registro exitoso! Redirigiendo a inicio de sesion...
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <p className="section-subtitle">Datos Personales</p>

            <div className="row g-3 mb-3">
              {/* Nombre */}
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label-custom">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control form-control-custom"
                  placeholder="Juan"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  style={{ borderColor: errors.nombre ? '#c0392b' : undefined }}
                />
                {errors.nombre && <div className="twy-error-msg">⚠️ {errors.nombre}</div>}
              </div>

              {/* Apellido */}
              <div className="col-md-6">
                <label htmlFor="apellido" className="form-label-custom">
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  className="form-control form-control-custom"
                  placeholder="Perez"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  style={{ borderColor: errors.apellido ? '#c0392b' : undefined }}
                />
                {errors.apellido && <div className="twy-error-msg">⚠️ {errors.apellido}</div>}
              </div>
            </div>

            {/* RUT */}
            <div className="mb-3">
              <label htmlFor="rut" className="form-label-custom">
                RUT
              </label>
              <input
                type="text"
                id="rut"
                name="rut"
                className="form-control form-control-custom"
                placeholder="12.345.678-9"
                value={formData.rut}
                onChange={handleRutChange}
                onBlur={handleRutBlur}
                required
                autoComplete="off"
                style={{ borderColor: errors.rut ? '#c0392b' : undefined }}
              />
              {errors.rut && <div className="twy-error-msg">⚠️ {errors.rut}</div>}
            </div>

            {/* Correo */}
            <div className="mb-3">
              <label htmlFor="correo" className="form-label-custom">
                Correo Electronico
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                className="form-control form-control-custom"
                placeholder="usuario@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
                required
                autoComplete="email"
                style={{ borderColor: errors.correo ? '#c0392b' : undefined }}
              />
              {errors.correo && <div className="twy-error-msg">⚠️ {errors.correo}</div>}
            </div>

            {/* Confirmar correo */}
            <div className="mb-3">
              <label htmlFor="confirmarCorreo" className="form-label-custom">
                Confirmar Correo
              </label>
              <input
                type="email"
                id="confirmarCorreo"
                name="confirmarCorreo"
                className="form-control form-control-custom"
                placeholder="usuario@ejemplo.com"
                value={formData.confirmarCorreo}
                onChange={handleChange}
                required
                autoComplete="email"
                style={{ borderColor: errors.confirmarCorreo ? '#c0392b' : undefined }}
              />
              {errors.confirmarCorreo && (
                <div className="twy-error-msg">⚠️ {errors.confirmarCorreo}</div>
              )}
            </div>

            {/* Telefono */}
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label-custom">
                Telefono
              </label>
              <div className="input-group">
                <span className="input-group-text" style={{ fontSize: '0.9rem' }}>
                  +56
                </span>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className="form-control form-control-custom"
                  placeholder="9 1234 5678"
                  value={formData.telefono}
                  onChange={handleChange}
                  autoComplete="tel"
                  style={{ borderColor: errors.telefono ? '#c0392b' : undefined }}
                />
              </div>
              {errors.telefono && <div className="twy-error-msg">⚠️ {errors.telefono}</div>}
            </div>

            {/* Contrasena */}
            <div className="mb-3">
              <label htmlFor="contrasena" className="form-label-custom">
                Contrasena
              </label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                className="form-control form-control-custom"
                placeholder="••••••••"
                value={formData.contrasena}
                onChange={handleChange}
                required
                autoComplete="new-password"
                style={{ borderColor: errors.contrasena ? '#c0392b' : undefined }}
              />
              {errors.contrasena && <div className="twy-error-msg">⚠️ {errors.contrasena}</div>}
            </div>

            {/* Confirmar contrasena */}
            <div className="mb-4">
              <label htmlFor="confirmarContrasena" className="form-label-custom">
                Confirmar Contrasena
              </label>
              <input
                type="password"
                id="confirmarContrasena"
                name="confirmarContrasena"
                className="form-control form-control-custom"
                placeholder="••••••••"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                required
                autoComplete="new-password"
                style={{ borderColor: errors.confirmarContrasena ? '#c0392b' : undefined }}
              />
              {errors.confirmarContrasena && (
                <div className="twy-error-msg">⚠️ {errors.confirmarContrasena}</div>
              )}
            </div>

            {/* Boton registrar */}
            <div className="text-center mb-3">
              <Button type="submit" variant="register">
                REGISTRAR
              </Button>
            </div>

            {/* Enlace volver a login */}
            <p className="text-center mb-0" style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              ¿Ya tienes una cuenta?{' '}
              {onNavigateLogin ? (
                <a
                  href="#iniciar-sesion"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateLogin();
                  }}
                  style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}
                >
                  Inicia sesion aqui
                </a>
              ) : (
                <Link
                  to="/iniciar-sesion"
                  style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}
                >
                  Inicia sesion aqui
                </Link>
              )}
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegistrarUsuario;
