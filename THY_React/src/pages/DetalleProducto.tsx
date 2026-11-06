import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import type { Territorio } from '../data/territorios';
import { validarEmail, validarTelefono } from '../utils/validaciones';

export interface DetalleProductoProps {
  territorios?: Territorio[];
  territorio?: Territorio;
  onNavigateToProducts?: () => void;
  onNavigateToContact?: () => void;
}

export const DetalleProducto: React.FC<DetalleProductoProps> = ({
  territorios = [],
  territorio: explicitTerritorio,
  onNavigateToProducts,
  onNavigateToContact
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados del modal interactivo de compra
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    metodoPago: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Obtener el territorio a mostrar según el parámetro :id de la URL o la prop directa
  const territorio =
    explicitTerritorio ||
    territorios.find((t) => t.id === Number(id)) ||
    territorios[0];

  const handleGoContact = onNavigateToContact || (() => navigate('/contacto'));

  const handleCloseModal = () => {
    setShowPurchaseModal(false);
    setIsSuccess(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      metodoPago: ''
    });
    setErrors({});
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

  const handleSubmitPurchase = (e: React.FormEvent) => {
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

    setErrors({});
    setIsSuccess(true);
  };

  if (!territorio) {
    return (
      <main className="py-5 text-center">
        <div className="container">
          <h2>Territorio no encontrado</h2>
          <Link to="/productos" className="btn btn-success mt-3">
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-5">
      <div className="container">
        {/* Breadcrumb / Migas de pan */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              {onNavigateToProducts ? (
                <a
                  href="#productos"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToProducts();
                  }}
                  className="text-success text-decoration-none"
                >
                  Productos
                </a>
              ) : (
                <Link to="/productos" className="text-success text-decoration-none">
                  Productos
                </Link>
              )}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {territorio.nombre}
            </li>
          </ol>
        </nav>

        <div className="row gx-5 align-items-center">
          {/* Imagen del producto */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div
              className="border rounded-3 overflow-hidden shadow-sm"
              style={{ maxHeight: '480px' }}
            >
              <img
                src={territorio.imagen}
                alt={territorio.nombre}
                className="img-fluid w-100 h-100 object-fit-cover"
                style={{ maxHeight: '480px', objectFit: 'cover' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/img/world.png';
                }}
              />
            </div>
          </div>

          {/* Informacion del producto */}
          <div className="col-lg-6">
            <h1
              className="display-6 fw-bold mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              {territorio.nombre}
            </h1>

            <h2 className="h4 text-muted mb-3">{territorio.precio} USD</h2>

            <div className="mb-4 d-flex flex-wrap gap-2">
              <span className="badge bg-success fs-6">
                📏 {territorio.superficie}
              </span>
              <span className="badge bg-success fs-6">
                👥 {territorio.poblacion}
              </span>
              <span className="badge bg-success fs-6">
                🏷️ {territorio.atributo || territorio.categoria}
              </span>
            </div>

            <p
              className="lead mb-4"
              style={{ fontSize: '1.05rem', lineHeight: '1.7' }}
            >
              {territorio.descripcion}
            </p>

            {territorio.caracteristicas &&
              territorio.caracteristicas.length > 0 && (
                <>
                  <h5
                    className="fw-bold mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Características principales:
                  </h5>
                  <ul className="mb-4 ps-3" style={{ lineHeight: '1.8' }}>
                    {territorio.caracteristicas.map((item, idx) => (
                      <li key={idx} className="mb-1 text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Button
                variant="success"
                size="lg"
                className="px-4 me-md-2"
                onClick={() => setShowPurchaseModal(true)}
              >
                Comprar Territorio
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                className="px-4"
                onClick={handleGoContact}
              >
                Solicitar Asesoría
              </Button>
            </div>
          </div>
        </div>

        {/* Modal interactivo de compra */}
        {showPurchaseModal && (
          <div
            className="modal d-block"
            tabIndex={-1}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={handleCloseModal}
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
                      <span className="badge bg-success">
                        {territorio.nombre}
                      </span>
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
                    onClick={handleCloseModal}
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
                        onClick={handleCloseModal}
                      >
                        Cerrar
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Formulario interactivo */
                  <form onSubmit={handleSubmitPurchase} noValidate>
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

                      {/* Método de pago */}
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
                          <option value="">
                            Seleccione un método de pago...
                          </option>
                          <option value="Transferencia Bancaria Internacional (SWIFT)">
                            Transferencia Bancaria Internacional (SWIFT)
                          </option>
                          <option value="Criptoactivo / Bitcoin (BTC)">
                            Criptoactivo / Bitcoin (BTC)
                          </option>
                          <option value="Fondo Fiduciario / Escrow">
                            Fondo Fiduciario / Escrow
                          </option>
                          <option value="Tarjeta de Crédito Corporativa">
                            Tarjeta de Crédito Corporativa
                          </option>
                        </select>
                        {errors.metodoPago && (
                          <div className="twy-error-msg">
                            {errors.metodoPago}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="modal-footer custom-modal-footer">
                      <Button
                        variant="cancel"
                        size="sm"
                        onClick={handleCloseModal}
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
        )}
      </div>
    </main>
  );
};

export default DetalleProducto;
