import {
  img1, img2, img3, img4, img5, img6, img7, img8, img9,
} from "./localImages";

export type Category = "ramos" | "detalles";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // USD
  image: string;
  category: Category;
  badge?: string;
  rating: number;
  reviews: number;
  tags: string[];
}

export const products: Product[] = [
  // RAMOS
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
    tags: ["rosas", "romántico", "cumpleaños"],
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
    tags: ["girasoles", "alegría", "verano"],
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
    tags: ["mixto", "primavera", "colorido"],
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
    tags: ["rosas rojas", "amor", "aniversario"],
  },

  // DETALLES
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
    tags: ["boda", "elegante", "blanco"],
  },
  {
    id: 6,
    name: "Lirios Blancos Delicados",
    description:
      "Lirios blancos que transmiten paz y serenidad. Ideales para momentos donde las palabras sobran y las flores hablan solas.",
    price: 14.00,
    image: img6,
    category: "detalles",
    rating: 4.6,
    reviews: 42,
    tags: ["lirios", "minimalista", "blanco"],
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
    tags: ["silvestre", "caja", "artesanal"],
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
    tags: ["centro de mesa", "eventos", "decoración"],
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
    tags: ["orquídea", "planta", "hogar"],
  },
];
