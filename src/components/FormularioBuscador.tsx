import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function FormularioBuscador() {
  const { categorias, fetchRecetas } = useAppStore();
  const mostrarNotificacion = useAppStore((state) => state.mostrarNotificacion);

  const [filtro, setFiltro] = useState({
    ingrediente: "",
    categoria: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFiltro({
      ...filtro,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(filtro).includes("")) {
      mostrarNotificacion({
        text: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    fetchRecetas(filtro);
  };

  return (
    <form
      className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-14 p-10 rounded-lg shadow space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <label
          className="block uppercase font-extrabold text-lg text-white"
          htmlFor="ingrediente"
        >
          Nombre o ingredientes
        </label>
        <input
          className="p-3 w-full rounded-lg focus:outline-none bg-white"
          id="ingrediente"
          name="ingrediente"
          type="text"
          placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Café"
          onChange={handleChange}
          value={filtro.ingrediente}
        />
      </div>

      <div className="space-y-4">
        <label
          className="block uppercase font-extrabold text-lg text-white"
          htmlFor="categoria"
        >
          Categoría
        </label>
        <select
          className="p-3 w-full rounded-lg focus:outline-none bg-white"
          id="categoria"
          name="categoria"
          onChange={handleChange}
          value={filtro.categoria}
        >
          <option value="">-- Seleccione la categoria --</option>
          {categorias.drinks.map((categoria) => (
            <option key={categoria.strCategory} value={categoria.strCategory}>
              {categoria.strCategory}
            </option>
          ))}
        </select>
      </div>

      <input
        className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
        type="submit"
        value="Buscar"
      />
    </form>
  );
}
