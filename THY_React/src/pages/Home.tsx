import React from 'react';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import type { Territorio } from '../data/territorios';

export interface HomeProps {
  territorios: Territorio[];
  onSelectTerritorio?: (id: number) => void;
  onNavigateToProducts?: () => void;
}

export const Home: React.FC<HomeProps> = ({
  territorios,
  onSelectTerritorio,
  onNavigateToProducts
}) => {
  return (
    <main>
      {/* CARRUSEL PRINCIPAL (HERO) */}
      <Carousel onNavigateToProducts={onNavigateToProducts} />

      {/* GRILLA DE PRODUCTOS */}
      <section className="products-section py-5">
        <div className="container">
          {/* Titulo de seccion */}
          <h2 className="products-section-title text-center mb-4">Territorios Disponibles</h2>

          <div className="row g-4">
            {territorios.map((territorio) => (
              <div key={territorio.id} className="col-6 col-md-3">
                <ProductCard
                  territorio={territorio}
                  onSelect={onSelectTerritorio}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
