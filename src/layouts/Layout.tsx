import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import Notificacion from "../components/Notificacion";

export default function Layout() {
  const cargarStorage = useAppStore((state) => state.cargarStorage);

  useEffect(() => {
    cargarStorage();
  }, []);

  return (
    <>
      <Header />

      <main className="max-w-[95%] md:max-w-3/4 2xl:max-w-4/5 mx-auto py-16">
        <Outlet />
      </main>

      <Modal />
      <Notificacion />
    </>
  );
}
