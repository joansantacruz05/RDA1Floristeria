import { supabase } from "./supabase";
import { products as localProducts } from "@/app/data/products";
import type { Product } from "@/app/data/products";

export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) {
    console.warn("Supabase no configurado, usando productos locales");
    return localProducts;
  }

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
  user_id?: string;
  total: number;
  items: { id: number; name: string; price: number; quantity: number }[];
  notas?: string;
  direccion_entrega?: string;
}) {
  if (!supabase) {
    console.warn("Supabase no configurado, pedido no guardado");
    return;
  }
  const { error } = await supabase.from("pedidos").insert({
    user_id: data.user_id,
    total: data.total,
    items: JSON.stringify(data.items),
    estado: "pendiente",
    notas: data.notas,
    direccion_entrega: data.direccion_entrega,
  });
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
  if (!supabase) {
    console.warn("Supabase no configurado, pedido especial no guardado");
    return;
  }
  const { error } = await supabase.from("pedidos_especiales").insert({
    ...data,
    estado: "pendiente",
  });
  if (error) throw new Error(error.message);
}

export async function fetchUserOrders(userId: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error al cargar pedidos:", error.message);
    return [];
  }
  return data || [];
}

export async function submitReview(review: {
  user_id: string;
  order_id: string;
  product_id: number;
  product_name: string;
  rating: number;
  comment: string;
}) {
  if (!supabase) return;
  const { error } = await supabase.from("reviews").insert(review);
  if (error) throw new Error(error.message);
}

export async function fetchUserReviews(userId: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error al cargar reseñas:", error.message);
    return [];
  }
  return data || [];
}
