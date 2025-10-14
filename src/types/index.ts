import type z from "zod";
import type {
  CategoriasAPISchema,
  FiltroSchema,
  RecetaAPIRespuestaSchema,
  RecetaSchema,
  RecetasSchema,
} from "../schemas/receta-schema";

export type Categorias = z.infer<typeof CategoriasAPISchema>;
export type Filtro = z.infer<typeof FiltroSchema>;
export type Receta = z.infer<typeof RecetaSchema>;
export type Recetas = z.infer<typeof RecetasSchema>;
export type RecetaSeleccionada = z.infer<typeof RecetaAPIRespuestaSchema>;
