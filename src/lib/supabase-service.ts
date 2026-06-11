import { supabase } from "./supabase";
import { products as localProducts } from "@/app/data/products";
import type { Product } from "@/app/data/products";

// ── PRODUCTOS ────────────────────────────────────────────────

export async function obtenerProductos(categoria?: "ramos" | "detalles"): Promise<Product[]> {
  if (!supabase) {
    console.warn("Supabase no configurado, usando productos locales");
    return localProducts;
  }

  let query = supabase
    .from("productos")
    .select("*, producto_tags(tag)")
    .eq("activo", true)
    .order("id");

  if (categoria) query = query.eq("categoria", categoria);

  const { data, error } = await query;

  if (error) {
    console.error("Error al cargar productos de Supabase:", error.message);
    return localProducts;
  }

  if (!data || data.length === 0) return localProducts;

  const localMap = new Map(localProducts.map((p) => [p.id, p]));
  const localImages = [...new Set(localProducts.map((p) => p.image))];

  return data.map((row: any) => ({
    id: row.id,
    name: row.nombre,
    description: row.descripcion,
    price: Number(row.precio),
    image: row.imagen_url || localMap.get(row.id)?.image || localImages[row.id % localImages.length],
    category: row.categoria as Product["category"],
    badge: row.badge || undefined,
    rating: row.rating,
    reviews: row.num_reseñas,
    tags: row.producto_tags?.map((t: any) => t.tag) || localMap.get(row.id)?.tags || [],
    stock: row.stock,
    stock_minimo: row.stock_minimo,
  }));
}

// ── AUTH ──────────────────────────────────────────────────────

export async function registrarUsuario(
  nombre: string,
  email: string,
  password: string,
  telefono?: string
) {
  if (!supabase) throw new Error("Supabase no configurado");
  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase().trim(),
    password,
    options: { data: { name: nombre } },
  });
  if (error) throw error;
  if (data.user) {
    const { error: insertError } = await supabase.from("clientes").insert({
      id: data.user.id,
      nombre: nombre.trim(),
      email: data.user.email || email.toLowerCase().trim(),
      telefono: telefono || null,
    });
    if (insertError && insertError.code !== "23505") throw insertError;
  }
  return data.user;
}

export async function loginUsuario(email: string, password: string) {
  if (!supabase) throw new Error("Supabase no configurado");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  });
  if (error) throw error;
  return data.user;
}

export async function logoutUsuario() {
  if (supabase) await supabase.auth.signOut();
}

export async function actualizarPassword(nuevaPassword: string) {
  if (!supabase) throw new Error("Supabase no configurado");
  const { error } = await supabase.auth.updateUser({ password: nuevaPassword });
  if (error) throw error;
}

export async function obtenerSesion() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ── PEDIDOS ───────────────────────────────────────────────────

export async function guardarPedido(
  clienteId: string,
  idLocal: string,
  total: number,
  items: {
    producto_id?: number;
    nombre_producto: string;
    cantidad: number;
    precio_unitario: number;
    imagen_url?: string;
  }[]
) {
  if (!supabase) return null;

  const { data: pedido, error: errorPedido } = await supabase
    .from("pedidos")
    .insert({ cliente_id: clienteId, id_local: idLocal, total, estado: "pendiente" })
    .select()
    .single();

  if (errorPedido) throw errorPedido;

  const itemsConPedido = items.map((item) => ({ ...item, pedido_id: pedido.id }));
  const { error: errorItems } = await supabase.from("pedido_items").insert(itemsConPedido);
  if (errorItems) throw errorItems;

  for (const item of items) {
    if (item.producto_id) {
      await supabase.rpc("decrementar_stock", {
        pid: item.producto_id,
        cantidad: item.cantidad,
      });
    }
  }

  return pedido;
}

export async function obtenerPedidos(clienteId: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("pedidos")
    .select("id, id_local, estado, total, creado_en, pedido_items(id, nombre_producto, cantidad, precio_unitario, imagen_url)")
    .eq("cliente_id", clienteId)
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("Error al cargar pedidos:", error.message);
    return [];
  }
  return data || [];
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
  if (!supabase) return;
  const { error } = await supabase.from("pedidos_especiales").insert({
    ...data,
    estado: "recibido",
  });
  if (error) throw error;
}

export interface ResenaPublica {
  id: number;
  cliente_id: string;
  nombre_producto: string;
  calificacion: number;
  comentario: string;
  creado_en: string;
  cliente_nombre: string;
}

// ── RESEÑAS ───────────────────────────────────────────────────

export async function guardarResena(
  clienteId: string,
  pedidoIdLocal: string,
  productoId: number,
  nombreProducto: string,
  calificacion: number,
  comentario: string
) {
  if (!supabase) return;

  const { data: pedido } = await supabase
    .from("pedidos")
    .select("id")
    .eq("id_local", pedidoIdLocal)
    .eq("cliente_id", clienteId)
    .single();

  const { data, error } = await supabase
    .from("reseñas")
    .insert({
      cliente_id: clienteId,
      pedido_id: pedido?.id ?? null,
      id_local_pedido: pedidoIdLocal,
      producto_id: productoId,
      nombre_producto: nombreProducto,
      calificacion,
      comentario,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function obtenerResenasPedido(clienteId: string, pedidoIdLocal: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reseñas")
    .select("*")
    .eq("cliente_id", clienteId)
    .eq("id_local_pedido", pedidoIdLocal);

  if (error) {
    console.error("Error al cargar reseñas:", error.message);
    return [];
  }
  return data || [];
}

export async function obtenerResenasProducto(productoId: number): Promise<ResenaPublica[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reseñas")
    .select("id, cliente_id, nombre_producto, calificacion, comentario, creado_en, clientes(nombre)")
    .eq("producto_id", productoId)
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("Error al cargar reseñas del producto:", error.message);
    return [];
  }
  return (data || []).map((r: any) => ({
    id: r.id,
    cliente_id: r.cliente_id,
    nombre_producto: r.nombre_producto,
    calificacion: r.calificacion,
    comentario: r.comentario,
    creado_en: r.creado_en,
    cliente_nombre: r.clientes?.nombre || "Usuario",
  }));
}
