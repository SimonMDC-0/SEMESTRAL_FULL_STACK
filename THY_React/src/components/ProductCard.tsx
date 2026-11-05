import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import CardImage from './CardImage';
import CardBody from './CardBody';
import type { Territorio } from '../data/territorios';

export interface ProductCardProps {
  territorio: Territorio;
  onSelect?: (id: number) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  territorio,
  onSelect,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onSelect) {
      onSelect(territorio.id);
    } else {
      navigate(`/detalle/${territorio.id}`);
    }
  };

  return (
    <Card onClick={handleClick} className={className}>
      <CardImage src={territorio.imagen} alt={territorio.nombre} />
      <CardBody
        title={territorio.nombre}
        superficie={territorio.superficie}
        poblacion={territorio.poblacion}
        atributo={territorio.atributo || territorio.categoria}
        precio={territorio.precio}
        onTitleClick={handleClick}
      />
    </Card>
  );
};

export default ProductCard;
