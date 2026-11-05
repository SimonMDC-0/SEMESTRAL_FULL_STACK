import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export interface LayoutProps {
  isAdmin?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Desplazar la vista al tope al cambiar de ruta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Atajo de teclado global para administracion (Ctrl+Shift+A o Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'a' || e.key === 'A'))
      ) {
        e.preventDefault();
        navigate('/panel-admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header isAdmin={isAdmin} />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer isAdmin={isAdmin} />
    </div>
  );
};

export default Layout;

