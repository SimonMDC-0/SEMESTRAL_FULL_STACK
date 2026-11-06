import React, { useState } from 'react';
import Button from './Button';
import type { Territorio } from '../data/territorios';
import type { TransaccionAdmin } from '../data/adminData';
import { validarEmail, validarTelefono } from '../utils/validaciones';

export interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (tx: TransaccionAdmin) => void;
  territorio: Territorio;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  territorio
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    metodoPago: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      metodoPago: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre completo es obligatorio.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!validarEmail(formData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido.';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El número de teléfono es obligatorio.';
    } else if (!validarTelefono(formData.telefono)) {
      newErrors.telefono =
        'Ingrese un teléfono de contacto válido (ej: +56 9 1234 5678).';
    }

    if (!formData.metodoPago) {
      newErrors.metodoPago = 'Debe seleccionar un método de pago.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generar la nueva transacción fiduciaria
    const hoy = new Date();
    const fecha = `${String(hoy.getDate()).padStart(2, '0')}/${String(
      hoy.getMonth() + 1
    ).padStart(2, '0')}/${hoy.getFullYear()}`;
    const txId = `TX-${Date.now().toString().slice(-4)}`;

    const nuevaTx: TransaccionAdmin = {
      id: txId,
      territorio: territorio.nombre,
      comprador: `${formData.nombre} (${formData.email})`,
      fecha,
      monto: territorio.precio,
      estado: 'Pendiente'
    };

    if (onSubmit) {
      onSubmit(nuevaTx);
    }

    setErrors({});
    setIsSuccess(true);
  };

  return (
    <div
      className="modal d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content custom-modal">
          {/* Cabecera del Modal con Resumen del Territorio */}
          <div className="modal-header custom-modal-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="modal-title fw-bold mb-1">
                Solicitud de Adquisición
              </h5>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-success">{territorio.nombre}</span>
                <span
                  className="fw-semibold text-success"
                  style={{ fontSize: '0.9rem' }}
                >
                  {territorio.precio} USD
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={handleClose}
            ></button>
          </div>

          {isSuccess ? (
            /* Vista de confirmación / Éxito */
            <div className="modal-body p-4 text-center">
              <div className="py-2">
                <div className="mb-3" style={{ fontSize: '2.8rem' }}>
                  🎉
                </div>
                <h4
                  className="fw-bold mb-3"
                  style={{ color: 'var(--color-primary)' }}
                >
                  ¡Formulario enviado correctamente!
                </h4>
                <p
                  className="text-secondary mb-4"
                  style={{ fontSize: '0.95rem', lineHeight: '1.6' }}
                >
                  Un ejecutivo fiduciario te contactará a la brevedad para
                  coordinar la transacción.
                </p>
                <div
                  className="p-3 rounded-3 border text-start mb-4"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)'
                  }}
                >
                  <div className="small text-muted mb-1">
                    Resumen de la solicitud:
                  </div>
                  <div
                    className="fw-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {formData.nombre}
                  </div>
                  <div className="text-muted small">
                    {formData.email} • {formData.telefono}
                  </div>
                  <div className="text-muted small mt-1">
                    Método de pago: <strong>{formData.metodoPago}</strong>
                  </div>
                </div>
                <Button
                  variant="success"
                  className="px-4 py-2"
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          ) : (
            /* Formulario interactivo */
            <form onSubmit={handleSubmit} noValidate>
              <div className="modal-body p-4">
                <p className="text-muted small mb-3">
                  Completa los siguientes datos para iniciar el protocolo
                  fiduciario de adquisición territorial.
                </p>

                {/* Nombre completo */}
                <div className="mb-3">
                  <label
                    htmlFor="modalNombre"
                    className="form-label form-label-custom"
                  >
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="modalNombre"
                    name="nombre"
                    className={`form-control form-control-custom ${
                      errors.nombre ? 'is-invalid border-danger' : ''
                    }`}
                    placeholder="Ej: Sofía Valenzuela"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                  {errors.nombre && (
                    <div className="twy-error-msg">{errors.nombre}</div>
                  )}
                </div>

                {/* Correo electrónico */}
                <div className="mb-3">
                  <label
                    htmlFor="modalEmail"
                    className="form-label form-label-custom"
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="modalEmail"
                    name="email"
                    className={`form-control form-control-custom ${
                      errors.email ? 'is-invalid border-danger' : ''
                    }`}
                    placeholder="ejemplo@twy.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="twy-error-msg">{errors.email}</div>
                  )}
                </div>

                {/* Teléfono */}
                <div className="mb-3">
                  <label
                    htmlFor="modalTelefono"
                    className="form-label form-label-custom"
                  >
                    Número de Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="modalTelefono"
                    name="telefono"
                    className={`form-control form-control-custom ${
                      errors.telefono ? 'is-invalid border-danger' : ''
                    }`}
                    placeholder="+56 9 1234 5678"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                  {errors.telefono && (
                    <div className="twy-error-msg">{errors.telefono}</div>
                  )}
                </div>

                {/* Método de pago con Bitcoin */}
                <div className="mb-3">
                  <label
                    htmlFor="modalMetodoPago"
                    className="form-label form-label-custom"
                  >
                    Método de Pago *
                  </label>
                  <select
                    id="modalMetodoPago"
                    name="metodoPago"
                    className={`form-select form-select-custom ${
                      errors.metodoPago ? 'is-invalid border-danger' : ''
                    }`}
                    value={formData.metodoPago}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione un método de pago...</option>
                    <option value="Transferencia Bancaria Internacional (SWIFT)">
                      Transferencia Bancaria Internacional (SWIFT)
                    </option>
                    <option value="Criptoactivo / Bitcoin (BTC)">
                      Criptoactivo / Bitcoin (BTC)
                    </option>
                    <option value="Fondo Fiduciario / Escrow">
                      Fondo Fiduciario / Escrow
                    </option>
                    <option value="Tarjeta Corporativa">
                      Tarjeta Corporativa
                    </option>
                  </select>
                  {errors.metodoPago && (
                    <div className="twy-error-msg">{errors.metodoPago}</div>
                  )}
                </div>
              </div>

              <div className="modal-footer custom-modal-footer">
                <Button
                  variant="cancel"
                  size="sm"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  className="px-3"
                >
                  Confirmar Solicitud
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
