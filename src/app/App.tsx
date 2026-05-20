import { RouterProvider } from "react-router";
import { CartProvider } from "./context/CartContext";
import { SupabaseProvider } from "./context/SupabaseContext";
import { router } from "./routes";

export default function App() {
  return (
    <SupabaseProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </SupabaseProvider>
  );
}
