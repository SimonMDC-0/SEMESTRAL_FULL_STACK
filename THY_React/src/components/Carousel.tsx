import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  imageAlt: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: 'Adquiere tu soberania territorial',
    description:
      'Aprovecha la oportunidad de ser dueno y soberano de los territorios mas codiciados del planeta tierra.',
    buttonText: 'Ver productos',
    image: '/img/territorio_suiza.jpg',
    imageAlt: 'Suiza Alpina'
  },
  {
    id: 2,
    title: 'Territorios Exclusivos',
    description:
      'Descubre naciones con alta plusvalia internacional y recursos estrategicos listos para transferir.',
    buttonText: 'Explorar catalogo',
    image: '/img/territorio_monaco.jpg',
    imageAlt: 'Principado de Monaco'
  },
  {
    id: 3,
    title: 'Ofertas Destacadas',
    description:
      'Revisa las mejores oportunidades del mes con facilidades de financiamiento global.',
    buttonText: 'Ver ofertas',
    image: '/img/territorio_singapur.jpg',
    imageAlt: 'Republica de Singapur'
  }
];

export interface CarouselProps {
  onNavigateToProducts?: () => void;
  interval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  onNavigateToProducts,
  interval = 4000
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
    <section id="hero" aria-label="Banner principal">
      <div
        id="carouselPrincipal"
        className="carousel slide container my-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Indicadores del carrusel */}
        <div className="carousel-indicators mb-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={idx === activeIndex ? 'active' : ''}
              aria-current={idx === activeIndex ? 'true' : undefined}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
            ></button>
          ))}
        </div>

        {/* Diapositivas */}
        <div className="carousel-inner rounded-3 border">
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={slide.id}
                className={`carousel-item p-4 p-md-5 ${isActive ? 'active' : ''}`}
                style={{
                  display: isActive ? 'block' : 'none',
                  animation: isActive ? 'fadeIn 0.4s ease-in-out' : 'none'
                }}
              >
                <div className="row align-items-center">
                  <div className="col-md-6 pe-md-4">
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
                  <div className="col-md-6 mt-4 mt-md-0">
                    <div
                      className="border rounded-3 overflow-hidden"
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
          aria-label="Anterior"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={handleNext}
          aria-label="Siguiente"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
