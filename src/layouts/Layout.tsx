import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function Layout() {
  return (
    <>
      <Header />

      <main className="container md:max-w-screen-xl mx-auto p-6">
        <Outlet />
      </main>

      <Modal />
    </>
  );
}
