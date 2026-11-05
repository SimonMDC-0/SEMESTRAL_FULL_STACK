/**
 * data/blogData.ts - Informacion de los articulos de blog para TWY
 */

export interface ArticuloBlog {
  id: number;
  titulo: string;
  resumen: string;
  categoria: 'todos' | 'nuevo' | 'oferta' | 'mercado' | 'temporada';
  categoriaEtiqueta: string;
  fecha: string;
  imagen: string;
}

export const articulosBlogData: ArticuloBlog[] = [
  {
    id: 1,
    titulo: "Islandia: el territorio mas sustentable del planeta",
    resumen:
      "Analizamos por que Islandia lidera los indices de calidad de vida y como eso impacta su valor territorial a largo plazo.",
    categoria: "nuevo",
    categoriaEtiqueta: "Nuevos Territorios",
    fecha: "12 Sep 2026",
    imagen: "/img/territorio_islandia.jpg"
  },
  {
    id: 2,
    titulo: "Suiza: estabilidad financiera como activo territorial",
    resumen:
      "El sistema bancario y la neutralidad historica hacen de Suiza una inversion de largo plazo inigualable y un refugio seguro.",
    categoria: "mercado",
    categoriaEtiqueta: "Mercado",
    fecha: "15 Sep 2026",
    imagen: "/img/territorio_suiza.jpg"
  },
  {
    id: 3,
    titulo: "Monaco: el microestado mas caro del mundo",
    resumen:
      "Con solo 2 km², Monaco concentra mas riqueza por metro cuadrado que cualquier otro lugar del planeta tierra.",
    categoria: "oferta",
    categoriaEtiqueta: "Ofertas",
    fecha: "17 Sep 2026",
    imagen: "/img/territorio_monaco.jpg"
  },
  {
    id: 4,
    titulo: "Seychelles: paraiso tropical de alta demanda estival",
    resumen:
      "El auge del turismo de lujo en el Indico convierte a Seychelles en un activo con alta rentabilidad estacional y exclusividad.",
    categoria: "temporada",
    categoriaEtiqueta: "Temporada",
    fecha: "19 Sep 2026",
    imagen: "/img/territorio_seychelles.jpg"
  },
  {
    id: 5,
    titulo: "Singapur: hub financiero de Asia-Pacifico",
    resumen:
      "Como la innovacion digital, la seguridad juridica y la conectividad portuaria posicionan a Singapur en la vanguardia geopolitica.",
    categoria: "mercado",
    categoriaEtiqueta: "Mercado",
    fecha: "22 Sep 2026",
    imagen: "/img/territorio_singapur.jpg"
  },
  {
    id: 6,
    titulo: "Groenlandia y las nuevas rutas de comercio polar",
    resumen:
      "Descubre por que las grandes potencias mundiales estan fijando su atencion en los recursos minerales inexplorados de Groenlandia.",
    categoria: "nuevo",
    categoriaEtiqueta: "Nuevos Territorios",
    fecha: "25 Sep 2026",
    imagen: "/img/territorio_groenlandia.jpg"
  }
];
