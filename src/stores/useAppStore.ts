import { create } from "zustand";
import { crearRecetaSlice, type RecetaSliceType } from "./recetaSlice";
import { devtools } from "zustand/middleware";
import { crearFavoritosSlice, type FavoritosSliceType } from "./favoritosSlice";
import {
  crearNotificacionSlice,
  type NotificacionSliceType,
} from "./notificacionSlice";

export const useAppStore = create<
  RecetaSliceType & FavoritosSliceType & NotificacionSliceType
>()(
  devtools((...a) => ({
    ...crearRecetaSlice(...a),
    ...crearFavoritosSlice(...a),
    ...crearNotificacionSlice(...a),
  }))
);
