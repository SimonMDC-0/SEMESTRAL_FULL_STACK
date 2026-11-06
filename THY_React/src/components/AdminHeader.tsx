import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export interface AdminHeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = () => {
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-2 px-4 mb-4 border-bottom sticky-top">
      {/* Logo Admin */}
      <div className="col-md-3 mb-2 mb-md-0 d-flex align-items-center gap-2">
        <Link
          to="/panel-admin"
          className="d-inline-flex align-items-center gap-2 text-decoration-none"
        >
          <img
            src="/img/logo_twy.png"
            alt="Logo TWY"
            className="rounded-2"
            style={{ height: '50px', width: 'auto' }}
          />
          <span className="fs-5 fw-bold text-success">
            Admin
            <br />
            Panel
          </span>
        </Link>
      </div>

      {/* Menu de administracion */}
      <nav>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink
              to="/panel-admin"
              className={({ isActive }) =>
                `nav-link px-2 ${isActive ? 'text-success fw-bold' : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/editar-territorios"
              className={({ isActive }) =>
                `nav-link px-2 ${isActive ? 'text-success fw-bold' : ''}`
              }
            >
              Territorios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/agregar-producto"
              className={({ isActive }) =>
                `nav-link px-2 ${isActive ? 'text-success fw-bold' : ''}`
              }
            >
              + Nuevo
            </NavLink>
          </li>
          <li>
            <Link to="/" className="nav-link px-2">
              Ver Sitio
            </Link>
          </li>
        </ul>
      </nav>

      {/* Selector de tema y cerrar sesion */}
      <div className="col-md-3 text-end d-flex align-items-center justify-content-end gap-2">
        <ThemeToggle />
        <Link to="/" className="btn btn-outline-success btn-sm">
          Cerrar Sesion
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
