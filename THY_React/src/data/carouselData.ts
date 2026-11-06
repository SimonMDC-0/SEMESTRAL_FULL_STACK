/**
 * data/carouselData.ts - Datos y tipos para el carrusel principal (Hero)
 */

export interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  imageAlt: string;
}

export const slides: CarouselSlide[] = [
  {
    id: 1,
    title: 'Adquiere tu soberanía territorial',
    description:
      'Aprovecha la oportunidad de ser dueño y soberano de los territorios más codiciados del planeta tierra.',
    buttonText: 'Ver productos',
    image: '/img/territorio_suiza.jpg',
    imageAlt: 'Suiza Alpina'
  },
  {
    id: 2,
    title: 'Territorios Exclusivos',
    description:
      'Descubre naciones con alta plusvalía internacional y recursos estratégicos listos para transferir.',
    buttonText: 'Explorar catálogo',
    image: '/img/territorio_monaco.jpg',
    imageAlt: 'Principado de Mónaco'
  },
  {
    id: 3,
    title: 'Ofertas Destacadas',
    description:
      'Revisa las mejores oportunidades del mes con facilidades de financiamiento global.',
    buttonText: 'Ver ofertas',
    image: '/img/territorio_singapur.jpg',
    imageAlt: 'República de Singapur'
  }
];

export default slides;
