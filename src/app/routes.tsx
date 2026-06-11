import { createHashRouter, Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Home } from "./pages/Home";
import { Ramos } from "./pages/Ramos";
import { Detalles } from "./pages/Detalles";
import { PedidosEspeciales } from "./pages/PedidosEspeciales";
import { Carrito } from "./pages/Carrito";
import { ProductoDetalle } from "./pages/ProductoDetalle";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Account } from "./pages/Account";
import { RecuperarContrasena } from "./pages/RecuperarContrasena";

function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <div className="text-6xl">🌸</div>
      <h1 className="text-stone-700" style={{ fontFamily: "Georgia, serif" }}>
        Página no encontrada
      </h1>
      <a href="/" className="text-rose-500 hover:text-rose-600 text-sm">
        Volver al inicio
      </a>
    </div>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "ramos", Component: Ramos },
      { path: "detalles", Component: Detalles },
      { path: "pedidos-especiales", Component: PedidosEspeciales },
      { path: "carrito", Component: Carrito },
      { path: "producto/:id", Component: ProductoDetalle },
      { path: "login", Component: Login },
      { path: "registro", Component: Register },
      { path: "recuperar", Component: RecuperarContrasena },
      { path: "cuenta", Component: Account },
      { path: "*", Component: NotFound },
    ],
  },
]);
