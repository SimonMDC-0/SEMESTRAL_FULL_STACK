import React from 'react';
import PublicFooter, { type PublicFooterProps } from './PublicFooter';
import AdminFooter, { type AdminFooterProps } from './AdminFooter';

export interface FooterProps extends PublicFooterProps, AdminFooterProps {
  isAdmin?: boolean;
}

/**
 * @deprecated Este componente monolítico ha sido dividido en `PublicFooter` y `AdminFooter`.
 * Usa `PublicFooter` o `AdminFooter` según corresponda.
 */
export const Footer: React.FC<FooterProps> = ({ isAdmin = false, ...props }) => {
  return isAdmin ? <AdminFooter {...props} /> : <PublicFooter {...props} />;
};

export default Footer;
