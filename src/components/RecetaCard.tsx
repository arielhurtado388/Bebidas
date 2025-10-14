import { useAppStore } from "../stores/useAppStore";
import type { Receta } from "../types";

type RecetaCardProps = {
  receta: Receta;
};

export default function RecetaCard({ receta }: RecetaCardProps) {
  const seleccionarReceta = useAppStore((state) => state.seleccionarReceta);
  return (
    <div className="shadow-lg">
      <div className="overflow-hidden">
        <img
          className="hover:scale-125 transition-transform hover:rotate-2"
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{receta.strDrink}</h2>
        <button
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer"
          type="button"
          onClick={() => seleccionarReceta(receta.idDrink)}
        >
          Ver receta
        </button>
      </div>
    </div>
  );
}
