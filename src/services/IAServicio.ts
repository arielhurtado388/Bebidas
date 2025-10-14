import { streamText } from "ai";
import { openRouter } from "../lib/ia";

export default {
  async generarReceta(prompt: string) {
    const resultado = streamText({
      model: openRouter("meta-llama/llama-3.3-70b-instruct:free"),
      prompt,
      system:
        "Eres un chef y bartender profesional que tiene 50 años de experiencia, le cocina y sirve bebidas a famosos a nivel mundial",
      //   temperature: 1,
    });
    return resultado.textStream;
  },
};
