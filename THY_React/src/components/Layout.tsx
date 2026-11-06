import React from 'react';
import PublicLayout from './PublicLayout';
import AdminLayout from './AdminLayout';

export interface LayoutProps {
  isAdmin?: boolean;
}

/**
 * @deprecated Este componente monolítico ha sido dividido en `PublicLayout` y `AdminLayout`.
 * Usa `PublicLayout` o `AdminLayout` según corresponda.
 */
export const Layout: React.FC<LayoutProps> = ({ isAdmin = false }) => {
  return isAdmin ? <AdminLayout /> : <PublicLayout />;
};

export default Layout;
