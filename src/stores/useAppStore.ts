import { create } from "zustand";
import { crearRecetaSlice, type RecetaSliceType } from "./recetaSlice";
import { devtools } from "zustand/middleware";
import { crearFavoritosSlice, type FavoritosSliceType } from "./favoritosSlice";
import {
  crearNotificacionSlice,
  type NotificacionSliceType,
} from "./notificacionSlice";
import { crearIASlice, type IASlice } from "./IASlice";

export const useAppStore = create<
  RecetaSliceType & FavoritosSliceType & NotificacionSliceType & IASlice
>()(
  devtools((...a) => ({
    ...crearRecetaSlice(...a),
    ...crearFavoritosSlice(...a),
    ...crearNotificacionSlice(...a),
    ...crearIASlice(...a),
  }))
);
