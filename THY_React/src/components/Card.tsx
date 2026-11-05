import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = true,
  ...props
}) => {
  return (
    <article
      className={`product-card h-100 ${hoverable ? 'card-hoverable' : ''} ${className}`.trim()}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', ...props.style }}
      {...props}
    >
      {children}
    </article>
  );
};

export default Card;
