import type { StateCreator } from "zustand";
import {
  obtenerCategorias,
  obtenerRecetaPorId,
  obtenerRecetas,
} from "../services/RecetaServicio";
import type {
  Categorias,
  Filtro,
  Receta,
  Recetas,
  RecetaSeleccionada,
} from "../types";
import type { FavoritosSliceType } from "./favoritosSlice";

export type RecetaSliceType = {
  categorias: Categorias;
  recetas: Recetas;
  recetaSeleccionada: RecetaSeleccionada;
  modal: boolean;
  fetchCategorias: () => Promise<void>;
  fetchRecetas: (filtro: Filtro) => Promise<void>;
  seleccionarReceta: (id: Receta["idDrink"]) => Promise<void>;
  cerrarModal: () => void;
};

export const crearRecetaSlice: StateCreator<
  RecetaSliceType & FavoritosSliceType,
  [],
  [],
  RecetaSliceType
> = (set) => ({
  categorias: {
    drinks: [],
  },

  recetas: {
    drinks: [],
  },
  modal: false,

  recetaSeleccionada: {} as RecetaSeleccionada,

  fetchCategorias: async () => {
    const categorias = await obtenerCategorias();
    set({
      categorias,
    });
  },
  fetchRecetas: async (filtro) => {
    const recetas = await obtenerRecetas(filtro);
    set({
      recetas,
    });
  },
  seleccionarReceta: async (id) => {
    const recetaSeleccionada = await obtenerRecetaPorId(id);
    set({
      recetaSeleccionada,
      modal: true,
    });
  },
  cerrarModal: () => {
    set({
      recetaSeleccionada: {} as RecetaSeleccionada,
      modal: false,
    });
  },
});
