import { useMemo } from "react";
import RecetaCard from "../components/RecetaCard";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritosPagina() {
  const favoritos = useAppStore((state) => state.favoritos);

  const hayfavoritos = useMemo(() => favoritos.length, [favoritos]);

  return (
    <>
      <h1 className="text-5xl font-extrabold">Favoritos</h1>
      {hayfavoritos ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10 ">
          {favoritos.map((receta) => (
            <RecetaCard key={receta.idDrink} receta={receta} />
          ))}
        </div>
      ) : (
        <p className="text-center my-10 text-xl">
          Los favoritos se mostrarán aquí
        </p>
      )}
    </>
  );
}
