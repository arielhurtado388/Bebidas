import axios from "axios";
import {
  CategoriasAPISchema,
  RecetaAPIRespuestaSchema,
  RecetasSchema,
} from "../schemas/receta-schema";
import type { Filtro, Receta } from "../types";

export async function obtenerCategorias() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  const { data } = await axios(url);

  const resultado = CategoriasAPISchema.safeParse(data);

  if (resultado.success) {
    return resultado.data;
  }
}

export async function obtenerRecetas(filtro: Filtro) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filtro.categoria}&i=${filtro.ingrediente}`;

  const { data } = await axios(url);

  const resultado = RecetasSchema.safeParse(data);

  if (resultado.success) {
    return resultado.data;
  }
}

export async function obtenerRecetaPorId(id: Receta["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { data } = await axios(url);

  const resultado = RecetaAPIRespuestaSchema.safeParse(data.drinks[0]);

  if (resultado.success) {
    return resultado.data;
  }
}
