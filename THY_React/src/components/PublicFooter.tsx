import React from 'react';
import { Link } from 'react-router-dom';

export interface PublicFooterProps {
  onNavigate?: (page: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = () => {
  return (
    <footer className="footer-outer mt-auto" aria-label="Pie de pagina">
      <div className="container py-4">
        {/* Navegacion del footer */}
        <nav aria-label="Navegacion del pie">
          <ul className="nav col-12 col-md-auto mb-3 justify-content-center">
            <li>
              <Link to="/" className="nav-link px-2">
                Home
              </Link>
            </li>
            <li>
              <Link to="/productos" className="nav-link px-2">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="nav-link px-2">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/blog" className="nav-link px-2">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="nav-link px-2">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botones de sesion */}
        <div className="text-center mb-3">
          <Link
            to="/iniciar-sesion"
            className="btn btn-outline-success btn-sm me-2"
          >
            Iniciar Sesion
          </Link>
          <Link to="/registrar" className="btn btn-success btn-sm">
            Registrar
          </Link>
        </div>

        {/* Copyright y boton candado oculto para admin */}
        <p className="text-center mb-0">
          &copy; 2026 The World Is Yours, Inc
          <Link
            to="/panel-admin"
            className="admin-stealth-link"
            title="Panel de Administracion"
            aria-label="Administracion"
          >
            🔒
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default PublicFooter;
