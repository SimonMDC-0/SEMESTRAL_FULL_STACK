import React from 'react';

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`product-image ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          // Fallback image in case of load issues
          const target = e.target as HTMLImageElement;
          target.src = '/img/world.png';
        }}
      />
    </div>
  );
};

export default CardImage;
