import React, { useState } from 'react';
import Card from '../components/Card';
import CardImage from '../components/CardImage';
import { articulosBlogData } from '../data/blogData';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = articulosBlogData.filter((art) => {
    const matchesCategory =
      selectedCategory === 'todos' || art.categoria === selectedCategory;
    const matchesSearch =
      art.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.resumen.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="py-5">
      <div className="container">
        {/* Titulo de la pagina */}
        <h1 className="products-section-title text-center mb-2">Blog TWY</h1>
        <p className="text-center text-muted mb-5" style={{ fontSize: '0.95rem' }}>
          Noticias, analisis y tendencias del mercado territorial global.
        </p>

        {/* Barra de busqueda */}
        <div className="mb-4">
          <input
            type="search"
            className="form-control form-control-custom"
            placeholder="Buscar articulos por tema o palabra clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar en el blog"
          />
        </div>

        {/* Filtros de categoria */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className={`btn btn-sm ${
              selectedCategory === 'todos' ? 'btn-success' : 'btn-outline-success'
            }`}
            onClick={() => setSelectedCategory('todos')}
          >
            Todos
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              selectedCategory === 'nuevo' ? 'btn-success' : 'btn-outline-success'
            }`}
            onClick={() => setSelectedCategory('nuevo')}
          >
            Nuevos Territorios
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              selectedCategory === 'oferta' ? 'btn-success' : 'btn-outline-success'
            }`}
            onClick={() => setSelectedCategory('oferta')}
          >
            Ofertas
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              selectedCategory === 'mercado' ? 'btn-success' : 'btn-outline-success'
            }`}
            onClick={() => setSelectedCategory('mercado')}
          >
            Mercado
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              selectedCategory === 'temporada' ? 'btn-success' : 'btn-outline-success'
            }`}
            onClick={() => setSelectedCategory('temporada')}
          >
            Temporada
          </button>
        </div>

        {/* Lista de articulos */}
        <div className="row g-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => (
              <div key={art.id} className="col-md-6 col-lg-4">
                <Card hoverable className="h-100">
                  <CardImage src={art.imagen} alt={art.titulo} />
                  <div className="product-info p-3">
                    <span className="product-badge-stat mb-2 d-inline-block">
                      {art.categoriaEtiqueta}
                    </span>
                    <h2 className="product-title mb-2" style={{ fontSize: '1rem' }}>
                      <a href="#blog" onClick={(e) => e.preventDefault()}>
                        {art.titulo}
                      </a>
                    </h2>
                    <p className="text-muted" style={{ fontSize: '0.88rem' }}>
                      {art.resumen}
                    </p>
                    <p className="attributes mb-0 mt-3">{art.fecha}</p>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No se encontraron articulos con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Blog;
