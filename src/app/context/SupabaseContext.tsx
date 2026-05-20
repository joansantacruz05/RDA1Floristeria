import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/app/data/products";
import { fetchProducts } from "@/lib/supabase-service";

interface SupabaseContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const SupabaseContext = createContext<SupabaseContextValue>({
  products: [],
  loading: true,
  error: null,
});

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <SupabaseContext.Provider value={{ products, loading, error }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabaseProducts() {
  return useContext(SupabaseContext);
}
