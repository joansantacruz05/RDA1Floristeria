import { RouterProvider } from "react-router";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { SupabaseProvider } from "./context/SupabaseContext";
import { router } from "./routes";

export default function App() {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </SupabaseProvider>
  );
}
