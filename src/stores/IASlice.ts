import type { StateCreator } from "zustand";
import IAServicio from "../services/IAServicio";

export type IASlice = {
  receta: string;
  estaGenerando: boolean;
  generarReceta: (prompt: string) => Promise<void>;
};

export const crearIASlice: StateCreator<IASlice> = (set) => ({
  receta: "",
  estaGenerando: false,
  generarReceta: async (prompt) => {
    set({
      receta: "",
      estaGenerando: true,
    });

    const datos = await IAServicio.generarReceta(prompt);

    for await (const parteTexto of datos) {
      set((state) => ({
        receta: state.receta + parteTexto,
      }));
    }

    set({
      estaGenerando: false,
    });
  },
});
