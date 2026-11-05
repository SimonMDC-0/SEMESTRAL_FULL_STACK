import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import type { Territorio } from '../data/territorios';

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
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Obtener el territorio a mostrar según el parámetro :id de la URL o la prop directa
  const territorio =
    explicitTerritorio ||
    territorios.find((t) => t.id === Number(id)) ||
    territorios[0];

  const handleGoContact = onNavigateToContact || (() => navigate('/contacto'));

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
                    Caracteristicas principales:
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
                Solicitar Asesoria
              </Button>
            </div>
          </div>
        </div>

        {/* Modal de compra simulada */}
        {showPurchaseModal && (
          <div
            className="modal d-block"
            tabIndex={-1}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowPurchaseModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content custom-modal">
                <div className="modal-header custom-modal-header">
                  <h5 className="modal-title fw-bold">
                    Solicitud de Adquisicion
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Cerrar"
                    onClick={() => setShowPurchaseModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <p>
                    Has solicitado iniciar el proceso de adquisicion soberana
                    para <strong>{territorio.nombre}</strong> por un monto de{' '}
                    <strong>{territorio.precio} USD</strong>.
                  </p>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                    Uno de nuestros agentes fiduciarios se pondra en contacto
                    contigo para verificar antecedentes y coordinar la
                    transferencia protocolar.
                  </p>
                </div>
                <div className="modal-footer custom-modal-footer">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setShowPurchaseModal(false)}
                  >
                    Entendido
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      setShowPurchaseModal(false);
                      handleGoContact();
                    }}
                  >
                    Ir a Contacto
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DetalleProducto;
