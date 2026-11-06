import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { slides, type CarouselSlide } from '../data/carouselData';

export type { CarouselSlide };

export interface CarouselProps {
  onNavigateToProducts?: () => void;
  interval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  onNavigateToProducts,
  interval = 2500
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleGoToProducts = onNavigateToProducts || (() => navigate('/productos'));

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, interval]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="hero" aria-label="Banner principal" className="py-2">
      <div
        id="carouselPrincipal"
        className="carousel slide container my-4 position-relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Diapositivas */}
        <div className="carousel-inner rounded-3 border">
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={slide.id}
                className={`carousel-item px-4 px-md-5 py-4 py-md-5 pb-5 ${isActive ? 'active' : ''}`}
                style={{
                  display: isActive ? 'block' : 'none',
                  animation: isActive ? 'fadeIn 0.2s ease-in-out' : 'none'
                }}
              >
                <div className="row align-items-center">
                  <div className="col-md-6 pe-md-4 ps-md-3">
                    <h1 className="fw-bold mb-3">{slide.title}</h1>
                    <p className="text-secondary mb-4">{slide.description}</p>
                    <Button
                      variant="outline-dark"
                      className="px-4 py-2 fw-semibold"
                      onClick={handleGoToProducts}
                    >
                      {slide.buttonText}
                    </Button>
                  </div>
                  <div className="col-md-6 mt-4 mt-md-0 pe-md-3">
                    <div
                      className="border rounded-3 overflow-hidden shadow-sm"
                      style={{ minHeight: '260px', maxHeight: '320px' }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: '260px', maxHeight: '320px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles anterior / siguiente */}
        <button
          className="carousel-control-prev"
          type="button"
          onClick={handlePrev}
          aria-label="Diapositiva anterior"
          title="Anterior"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={handleNext}
          aria-label="Diapositiva siguiente"
          title="Siguiente"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>

        {/* Indicadores del carrusel */}
        <div className="carousel-indicators mb-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#carouselPrincipal"
              data-bs-slide-to={idx}
              className={idx === activeIndex ? 'active' : ''}
              aria-current={idx === activeIndex ? 'true' : undefined}
              aria-label={`Ir a diapositiva ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
