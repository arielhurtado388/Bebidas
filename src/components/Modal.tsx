import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type JSX } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { RecetaSeleccionada } from "../types";

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const cerrarModal = useAppStore((state) => state.cerrarModal);
  const recetaSeleccionada = useAppStore((state) => state.recetaSeleccionada);
  const handleClickFavorito = useAppStore((state) => state.handleClickFavorito);
  const existeFavorito = useAppStore((state) => state.existeFavorito);

  const mostrarIngredientes = () => {
    const ingredientes: JSX.Element[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingrediente =
        recetaSeleccionada[`strIngredient${i}` as keyof RecetaSeleccionada];

      const cantidad =
        recetaSeleccionada[`strMeasure${i}` as keyof RecetaSeleccionada];

      if (ingrediente && cantidad) {
        ingredientes.push(
          <li key={i} className="text-lg font-normal list-none">
            - {ingrediente}, {cantidad}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={cerrarModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/85" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5 text-center"
                  >
                    {recetaSeleccionada.strDrink}
                  </Dialog.Title>
                  <img
                    className="mx-auto w-75 rounded-lg"
                    src={recetaSeleccionada.strDrinkThumb}
                    alt={`Imagen de ${recetaSeleccionada.strDrink}`}
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-xl font-extrabold my-5"
                  >
                    Ingredientes y cantidades
                  </Dialog.Title>

                  {mostrarIngredientes()}
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-xl font-extrabold my-5"
                  >
                    Instrucciones
                  </Dialog.Title>
                  <p className="text-lg">
                    {recetaSeleccionada.strInstructions}
                  </p>

                  <div className="mt-5 flex justify-between gap-4">
                    <button
                      className="w-full rounded bg-gray-600 uppercase text-white p-3 font-bold shadow hover:bg-gray-500 cursor-pointer"
                      type="button"
                      onClick={cerrarModal}
                    >
                      Cerrar
                    </button>

                    <button
                      className="w-full rounded bg-orange-600 uppercase text-white p-3 font-bold shadow hover:bg-orange-500 cursor-pointer"
                      type="button"
                      onClick={() => handleClickFavorito(recetaSeleccionada)}
                    >
                      {existeFavorito(recetaSeleccionada.idDrink)
                        ? "Eliminar de favoritos"
                        : "Agregar a favoritos"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
