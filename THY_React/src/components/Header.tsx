import React from 'react';
import PublicHeader, { type PublicHeaderProps } from './PublicHeader';
import AdminHeader, { type AdminHeaderProps } from './AdminHeader';

export interface HeaderProps extends PublicHeaderProps, AdminHeaderProps {
  isAdmin?: boolean;
}

/**
 * @deprecated Este componente monolítico ha sido dividido en `PublicHeader` y `AdminHeader`.
 * Usa `PublicHeader` o `AdminHeader` según corresponda.
 */
export const Header: React.FC<HeaderProps> = ({ isAdmin = false, ...props }) => {
  return isAdmin ? <AdminHeader {...props} /> : <PublicHeader {...props} />;
};

export default Header;
