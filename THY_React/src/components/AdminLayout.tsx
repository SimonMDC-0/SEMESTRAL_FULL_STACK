import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  // Desplazar la vista al tope al cambiar de ruta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminHeader />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
