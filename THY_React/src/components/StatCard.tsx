import React from 'react';

export interface StatCardProps {
  number: string | number;
  label: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label, className = '' }) => {
  return (
    <div className={`admin-stat-card ${className}`.trim()}>
      <h3>{number}</h3>
      <p>{label}</p>
    </div>
  );
};

export default StatCard;
