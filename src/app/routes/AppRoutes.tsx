import { Navigate, Route, Routes } from "react-router-dom";
import { GuardRoute } from "../../guards/GuardRoute";
import { useStore } from "../../store/StoreProvider";
import { HomePage } from "../pages/HomePage";
import ContactoPage from "../pages/ContactoPage";
import { ProductosPage } from "../pages/ProductosPage";
import { TrabajosPage } from "../pages/TrabajosPage";
import { ContratanosPage } from "../pages/ContratanosPage";



import { CarritoPage } from "../pages/CarritoPage";

export const AppRoutes = () => {
  const { auth } = useStore();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuardRoute auth={auth}>
            <Navigate to={"/app/home"} />
          </GuardRoute>
        }
      />
      <Route
        path="/home"
        element={
          <GuardRoute auth={auth}>
            <HomePage />
          </GuardRoute>
        }
        children={
          <>
            <Route path="contacto" element={<ContactoPage />} />
            <Route path="productos" element={<ProductosPage />} />
            <Route path="trabajos" element={<TrabajosPage />} />
            <Route path="contratanos" element={<ContratanosPage />} />
            <Route path="carrito" element={<CarritoPage />} />
          </>
        
      }

      
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
