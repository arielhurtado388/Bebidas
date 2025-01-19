import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });
  const { pathname } = useLocation();

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Validar
    if (Object.values(searchFilters).includes("")) {
      console.log("Todo debe estar lleno");
      return;
    }

    // Consultar las recetas
    searchRecipes(searchFilters);
  };
  const isHome = useMemo(() => pathname === "/", [pathname]);

  return (
    <header
      className={
        isHome ? "bg-header bg-center bg-cover bg-no-repeat" : "bg-slate-800"
      }
    >
      <div className="mx-auto container px-6 py-16">
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

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                className="block text-white uppercase font-extrabold text-lg"
                htmlFor="ingredient"
              >
                Nombre o ingrediente
              </label>
              <input
                className="p-3 w-full rounded-lg focus:outline-none"
                id="ingredient"
                type="text"
                name="ingredient"
                placeholder="Nombre o ingrediente. Ej: Vodka, Café, Tequila"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className="space-y-4">
              <label
                className="block text-white uppercase font-extrabold text-lg"
                htmlFor="category"
              >
                Categoría
              </label>
              <select
                className="p-3 w-full rounded-lg focus:outline-none"
                id="category"
                name="category"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">-- Seleccione --</option>

                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <input
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
              type="submit"
              value="Buscar recetas"
            />
          </form>
        )}
      </div>
    </header>
  );
}
