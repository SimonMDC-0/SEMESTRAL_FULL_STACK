import React from 'react';

export interface CardBodyProps {
  title: string;
  superficie?: string;
  poblacion?: string;
  atributo?: string;
  precio: string;
  titleLink?: string;
  onTitleClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({
  title,
  superficie,
  poblacion,
  atributo,
  precio,
  titleLink = '#',
  onTitleClick,
  children
}) => {
  return (
    <div className="product-info p-3">
      <h3 className="product-title mb-2">
        <a
          href={titleLink}
          onClick={(e) => {
            if (onTitleClick) {
              e.preventDefault();
              onTitleClick(e);
            }
          }}
        >
          {title}
        </a>
      </h3>

      {(superficie || poblacion) && (
        <div className="product-meta">
          {superficie && <span className="product-badge-stat">📏 {superficie}</span>}
          {poblacion && <span className="product-badge-stat">👥 {poblacion}</span>}
        </div>
      )}

      {children}

      <div className="product-footer d-flex justify-content-between align-items-center mt-2">
        {atributo && <span className="attributes">{atributo}</span>}
        <span className="price">{precio}</span>
      </div>
    </div>
  );
};

export default CardBody;
