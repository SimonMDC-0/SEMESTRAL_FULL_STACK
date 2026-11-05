/**
 * data/territorios.ts - Informacion de los territorios y productos (paises)
 */

export interface Territorio {
  id: number;
  nombre: string;
  superficie: string;
  superficieNum: number;
  poblacion: string;
  poblacionNum: number;
  precio: string;
  precioNum: number;
  categoria: string;
  atributo: string;
  imagen: string;
  descripcion: string;
  caracteristicas: string[];
  destacado?: boolean;
  oferta?: boolean;
}

export const territoriosData: Territorio[] = [
  {
    id: 1,
    nombre: "Suiza Alpina",
    superficie: "41,285 km²",
    superficieNum: 41285,
    poblacion: "8.7M hab.",
    poblacionNum: 8720000,
    precio: "$18,500,000",
    precioNum: 18500000,
    categoria: "Soberania Total",
    atributo: "Alta Plusvalia",
    imagen: "/img/territorio_suiza.jpg",
    descripcion:
      "Un territorio caracterizado por su estabilidad económica y geopolítica incomparable. Adquirir soberanía en la región alpina suiza ofrece beneficios fiscales excepcionales, privacidad garantizada y un entorno natural majestuoso.",
    caracteristicas: [
      "Economía: Uno de los centros financieros más robustos a nivel mundial.",
      "Política: Historial comprobado de neutralidad y estabilidad sociopolítica.",
      "Ubicación: Corazón estratégico del continente europeo.",
      "Infraestructura: Redes de transporte y tecnología de punta."
    ],
    destacado: true
  },
  {
    id: 2,
    nombre: "Principado de Monaco",
    superficie: "2.08 km²",
    superficieNum: 2.08,
    poblacion: "39,000 hab.",
    poblacionNum: 39000,
    precio: "$28,000,000",
    precioNum: 28000000,
    categoria: "Costa Riviera",
    atributo: "Exclusivo",
    imagen: "/img/territorio_monaco.jpg",
    descripcion:
      "Con solo 2 km², Mónaco concentra más riqueza por metro cuadrado que cualquier otro lugar del planeta. Ubicación privilegiada en la Riviera con régimen fiscal privilegiado.",
    caracteristicas: [
      "Economía: Exención de impuestos sobre la renta para residentes soberanos.",
      "Seguridad: Uno de los estándares policiales y de seguridad más elevados del planeta.",
      "Exclusividad: Epicentro internacional de yates, alta sociedad y eventos de élite.",
      "Marina: Salida directa y privilegiada al mar Mediterráneo."
    ],
    destacado: true
  },
  {
    id: 3,
    nombre: "Islandia Boreal",
    superficie: "103,000 km²",
    superficieNum: 103000,
    poblacion: "376,000 hab.",
    poblacionNum: 376000,
    precio: "$14,200,000",
    precioNum: 14200000,
    categoria: "Geotermica",
    atributo: "Sustentable",
    imagen: "/img/territorio_islandia.jpg",
    descripcion:
      "Líder global en sustentabilidad y generación energética 100% renovable. Territorio indómito con volcanes, géiseres, glaciares y un potencial geotérmico incalculable.",
    caracteristicas: [
      "Energía: 100% de electricidad y calefacción generadas por fuentes limpias.",
      "Naturaleza: Paisajes volcánicos únicos, cascadas y auroras boreales constantes.",
      "Pureza: Reservas de agua glacial de la mayor pureza microbiológica mundial.",
      "Tecnología: Emplazamiento predilecto para datacenters ecológicos por refrigeración natural."
    ],
    destacado: true
  },
  {
    id: 4,
    nombre: "Atolon de Seychelles",
    superficie: "459 km²",
    superficieNum: 459,
    poblacion: "107,000 hab.",
    poblacionNum: 107000,
    precio: "$11,800,000",
    precioNum: 11800000,
    categoria: "Exclusivo",
    atributo: "Temporada",
    imagen: "/img/territorio_seychelles.jpg",
    descripcion:
      "Archipiélago paradisíaco en el corazón del océano Índico con playas de arenas blancas reconocidas en el mundo entero, reservas de coral protegidas y máxima privacidad.",
    caracteristicas: [
      "Biodiversidad: Santuario ecológico con especies botánicas y marinas únicas.",
      "Clima: Temperatura tropical paradisíaca estable durante todo el año.",
      "Privacidad: Islas y atolones vírgenes para residencias privadas de ultralujo.",
      "Plusvalía: Alta demanda de concesiones turísticas de alto estándar internacional."
    ],
    destacado: false,
    oferta: true
  },
  {
    id: 5,
    nombre: "Nueva Zelanda Austral",
    superficie: "268,021 km²",
    superficieNum: 268021,
    poblacion: "5.1M hab.",
    poblacionNum: 5100000,
    precio: "$16,900,000",
    precioNum: 16900000,
    categoria: "Reserva Natural",
    atributo: "Alta Plusvalia",
    imagen: "/img/territorio_nz.jpg",
    descripcion:
      "Soberanía sobre una de las naciones más pacíficas, transparentes y sustentables del hemisferio sur. Destacada por su avanzada agricultura, biodiversidad y aislamiento geopolítico seguro.",
    caracteristicas: [
      "Geopolítica: Óptima distancia estratégica de tensiones y conflictos mundiales.",
      "Agroindustria: Campos de alta productividad, ganadería regenerativa y viñedos.",
      "Institucionalidad: Máximos índices de transparencia legal y respeto a la propiedad.",
      "Ecosistemas: Cordilleras, fiordos y lagos protegidos de belleza sin igual."
    ],
    destacado: false
  },
  {
    id: 6,
    nombre: "Republica de Singapur",
    superficie: "734 km²",
    superficieNum: 734,
    poblacion: "5.6M hab.",
    poblacionNum: 5600000,
    precio: "$32,000,000",
    precioNum: 32000000,
    categoria: "Hub Financiero",
    atributo: "Estrategico",
    imagen: "/img/territorio_singapur.jpg",
    descripcion:
      "El principal centro financiero y logístico de Asia-Pacífico. Territorio hiperconectado con infraestructuras futuristas y dominio de rutas comerciales de alto tonelaje marítimo y aéreo.",
    caracteristicas: [
      "Comercio: Uno de los puertos comerciales de mayor volumen del mundo.",
      "Finanzas: Sede regional de los fondos soberanos e instituciones bancarias más influyentes.",
      "Smart Territory: Red digital y de telecomunicaciones con tecnología de última generación.",
      "Seguridad Jurídica: Sistema legal eficiente y favorable para el crecimiento de capital."
    ],
    destacado: true
  },
  {
    id: 7,
    nombre: "Fiordos de Noruega",
    superficie: "385,207 km²",
    superficieNum: 385207,
    poblacion: "5.4M hab.",
    poblacionNum: 5400000,
    precio: "$19,400,000",
    precioNum: 19400000,
    categoria: "Alta Plusvalia",
    atributo: "Sustentable",
    imagen: "/img/territorio_noruega.jpg",
    descripcion:
      "Nación pionera en bienestar humano, sostenibilidad y solidez fiscal. Sus majestuosos fiordos albergan reservas energéticas limpias, soberanía alimentaria y uno de los mayores fondos soberanos del planeta.",
    caracteristicas: [
      "Fondo Soberano: Respaldo financiero público extraordinario y estable.",
      "Energía: Matriz hidroeléctrica limpia y renovable con excedentes exportables.",
      "Índice de Desarrollo: Reconocida sistemáticamente en la cima del IDH mundial.",
      "Patrimonio: Territorios costeros y glaciares protegidos de incalculable valor ambiental."
    ],
    destacado: false
  },
  {
    id: 8,
    nombre: "Groenlandia Artica",
    superficie: "2,166,086 km²",
    superficieNum: 2166086,
    poblacion: "56,500 hab.",
    poblacionNum: 56500,
    precio: "$9,750,000",
    precioNum: 9750000,
    categoria: "Estrategico",
    atributo: "Oferta Especial",
    imagen: "/img/territorio_groenlandia.jpg",
    descripcion:
      "La mayor isla del globo terráqueo y la nueva frontera de inversión geopolítica. Concentra los más ricos yacimientos vírgenes de tierras raras y domina la apertura de las rutas de navegación árticas.",
    caracteristicas: [
      "Tierras Raras: Depósitos minerales críticos para las industrias del futuro y baterías.",
      "Paso Marítimo: Dominio geográfico sobre las rutas de navegación árticas en expansión.",
      "Extensión: Gran reserva territorial con proyección de crecimiento exponencial.",
      "Exclusividad: Una de las adquisiciones soberanas más ambiciosas de la era moderna."
    ],
    destacado: false,
    oferta: true
  },
  {
    id: 9,
    nombre: "Colombia",
    superficie: "2,166 km²",
    superficieNum: 12324,
    poblacion: "13,000 hab.",
    poblacionNum: 13000,
    precio: "$9,400,000",
    precioNum: 9400000,
    categoria: "Paradisiaco",
    atributo: "Oferta Especial",
    imagen: "/img/territorio_groenlandia.jpg",
    descripcion:
      "Colombia, conocida por su diversidad cultural y natural, ofrece oportunidades únicas en inversión y desarrollo sostenible.",
    caracteristicas: [
      "Paisaje: Variedad de ecosistemas que van desde playas hasta montañas y selvas.",
      "Cultura: Rica herencia cultural con comunidades indígenas y mestizas.",
      "Biodiversidad: Habitat para una gran variedad de especies endémicas.",
      "Exclusividad: Una de las adquisiciones soberanas más ambiciosas de la era moderna."
    ],
    destacado: false,
    oferta: true
  }
];
