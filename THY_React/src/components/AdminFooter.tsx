import React from 'react';

export interface AdminFooterProps {
  onNavigate?: (page: string) => void;
}

export const AdminFooter: React.FC<AdminFooterProps> = () => {
  return (
    <footer className="footer-outer mt-auto" aria-label="Pie de pagina">
      <div className="container py-4 text-center">
        <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
          Panel de Administracion &bull; The World Is Yours &copy; 2026
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;
