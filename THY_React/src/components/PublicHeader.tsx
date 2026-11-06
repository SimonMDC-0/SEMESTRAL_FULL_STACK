import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export interface PublicHeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = () => {
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-2 px-4 mb-4 border-bottom sticky-top">
      {/* Logo */}
      <div className="col-md-3 mb-2 mb-md-0 d-flex align-items-center gap-2">
        <Link
          to="/"
          className="d-inline-flex align-items-center gap-2 text-decoration-none"
        >
          <img
            src="/img/logo_twy.png"
            alt="Logo TWY"
            className="rounded-2"
            style={{ height: '50px', width: 'auto' }}
          />
          <span className="fs-5 fw-bold text-success">
            The World
            <br />
            is Yours
          </span>
        </Link>
      </div>

      {/* Menu de navegacion */}
      <nav>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link px-2 ${
                  isActive ? 'text-success fw-bold text-decoration-underline' : ''
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/productos"
              className={({ isActive }) =>
                `nav-link px-2 ${
                  isActive ? 'text-success fw-bold text-decoration-underline' : ''
                }`
              }
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nosotros"
              className={({ isActive }) =>
                `nav-link px-2 ${
                  isActive ? 'text-success fw-bold text-decoration-underline' : ''
                }`
              }
            >
              Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `nav-link px-2 ${
                  isActive ? 'text-success fw-bold text-decoration-underline' : ''
                }`
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `nav-link px-2 ${
                  isActive ? 'text-success fw-bold text-decoration-underline' : ''
                }`
              }
            >
              Contacto
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Botones de sesion y selector de tema */}
      <div className="col-md-3 text-end d-flex align-items-center justify-content-end gap-2">
        <ThemeToggle />
        <Link to="/iniciar-sesion" className="btn btn-outline-success btn-sm">
          Iniciar Sesion
        </Link>
        <Link to="/registrar" className="btn btn-success btn-sm">
          Registrar
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;
