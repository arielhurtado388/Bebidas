import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <header className="bg-slate-800 mx-auto container px-5 py-16">
      <div className="flex justify-between items-center">
        <div>
          <img className="w-32" src="/logo.svg" alt="Logotipo" />
        </div>
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
    </header>
  );
}
