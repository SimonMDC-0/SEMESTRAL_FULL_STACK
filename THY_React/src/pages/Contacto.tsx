import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { validarEmail, validarTelefono } from '../utils/validaciones';

export interface ContactoProps {
  onNavigateHome?: () => void;
}

export const Contacto: React.FC<ContactoProps> = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error al escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre completo es requerido.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electronico es requerido.';
    } else if (!validarEmail(formData.email)) {
      newErrors.email = 'Correo invalido. Usa el formato usuario@dominio.com';
    }

    if (formData.telefono.trim() && !validarTelefono(formData.telefono)) {
      newErrors.telefono = 'Telefono invalido. Formato: +56 9 XXXX XXXX o 9XXXXXXXX';
    }

    if (!formData.asunto) {
      newErrors.asunto = 'Por favor selecciona un asunto.';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'Por favor ingresa tu mensaje.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Éxito
    setSubmitted(true);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="register-container">
          {/* Titulo del formulario */}
          <div className="form-banner">Contactanos</div>

          {/* Mensaje de exito */}
          {submitted && (
            <div className="alert alert-success text-center mb-4" role="alert">
              ✅ Tu mensaje fue enviado correctamente. Nuestro equipo se pondra en contacto contigo
              a la brevedad.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Nombre completo */}
            <div className="mb-4">
              <label htmlFor="contacto-nombre" className="form-label-custom">
                Nombre Completo
              </label>
              <input
                type="text"
                id="contacto-nombre"
                name="nombre"
                className="form-control form-control-custom"
                placeholder="Tu nombre y apellido"
                value={formData.nombre}
                onChange={handleChange}
                required
                autoComplete="name"
                style={{ borderColor: errors.nombre ? '#c0392b' : undefined }}
              />
              {errors.nombre && <div className="twy-error-msg">⚠️ {errors.nombre}</div>}
            </div>

            {/* Correo electronico */}
            <div className="mb-4">
              <label htmlFor="contacto-email" className="form-label-custom">
                Correo Electronico
              </label>
              <input
                type="email"
                id="contacto-email"
                name="email"
                className="form-control form-control-custom"
                placeholder="usuario@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                style={{ borderColor: errors.email ? '#c0392b' : undefined }}
              />
              {errors.email && <div className="twy-error-msg">⚠️ {errors.email}</div>}
            </div>

            {/* Telefono */}
            <div className="mb-4">
              <label htmlFor="contacto-telefono" className="form-label-custom">
                Telefono (opcional)
              </label>
              <input
                type="tel"
                id="contacto-telefono"
                name="telefono"
                className="form-control form-control-custom"
                placeholder="+56 9 1234 5678"
                value={formData.telefono}
                onChange={handleChange}
                autoComplete="tel"
                style={{ borderColor: errors.telefono ? '#c0392b' : undefined }}
              />
              {errors.telefono && <div className="twy-error-msg">⚠️ {errors.telefono}</div>}
            </div>

            {/* Asunto */}
            <div className="mb-4">
              <label htmlFor="contacto-asunto" className="form-label-custom">
                Asunto
              </label>
              <select
                id="contacto-asunto"
                name="asunto"
                className="form-control form-control-custom"
                value={formData.asunto}
                onChange={handleChange}
                required
                style={{ borderColor: errors.asunto ? '#c0392b' : undefined }}
              >
                <option value="" disabled>
                  Selecciona un asunto
                </option>
                <option value="consulta">Consulta general</option>
                <option value="territorios">Informacion sobre territorios</option>
                <option value="reserva">Reservas y disponibilidad</option>
                <option value="soporte">Soporte tecnico</option>
                <option value="otro">Otro</option>
              </select>
              {errors.asunto && <div className="twy-error-msg">⚠️ {errors.asunto}</div>}
            </div>

            {/* Mensaje */}
            <div className="mb-4">
              <label htmlFor="contacto-mensaje" className="form-label-custom">
                Mensaje
              </label>
              <textarea
                id="contacto-mensaje"
                name="mensaje"
                className="form-control form-control-custom"
                placeholder="Escribe tu mensaje aqui..."
                rows={5}
                value={formData.mensaje}
                onChange={handleChange}
                required
                style={{ borderColor: errors.mensaje ? '#c0392b' : undefined }}
              ></textarea>
              {errors.mensaje && <div className="twy-error-msg">⚠️ {errors.mensaje}</div>}
            </div>

            {/* Boton enviar */}
            <div className="d-grid mb-3">
              <Button type="submit" variant="register">
                Enviar Mensaje
              </Button>
            </div>

            {/* Enlace de regreso */}
            <p className="text-center mb-0" style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              <Link
                to="/"
                style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
              >
                ← Volver al inicio
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contacto;
