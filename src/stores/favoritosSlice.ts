import type { StateCreator } from "zustand";
import type { RecetaSeleccionada } from "../types";
import { crearRecetaSlice, type RecetaSliceType } from "./recetaSlice";
import {
  crearNotificacionSlice,
  type NotificacionSliceType,
} from "./notificacionSlice";

export type FavoritosSliceType = {
  favoritos: RecetaSeleccionada[];
  handleClickFavorito: (recetaSeleccionada: RecetaSeleccionada) => void;
  existeFavorito: (id: RecetaSeleccionada["idDrink"]) => boolean;
  cargarStorage: () => void;
};

export const crearFavoritosSlice: StateCreator<
  FavoritosSliceType & RecetaSliceType & NotificacionSliceType,
  [],
  [],
  FavoritosSliceType
> = (set, get, api) => ({
  favoritos: [],
  handleClickFavorito: (recetaSeleccionada) => {
    if (get().existeFavorito(recetaSeleccionada.idDrink)) {
      set((state) => ({
        favoritos: state.favoritos.filter(
          (favorito) => favorito.idDrink !== recetaSeleccionada.idDrink
        ),
      }));
      crearNotificacionSlice(set, get, api).mostrarNotificacion({
        text: "Se eliminó de favoritos",
        error: false,
      });
    } else {
      set((state) => ({
        favoritos: [...state.favoritos, recetaSeleccionada],
      }));
      crearNotificacionSlice(set, get, api).mostrarNotificacion({
        text: "Se agregó a favoritos",
        error: false,
      });
    }
    crearRecetaSlice(set, get, api).cerrarModal();
    localStorage.setItem("favoritos", JSON.stringify(get().favoritos));
  },

  existeFavorito: (id) => {
    return get().favoritos.some((favorito) => favorito.idDrink === id);
  },

  cargarStorage: () => {
    const favoritosStorage = localStorage.getItem("favoritos");
    if (favoritosStorage) {
      set({
        favoritos: JSON.parse(favoritosStorage),
      });
    }
  },
});
