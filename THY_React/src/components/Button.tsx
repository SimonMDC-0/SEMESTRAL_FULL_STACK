import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'outline-primary'
    | 'success'
    | 'outline-success'
    | 'dark'
    | 'outline-dark'
    | 'secondary'
    | 'outline-secondary'
    | 'register'
    | 'cancel';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

function getVariantClass(variant: ButtonProps['variant']): string {
  switch (variant) {
    case 'primary':
      return 'btn btn-primary';
    case 'outline-primary':
      return 'btn btn-outline-primary';
    case 'success':
      return 'btn btn-success';
    case 'outline-success':
      return 'btn btn-outline-success';
    case 'dark':
      return 'btn btn-dark';
    case 'outline-dark':
      return 'btn btn-outline-dark';
    case 'secondary':
      return 'btn btn-secondary';
    case 'outline-secondary':
      return 'btn btn-outline-secondary';
    case 'register':
      return 'btn btn-register';
    case 'cancel':
      return 'btn-cancel';
    default:
      return 'btn btn-success';
  }
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'success',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const variantClass = getVariantClass(variant);
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const widthClass = fullWidth ? 'w-100' : '';

  return (
    <button
      type={type}
      className={`${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
