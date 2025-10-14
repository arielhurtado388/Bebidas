import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import RecetaCard from "../components/RecetaCard";

export default function IndexPagina() {
  const { recetas } = useAppStore();

  const hayRecetas = useMemo(() => recetas.drinks.length, [recetas]);

  return (
    <>
      <h1 className="text-5xl font-extrabold">Recetas</h1>
      {hayRecetas ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10 ">
          {recetas.drinks.map((receta) => (
            <RecetaCard key={receta.idDrink} receta={receta} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-xl">
          No hay resultados aún, utiliza el formulario para buscar
        </p>
      )}
    </>
  );
}
