import {
  img1, img2, img3, img4, img5, img6, img7, img8, img9,
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
  // RAMOS
  {
    id: 1,
    name: "Me Enamoré",
    description:
      "Dile todo el amor que sientes y demuéstralo con un detalle lleno de mucho cariño. Disponible en: 12 rosas rojas $25.00 · 24 rosas rojas $33.00",
    price: 25.00,
    image: img1,
    category: "ramos",
    badge: "Más vendido",
    rating: 4.9,
    reviews: 128,
    tags: ["rosas rojas", "romántico", "amor"],
  },
  {
    id: 2,
    name: "Tú y Yo",
    description:
      "Envía un detalle y demuestra tu sinceridad y entrega. Disponible en: 18 rosas rosadas $29.00 · 24 rosas rosadas $33.00",
    price: 29.00,
    image: img2,
    category: "ramos",
    rating: 4.8,
    reviews: 95,
    tags: ["rosas rosadas", "romántico", "aniversario"],
  },
  {
    id: 3,
    name: "Alegre Sorpresa",
    description:
      "Dile que la extrañas y que estás agradecido. Disponible en: 24 rosas rosadas $36.00 · 36 rosas rosadas $42.00 · 50 rosas rosadas $50.00",
    price: 36.00,
    image: img3,
    category: "ramos",
    badge: "Favorita",
    rating: 4.8,
    reviews: 74,
    tags: ["rosas rosadas", "sorpresa", "cumpleaños"],
  },
  {
    id: 4,
    name: "Todo por Amor",
    description:
      "Manifiesta a esa persona que estás dispuesto a entregarle todo tu amor. Disponible en: 24 rosas rojas $37.00 · 36 rosas rojas $45.00 · 50 rosas rojas $53.00",
    price: 37.00,
    image: img4,
    category: "ramos",
    badge: "Edición especial",
    rating: 5.0,
    reviews: 203,
    tags: ["rosas rojas", "amor", "aniversario"],
  },
  {
    id: 5,
    name: "Te Amo Más de lo que Piensas",
    description:
      "Expresa a la persona especial que es un tesoro. Arreglo en forma de corazón con rosas rojas y girasoles. Disponible en: 12 rosas / 5 girasoles $29.00 · 18 rosas / 5 girasoles $33.00",
    price: 29.00,
    image: img5,
    category: "ramos",
    badge: "Especial",
    rating: 4.9,
    reviews: 56,
    tags: ["rosas", "girasoles", "corazón", "romántico"],
  },
  {
    id: 6,
    name: "Tú Vales la Pena",
    description:
      "Abre tu corazón y expresa todo lo que te hace sentir. Arreglo en caja con rosas rojas y flores blancas. Disponible en: 12 rosas rojas $25.00 · 18 rosas rojas $29.00",
    price: 25.00,
    image: img6,
    category: "ramos",
    rating: 4.7,
    reviews: 88,
    tags: ["rosas rojas", "caja", "detalle"],
  },

  // DETALLES
  {
    id: 7,
    name: "Osito de Felpa",
    description:
      "Acompaña tu arreglo floral con un osito de felpa suave y adorable. El complemento perfecto para hacer tu regalo aún más especial.",
    price: 18.00,
    image: img7,
    category: "detalles",
    badge: "Complemento",
    rating: 4.8,
    reviews: 91,
    tags: ["osito", "regalo", "complemento"],
  },
  {
    id: 8,
    name: "Kit de Acompañamiento",
    description:
      "Complementa tu regalo con globo metálico ($2.00), rótulo con mensaje ($2.00), bombones Ferrero Rocher ($10.00) o mensaje en botella de vidrio ($2.50). Pregúntanos cómo combinarlos.",
    price: 2.00,
    image: img8,
    category: "detalles",
    rating: 4.7,
    reviews: 38,
    tags: ["globo", "bombones", "mensaje", "complemento"],
  },
  {
    id: 9,
    name: "Bombones Ferrero Rocher",
    description:
      "Caja de bombones Ferrero Rocher para endulzar el momento especial. El regalo ideal para acompañar cualquier arreglo floral.",
    price: 10.00,
    image: img9,
    category: "detalles",
    badge: "Delicioso",
    rating: 4.9,
    reviews: 67,
    tags: ["bombones", "chocolate", "regalo"],
  },
];