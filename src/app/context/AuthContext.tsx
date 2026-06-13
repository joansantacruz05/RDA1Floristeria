import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import {
  loginUsuario,
  registrarUsuario as registrarUsuarioSupabase,
  logoutUsuario,
  obtenerPedidos,
  guardarPedido,
  guardarResena,
  obtenerResenasPedido,
} from "@/lib/supabase-service";

export interface Review {
  id: string;
  orderId: string;
  productId: number;
  productName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "pendiente" | "confirmado" | "en_camino" | "entregado" | "cancelado";
  reviews?: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  reviews: Review[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  saveOrder: (order: Omit<Order, "id" | "date" | "status">) => string;
  addReview: (review: Omit<Review, "id" | "date">) => void;
  getOrderReviews: (orderId: string) => Review[];
  hasReviewedOrder: (orderId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const CURRENT_USER_KEY = "av_current_user";
const ORDERS_KEY = "av_orders";
const REVIEWS_KEY = "av_reviews";

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getLocalUser(): User | null {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function mapSupabaseUser(user: any): User {
  const meta = user.user_metadata || {};
  return {
    id: user.id,
    name: meta.name || user.email?.split("@")[0] || "Usuario",
    email: user.email || "",
    phone: meta.phone || "",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    (async () => {
      if (supabase) {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          const mapped = mapSupabaseUser(data.user);
          setUser(mapped);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mapped));
        } else {
          const local = getLocalUser();
          if (local) setUser(local);
        }
      } else {
        const local = getLocalUser();
        if (local) setUser(local);
      }
    })();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        sessionStorage.setItem("av_recovery_hash", "true");
      }
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (supabase) {
      try {
        const supabaseUser = await loginUsuario(email, password);
        if (supabaseUser) {
          const mapped = mapSupabaseUser(supabaseUser);
          setUser(mapped);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mapped));
          return true;
        }
      } catch {
        // Fallback a localStorage
      }
    }

    const key = email.toLowerCase().trim();
    const users = getLocalUsers();
    const entry = users[key];
    if (!entry) return false;
    const passwordHash = await hashPassword(password);
    if (entry.passwordHash !== passwordHash) return false;
    setUser(entry.user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(entry.user));
    return true;
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    if (supabase) {
      try {
        const supabaseUser = await registrarUsuarioSupabase(name, email, password, phone);
        if (supabaseUser) {
          const mapped = mapSupabaseUser(supabaseUser);
          setUser(mapped);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mapped));
          return true;
        }
      } catch {
        // Fallback a localStorage
      }
    }

    const key = email.toLowerCase().trim();
    const users = getLocalUsers();
    if (users[key]) return false;
    const newUser: User = { id: generateId(), name: name.trim(), email: key, phone };
    const passwordHash = await hashPassword(password);
    users[key] = { user: newUser, passwordHash };
    setLocalUsers(users);
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = async () => {
    await logoutUsuario();
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const saveOrder = (orderData: Omit<Order, "id" | "date" | "status">): string => {
    const newOrder: Order = {
      ...orderData,
      id: generateId(),
      date: new Date().toISOString(),
      status: "pendiente",
    };

    // Guardar en Supabase si está configurado
    if (supabase && user) {
      guardarPedido(
        user.id,
        newOrder.id,
        newOrder.total,
        newOrder.items.map((i) => ({
          producto_id: i.id,
          nombre_producto: i.name,
          cantidad: i.quantity,
          precio_unitario: i.price,
          imagen_url: i.image,
        }))
      ).catch((err) => console.error("Error al guardar pedido en Supabase:", err));
    }

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder.id;
  };

  const addReview = (reviewData: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...reviewData,
      id: generateId(),
      date: new Date().toISOString(),
    };

    if (supabase && user) {
      guardarResena(
        user.id,
        reviewData.orderId,
        reviewData.productId,
        reviewData.productName,
        reviewData.rating,
        reviewData.comment,
        user.name,
        user.email
      ).catch((err) => console.error("Error al guardar reseña en Supabase:", err));
    }

    setReviews((prev) => [...prev, newReview]);
  };

  const getOrderReviews = (orderId: string) =>
    reviews.filter((r) => r.orderId === orderId);

  const hasReviewedOrder = (orderId: string) =>
    reviews.some((r) => r.orderId === orderId);

  return (
    <AuthContext.Provider
      value={{
        user,
        orders: user ? orders : [],
        reviews,
        login,
        register,
        logout,
        saveOrder,
        addReview,
        getOrderReviews,
        hasReviewedOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// ── Password hashing (fallback) ─────────────────────────────

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ── localStorage helpers (fallback) ──────────────────────────
const USERS_KEY = "av_users";

interface LocalUserEntry {
  user: User;
  passwordHash: string;
}

function getLocalUsers(): Record<string, LocalUserEntry> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function setLocalUsers(users: Record<string, LocalUserEntry>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
