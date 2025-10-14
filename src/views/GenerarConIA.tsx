import type { FormEvent } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function GenerarConIA() {
  const mostrarNotificacion = useAppStore((state) => state.mostrarNotificacion);
  const generarReceta = useAppStore((state) => state.generarReceta);
  const receta = useAppStore((state) => state.receta);
  const estaGenerando = useAppStore((state) => state.estaGenerando);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formulario = new FormData(e.currentTarget);
    const prompt = formulario.get("prompt") as string;

    if (prompt.trim() === "") {
      mostrarNotificacion({
        text: "La búsqueda no puede ir vacía",
        error: true,
      });
      return;
    }
    await generarReceta(prompt);
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold">Generar receta con IA</h1>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 py-10">
          <div className="relative">
            <input
              name="prompt"
              id="prompt"
              className="border bg-white p-4 rounded-lg w-full border-slate-800"
              placeholder="Genera una receta con ingredientes. Ej. Bebida con tequila y piña"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${
                estaGenerando ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={estaGenerando}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </form>

        {estaGenerando && (
          <p className="text-center animate-blink">Generando ...</p>
        )}

        <div className="py-10 whitespace-pre-wrap">{receta}</div>
      </div>
    </>
  );
}
