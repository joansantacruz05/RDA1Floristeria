import {
  img1, img2, img3, img4, img5, img6, img7, img8, img9,
  img11, img12, img13,
} from "./localImages";

export type Category = "ramos" | "detalles";

export type Occasion =
  | "Cumpleaños"
  | "Bodas"
  | "Aniversario"
  | "Decoración"
  | "Regalo"
  | "Funeral"
  | "Graduación";

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
  occasion?: Occasion;
}

export const products: Product[] = [
  // ===== RAMOS =====
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
    occasion: "Cumpleaños",
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
    occasion: "Aniversario",
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
    occasion: "Cumpleaños",
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
    occasion: "Aniversario",
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
    occasion: "Bodas",
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
    occasion: "Regalo",
  },
  {
    id: 10,
    name: "Girasol de Esperanza",
    description:
      "Ramo vibrante de girasoles ecuatorianos acompanado de flores silvestres. Ideal para iluminar cualquier espacio y alegrar el dia.",
    price: 22.00,
    image: img11,
    category: "ramos",
    badge: "Nuevo",
    rating: 4.8,
    reviews: 42,
    tags: ["girasoles", "alegre", "colorido"],
    occasion: "Cumpleaños",
  },
  {
    id: 11,
    name: "Elegante Amanecer",
    description:
      "Composicion de rosas blancas, lirios y eucalipto en un diseno minimalista y sofisticado. Perfecto para decorar o regalar.",
    price: 32.00,
    image: img12,
    category: "ramos",
    rating: 4.9,
    reviews: 33,
    tags: ["rosas blancas", "lirios", "elegante"],
    occasion: "Decoración",
  },
  {
    id: 12,
    name: "Lluvia de Estrellas",
    description:
      "Mezcla de flores de temporada en tonos pastel con lavanda y eucalipto. Un ramo fresco y natural como la brisa de la manana.",
    price: 28.00,
    image: img13,
    category: "ramos",
    badge: "Popular",
    rating: 4.7,
    reviews: 58,
    tags: ["mixto", "pastel", "fresco", "natural"],
    occasion: "Graduación",
  },

  // ===== DETALLES =====
  {
    id: 7,
    name: "Osito de Felpa",
    description:
      "Acompana tu arreglo floral con un osito de felpa suave y adorable. El complemento perfecto para hacer tu regalo aun mas especial.",
    price: 18.00,
    image: img7,
    category: "detalles",
    badge: "Complemento",
    rating: 4.8,
    reviews: 91,
    tags: ["osito", "regalo", "complemento"],
    occasion: "Regalo",
  },
  {
    id: 8,
    name: "Kit de Acompanamiento",
    description:
      "Complementa tu regalo con globo metalico ($2.00), rotulo con mensaje ($2.00), bombones Ferrero Rocher ($10.00) o mensaje en botella de vidrio ($2.50). Preguntanos como combinarlos.",
    price: 2.00,
    image: img8,
    category: "detalles",
    rating: 4.7,
    reviews: 38,
    tags: ["globo", "bombones", "mensaje", "complemento"],
    occasion: "Regalo",
  },
  {
    id: 9,
    name: "Bombones Ferrero Rocher",
    description:
      "Caja de bombones Ferrero Rocher para endulzar el momento especial. El regalo ideal para acompanar cualquier arreglo floral.",
    price: 10.00,
    image: img9,
    category: "detalles",
    badge: "Delicioso",
    rating: 4.9,
    reviews: 67,
    tags: ["bombones", "chocolate", "regalo"],
    occasion: "Regalo",
  },
  {
    id: 13,
    name: "Ramo + Osito",
    description:
      "Nuestro combo mas querido: un ramo de 12 rosas rojas acompanado de un osito de felpa. El regalo completo que dice todo por ti.",
    price: 38.00,
    image: img1,
    category: "detalles",
    badge: "Combo",
    rating: 4.9,
    reviews: 112,
    tags: ["rosas", "osito", "combo", "romantico"],
    occasion: "Aniversario",
  },
  {
    id: 14,
    name: "Ramo + Bombones",
    description:
      "Flores y chocolate, la combinacion infalible. Ramo de rosas rosadas con una caja de Ferrero Rocher. Perfecto para consentir.",
    price: 35.00,
    image: img2,
    category: "detalles",
    badge: "Favorito",
    rating: 4.8,
    reviews: 76,
    tags: ["rosas", "bombones", "combo", "chocolate"],
    occasion: "Cumpleaños",
  },
  {
    id: 15,
    name: "Ramo + Globo Metalico",
    description:
      "Ramo de girasoles con un globo metalico con forma de corazon. Un detalle alegre y lleno de luz que arranca sonrisas.",
    price: 30.00,
    image: img11,
    category: "detalles",
    badge: "Divertido",
    rating: 4.7,
    reviews: 44,
    tags: ["girasoles", "globo", "combo", "alegre"],
    occasion: "Cumpleaños",
  },
  {
    id: 16,
    name: "Caja Floral + Oso",
    description:
      "Elegante caja de rosas blancas y flores de temporada con un osito de felpa sentado dentro. Un regalo de impacto visual.",
    price: 42.00,
    image: img6,
    category: "detalles",
    badge: "Premium",
    rating: 5.0,
    reviews: 29,
    tags: ["caja", "osito", "rosas", "elegante"],
    occasion: "Bodas",
  },
];