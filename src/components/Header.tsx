import { useEffect, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import FormularioBuscador from "./FormularioBuscador";

export default function Header() {
  const { pathname } = useLocation();

  const fetchCategorias = useAppStore((state) => state.fetchCategorias);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const esInicio = useMemo(() => pathname === "/", [pathname]);

  return (
    <header
      className={
        esInicio ? "bg-header bg-cover bg-no-repeat bg-center" : "bg-slate-800"
      }
    >
      <div className="max-w-[95%] md:max-w-3/4 2xl:max-w-4/5 mx-auto py-16">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img className="w-32" src="/logo.svg" alt="Logo" />
          </Link>
          <nav className="flex gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {esInicio && <FormularioBuscador />}
      </div>
    </header>
  );
}
