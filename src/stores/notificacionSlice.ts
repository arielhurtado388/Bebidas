import type { StateCreator } from "zustand";
import type { FavoritosSliceType } from "./favoritosSlice";

type Notificacion = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificacionSliceType = {
  notificacion: Notificacion;
  mostrarNotificacion: (payload: Pick<Notificacion, "text" | "error">) => void;
  cerrarNotificacion: () => void;
};

export const crearNotificacionSlice: StateCreator<
  NotificacionSliceType & FavoritosSliceType,
  [],
  [],
  NotificacionSliceType
> = (set, get) => ({
  notificacion: {
    text: "",
    error: false,
    show: false,
  },
  mostrarNotificacion: (payload) => {
    set({
      notificacion: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });
    setTimeout(() => {
      get().cerrarNotificacion();
    }, 3000);
  },

  cerrarNotificacion: () => {
    set({
      notificacion: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
