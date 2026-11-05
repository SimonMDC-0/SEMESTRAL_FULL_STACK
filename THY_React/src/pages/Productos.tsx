import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import type { Territorio } from '../data/territorios';

export interface ProductosProps {
  territorios: Territorio[];
  onSelectTerritorio?: (id: number) => void;
}

export const Productos: React.FC<ProductosProps> = ({
  territorios,
  onSelectTerritorio
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Filtrado reactivo por término y categoría
  const filtered = territorios.filter((item) => {
    const matchesSearch =
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.atributo.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === 'todos') return matchesSearch;
    if (selectedCategory === 'destacados') return matchesSearch && item.destacado;
    if (selectedCategory === 'ofertas') return matchesSearch && item.oferta;
    return matchesSearch;
  });

  return (
    <main>
      <section className="products-section py-5">
        <div className="container">
          {/* Titulo de la pagina */}
          <h1 className="products-section-title text-center mb-3">Catalogo de Territorios</h1>
          <p className="text-center text-muted mb-4" style={{ fontSize: '0.95rem' }}>
            Explora nuestra seleccion exclusiva de soberanias y activos territoriales de alta plusvalia.
          </p>

          {/* Buscador y filtros rapidos */}
          <div className="row g-3 mb-4 justify-content-between align-items-center">
            <div className="col-12 col-md-6 col-lg-5">
              <input
                type="search"
                className="form-control form-control-custom"
                placeholder="Buscar por territorio, atributo o categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar territorio"
              />
            </div>
            <div className="col-12 col-md-auto d-flex gap-2">
              <button
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === 'todos' ? 'btn-success' : 'btn-outline-success'
                }`}
                onClick={() => setSelectedCategory('todos')}
              >
                Todos ({territorios.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === 'destacados' ? 'btn-success' : 'btn-outline-success'
                }`}
                onClick={() => setSelectedCategory('destacados')}
              >
                Destacados
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === 'ofertas' ? 'btn-success' : 'btn-outline-success'
                }`}
                onClick={() => setSelectedCategory('ofertas')}
              >
                Ofertas Especiales
              </button>
            </div>
          </div>

          {/* Grilla de productos */}
          {filtered.length > 0 ? (
            <div className="row g-4">
              {filtered.map((territorio) => (
                <div key={territorio.id} className="col-6 col-md-3">
                  <ProductCard
                    territorio={territorio}
                    onSelect={onSelectTerritorio}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted fs-5">No se encontraron territorios con ese criterio de busqueda.</p>
              <button
                className="btn btn-outline-success btn-sm mt-2"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todos');
                }}
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Productos;
