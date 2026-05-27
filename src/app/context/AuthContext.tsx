import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

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
  status: "pendiente" | "confirmado" | "entregado";
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

async function getSupabaseUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data?.user) return null;
  const meta = data.user.user_metadata;
  return {
    id: data.user.id,
    name: meta?.name || data.user.email?.split("@")[0] || "Usuario",
    email: data.user.email || "",
    phone: meta?.phone || "",
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
      const supabaseUser = await getSupabaseUser();
      if (supabaseUser) {
        setUser(supabaseUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(supabaseUser));
      } else {
        const localUser = getLocalUser();
        if (localUser) setUser(localUser);
      }
    })();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Try Supabase Auth first
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });
      if (!error && data?.user) {
        const meta = data.user.user_metadata;
        const newUser: User = {
          id: data.user.id,
          name: meta?.name || data.user.email?.split("@")[0] || "Usuario",
          email: data.user.email || "",
          phone: meta?.phone || "",
        };
        setUser(newUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
        return true;
      }
    }

    // Fallback: localStorage
    const key = email.toLowerCase().trim();
    const users = getLocalUsers();
    const entry = users[key];
    if (!entry || entry.password !== password) return false;
    setUser(entry.user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(entry.user));
    return true;
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    // Try Supabase Auth first
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: { name, phone },
        },
      });
      if (!error && data?.user) {
        const newUser: User = {
          id: data.user.id,
          name: name.trim(),
          email: data.user.email || "",
          phone,
        };
        setUser(newUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
        return true;
      }
    }

    // Fallback: localStorage
    const key = email.toLowerCase().trim();
    const users = getLocalUsers();
    if (users[key]) return false;
    const newUser: User = { id: generateId(), name: name.trim(), email: key, phone };
    users[key] = { user: newUser, password };
    setLocalUsers(users);
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
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
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      return updated;
    });
    return newOrder.id;
  };

  const addReview = (reviewData: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...reviewData,
      id: generateId(),
      date: new Date().toISOString(),
    };
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
        orders: user ? orders.filter((o) => true) : [],
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

// --- localStorage helpers (fallback) ---
const USERS_KEY = "av_users";

interface LocalUserEntry {
  user: User;
  password: string;
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
