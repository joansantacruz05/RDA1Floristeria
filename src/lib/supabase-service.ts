import { supabase } from "./supabase";
import { products as localProducts } from "@/app/data/products";
import type { Product } from "@/app/data/products";

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("id");

  if (error) {
    console.error("Error al cargar productos de Supabase, usando locales:", error.message);
    return localProducts;
  }

  if (!data || data.length === 0) {
    return localProducts;
  }

  const localMap = new Map(localProducts.map((p) => [p.id, p]));
  const localImages = [
    ...new Set(localProducts.map((p) => p.image)),
  ];

  return data.map((row) => ({
    id: row.id,
    name: row.nombre,
    description: row.descripcion,
    price: Number(row.precio),
    image: row.imagen_url || localMap.get(row.id)?.image || localImages[row.id % localImages.length],
    category: row.categoria as Product["category"],
    badge: row.badge || undefined,
    rating: row.rating,
    reviews: row.reviews,
    tags: localMap.get(row.id)?.tags || [],
  }));
}

export async function submitOrder(data: {
  total: number;
  estado: string;
  notas?: string;
  direccion_entrega?: string;
}) {
  const { error } = await supabase.from("pedidos").insert(data);
  if (error) throw new Error(error.message);
}

export async function submitSpecialOrder(data: {
  nombre_contacto: string;
  email_contacto: string;
  telefono_contacto: string;
  ocasion: string;
  fecha_evento: string;
  presupuesto: string;
  flores_preferidas?: string[];
  colores?: string;
  descripcion: string;
}) {
  const { error } = await supabase.from("pedidos_especiales").insert({
    ...data,
    estado: "pendiente",
  });
  if (error) throw new Error(error.message);
}
