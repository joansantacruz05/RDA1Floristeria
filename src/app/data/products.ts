import {
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10,
} from "./localImages";

export type Category = "ramos" | "detalles";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  badge?: string;
  rating: number;
  reviews: number;
  tags: string[];
}

export const products: Product[] = [
  // ─── RAMOS ───────────────────────────────────────────────
  {
    id: 1,
    name: "Ramo Rosas Rosadas",
    description:
      "Rosas rosadas frescas del día. Perfectas para decir 'te quiero' sin palabras. Incluye envoltorio artesanal y lazo de organza.",
    price: 15.00,
    image: img1,
    category: "ramos",
    badge: "Más vendido",
    rating: 4.9,
    reviews: 128,
    tags: ["rosas", "romántico", "cumpleaños", "regalo"],
  },
  {
    id: 2,
    name: "Ramo de Girasoles",
    description:
      "Los girasoles siempre traen buen rollo. Pura alegría y luz ecuatoriana, ideales para alegrarle el día a alguien muy especial.",
    price: 12.00,
    image: img2,
    category: "ramos",
    badge: "Nueva llegada",
    rating: 4.7,
    reviews: 89,
    tags: ["girasoles", "alegría", "regalo"],
  },
  {
    id: 3,
    name: "Ramo Primaveral Mixto",
    description:
      "Un mix de flores de temporada súper colorido. Tulipanes, margaritas, rosas... cada ramo es único y sale directo de nuestro jardín.",
    price: 18.00,
    image: img3,
    category: "ramos",
    rating: 4.8,
    reviews: 74,
    tags: ["mixto", "primavera", "colorido", "regalo"],
  },
  {
    id: 4,
    name: "Ramo Rosas Rojas Pasión",
    description:
      "El clásico que nunca falla. 12 rosas rojas de tallo largo que lo dicen todo. Perfecto para aniversarios y momentos que importan.",
    price: 22.00,
    image: img4,
    category: "ramos",
    badge: "Edición especial",
    rating: 5.0,
    reviews: 203,
    tags: ["rosas rojas", "amor", "aniversario", "regalo"],
  },
  {
    id: 10,
    name: "Ramo de Tulipanes",
    description:
      "Tulipanes frescos en tonos pastel que llenan de color cualquier espacio. Ideales para alguien que ama lo diferente y vibrante.",
    price: 16.00,
    image: img5,
    category: "ramos",
    badge: "Temporada",
    rating: 4.8,
    reviews: 61,
    tags: ["tulipanes", "colorido", "regalo", "primavera"],
  },
  {
    id: 11,
    name: "Ramo de Peonías",
    description:
      "Las peonías más exuberantes de nuestra temporada. Voluminosas, fragantes y absolutamente irresistibles. Llegan en papel kraft.",
    price: 28.00,
    image: img6,
    category: "ramos",
    badge: "Premium",
    rating: 4.9,
    reviews: 47,
    tags: ["peonías", "romántico", "cumpleaños", "regalo"],
  },
  {
    id: 12,
    name: "Ramo Lavanda y Eucalipto",
    description:
      "Combinación aromática de lavanda silvestre y ramas de eucalipto. Perfecto para llenar el hogar de paz y buen olor natural.",
    price: 13.00,
    image: img7,
    category: "ramos",
    rating: 4.6,
    reviews: 38,
    tags: ["lavanda", "aromático", "hogar", "decoración"],
  },
  {
    id: 13,
    name: "Ramo de Lirios Blancos",
    description:
      "Delicados lirios blancos con su aroma característico. Elegancia natural para momentos especiales y bodas civiles.",
    price: 19.00,
    image: img8,
    category: "ramos",
    rating: 4.7,
    reviews: 53,
    tags: ["lirios", "blanco", "elegante", "bodas"],
  },
  {
    id: 14,
    name: "Ramo Silvestre del Campo",
    description:
      "Flores silvestres recogidas con amor. Un ramo que parece sacado directamente de un prado ecuatoriano. Pura naturaleza.",
    price: 10.00,
    image: img9,
    category: "ramos",
    badge: "Económico",
    rating: 4.5,
    reviews: 82,
    tags: ["silvestre", "natural", "campo", "regalo"],
  },
  {
    id: 15,
    name: "Ramo Rosas Blancas Pureza",
    description:
      "Rosas blancas de tallo largo que simbolizan pureza y nuevos comienzos. Ideales para bodas, bautizos y quince años.",
    price: 24.00,
    image: img10,
    category: "ramos",
    rating: 4.9,
    reviews: 115,
    tags: ["rosas blancas", "bodas", "pureza", "elegante"],
  },
  {
    id: 21,
    name: "Ramo Rosas Amarillas",
    description:
      "Las rosas amarillas representan amistad y alegría. Un regalo perfecto para celebrar una amistad o llevar sonrisas a quien más quieres.",
    price: 17.00,
    image: img2,
    category: "ramos",
    rating: 4.7,
    reviews: 43,
    tags: ["rosas amarillas", "amistad", "alegría", "regalo"],
  },
  {
    id: 22,
    name: "Ramo Multicolor Arcoíris",
    description:
      "Un ramo explosivo con rosas de todos los colores. Para cuando quieres decirlo todo sin elegir uno solo. Pura fiesta de colores.",
    price: 20.00,
    image: img3,
    category: "ramos",
    badge: "Impactante",
    rating: 4.8,
    reviews: 66,
    tags: ["multicolor", "festivo", "cumpleaños", "regalo"],
  },
  {
    id: 23,
    name: "Ramo Rosas Bicolor",
    description:
      "Rosas bicolores exclusivas en tonos rojo-amarillo que crean un efecto visual único. Cada rosa es diferente y sorprendente.",
    price: 25.00,
    image: img1,
    category: "ramos",
    badge: "Exclusivo",
    rating: 4.9,
    reviews: 29,
    tags: ["rosas bicolor", "elegante", "aniversario", "regalo"],
  },
  {
    id: 24,
    name: "Ramo Rosas Salmón",
    description:
      "Rosas en tono salmón y melocotón, perfectas para expresar admiración y gratitud. Un ramo sofisticado para personas especiales.",
    price: 21.00,
    image: img3,
    category: "ramos",
    rating: 4.7,
    reviews: 38,
    tags: ["rosas salmón", "romántico", "regalo", "elegante"],
  },
  {
    id: 25,
    name: "Ramo Grande 24 Rosas",
    description:
      "Veinticuatro rosas rojas seleccionadas a mano en un ramo espectacular. Para los momentos que merecen el mejor detalle.",
    price: 38.00,
    image: img4,
    category: "ramos",
    badge: "Gran formato",
    rating: 5.0,
    reviews: 77,
    tags: ["rosas rojas", "amor", "aniversario", "grande"],
  },

  // ─── DETALLES ─────────────────────────────────────────────
  {
    id: 5,
    name: "Arreglo Floral Elegante",
    description:
      "Para esos eventos donde todo tiene que ser perfecto. Flores blancas y verdes en un diseño sofisticado que enamora a primera vista.",
    price: 45.00,
    image: img5,
    category: "detalles",
    badge: "Premium",
    rating: 4.9,
    reviews: 56,
    tags: ["bodas", "elegante", "blanco", "decoración"],
  },
  {
    id: 6,
    name: "Ramo + Osito de Peluche",
    description:
      "Un ramo de rosas coloridas combinado con un tierno osito de peluche. El detalle perfecto para cumpleaños, San Valentín o simplemente sorprender.",
    price: 29.00,
    image: img1,
    category: "detalles",
    badge: "Combo especial",
    rating: 4.9,
    reviews: 94,
    tags: ["osito", "cumpleaños", "regalo", "romántico"],
  },
  {
    id: 7,
    name: "Caja de Flores Silvestres",
    description:
      "Flores frescas de nuestra región en una caja artesanal preciosa. Huele increíble y se ve aún mejor. Un detalle para recordar.",
    price: 18.00,
    image: img7,
    category: "detalles",
    badge: "Favorito",
    rating: 4.8,
    reviews: 91,
    tags: ["silvestre", "caja", "artesanal", "regalo", "cumpleaños"],
  },
  {
    id: 8,
    name: "Centro de Mesa Floral",
    description:
      "Un centro de mesa que hace que cualquier celebración sea especial. Flores de temporada en un arreglo que da gusto mirar.",
    price: 32.00,
    image: img8,
    category: "detalles",
    rating: 4.7,
    reviews: 38,
    tags: ["centro de mesa", "bodas", "decoración", "eventos"],
  },
  {
    id: 9,
    name: "Orquídea en Maceta",
    description:
      "Una orquídea hermosa que dura semanas si la cuidas bien. Viene en una maceta artesanal lista para regalar o decorar tu hogar.",
    price: 25.00,
    image: img9,
    category: "detalles",
    badge: "Larga duración",
    rating: 4.9,
    reviews: 67,
    tags: ["orquídea", "planta", "hogar", "decoración"],
  },
  {
    id: 16,
    name: "Ramo + Globo Personalizado",
    description:
      "Ramo de rosas frescas acompañado de un globo con el mensaje que tú elijas. Ideal para cumpleaños, aniversarios y baby showers.",
    price: 32.00,
    image: img2,
    category: "detalles",
    badge: "Personalizable",
    rating: 4.8,
    reviews: 52,
    tags: ["globo", "cumpleaños", "regalo", "personalizado"],
  },
  {
    id: 17,
    name: "Caja de Rosas Premium",
    description:
      "Una caja elegante con 24 rosas seleccionadas a mano en colores a tu elección. El regalo más lujoso y memorable.",
    price: 55.00,
    image: img6,
    category: "detalles",
    badge: "Lujo",
    rating: 5.0,
    reviews: 43,
    tags: ["caja", "rosas", "regalo", "cumpleaños", "lujo"],
  },
  {
    id: 18,
    name: "Arreglo Bodas Blanco",
    description:
      "Arreglo floral en tonos blancos y verdes para bodas y eventos formales. Diseño sofisticado con rosas, lirios y follaje seleccionado.",
    price: 65.00,
    image: img10,
    category: "detalles",
    badge: "Exclusivo",
    rating: 4.8,
    reviews: 29,
    tags: ["bodas", "blanco", "elegante", "decoración"],
  },
  {
    id: 19,
    name: "Ramo + Chocolates Ferrero",
    description:
      "Ramo de flores frescas con una caja de chocolates Ferrero Rocher. El combo más dulce para el regalo más especial del año.",
    price: 38.00,
    image: img6,
    category: "detalles",
    rating: 4.7,
    reviews: 71,
    tags: ["chocolates", "cumpleaños", "regalo", "romántico"],
  },
  {
    id: 20,
    name: "Ramo de Novia Clásico",
    description:
      "Ramo de novia tradicional en blanco y verde. Hecho a medida con rosas, lirios y follaje seleccionado para el día más especial.",
    price: 75.00,
    image: img10,
    category: "detalles",
    badge: "Para novias",
    rating: 5.0,
    reviews: 34,
    tags: ["bodas", "novia", "blanco", "elegante", "regalo"],
  },
  {
    id: 26,
    name: "Arreglo Baby Shower",
    description:
      "Arreglo floral suave en tonos rosados o celestes ideal para baby showers. Flores delicadas que celebran la llegada de un nuevo bebé.",
    price: 35.00,
    image: img5,
    category: "detalles",
    rating: 4.8,
    reviews: 45,
    tags: ["baby shower", "regalo", "cumpleaños", "decoración"],
  },
  {
    id: 27,
    name: "Ramo + Vela Aromática",
    description:
      "Ramo de flores frescas acompañado de una vela aromática artesanal. Un combo perfecto para crear un ambiente especial en casa.",
    price: 33.00,
    image: img3,
    category: "detalles",
    rating: 4.6,
    reviews: 28,
    tags: ["vela", "aromático", "hogar", "regalo"],
  },
  {
    id: 28,
    name: "Caja Sorpresa Floral",
    description:
      "Una caja misteriosa llena de flores frescas de temporada seleccionadas por nuestros expertos. Cada caja es única e irrepetible.",
    price: 27.00,
    image: img4,
    category: "detalles",
    badge: "Sorpresa",
    rating: 4.7,
    reviews: 60,
    tags: ["caja", "sorpresa", "regalo", "cumpleaños"],
  },
];
