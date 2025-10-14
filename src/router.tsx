import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

const IndexPagina = lazy(() => import("./views/IndexPagina"));
const FavoritosPagina = lazy(() => import("./views/FavoritosPagina"));
const GenerarConIA = lazy(() => import("./views/GenerarConIA"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback="Cargando...">
                <IndexPagina />
              </Suspense>
            }
            index
          />

          <Route
            path="/favoritos"
            element={
              <Suspense fallback="Cargando...">
                <FavoritosPagina />
              </Suspense>
            }
          />

          <Route
            path="/generarconia"
            element={
              <Suspense fallback="Cargando...">
                <GenerarConIA />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
