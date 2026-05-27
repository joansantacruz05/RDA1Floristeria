import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

const USERS_KEY = "av_users";
const CURRENT_USER_KEY = "av_current_user";
const ORDERS_KEY = "av_orders";
const REVIEWS_KEY = "av_reviews";

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getUsers(): Record<string, { user: User; password: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

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

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    const entry = users[key];
    if (!entry || entry.password !== password) return false;
    setUser(entry.user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(entry.user));
    return true;
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    if (users[key]) return false;
    const newUser: User = { id: generateId(), name: name.trim(), email: key, phone };
    users[key] = { user: newUser, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
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
