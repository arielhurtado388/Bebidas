import {
  CategoriasAPISchema,
  RecetaAPIRespuestaSchema,
  RecetasSchema,
} from "../schemas/receta-schema";
import type { Filtro, Receta } from "../types";
import api from "../lib/axios";

export default {
  async obtenerCategorias() {
    const url = "/list.php?c=list";

    const { data } = await api(url);

    const resultado = CategoriasAPISchema.safeParse(data);

    if (resultado.success) {
      return resultado.data;
    }
  },

  async obtenerRecetas(filtro: Filtro) {
    const url = `/filter.php?c=${filtro.categoria}&i=${filtro.ingrediente}`;

    const { data } = await api(url);

    const resultado = RecetasSchema.safeParse(data);

    if (resultado.success) {
      return resultado.data;
    }
  },

  async obtenerRecetaPorId(id: Receta["idDrink"]) {
    const url = `/lookup.php?i=${id}`;

    const { data } = await api(url);

    const resultado = RecetaAPIRespuestaSchema.safeParse(data.drinks[0]);

    if (resultado.success) {
      return resultado.data;
    }
  },
};
