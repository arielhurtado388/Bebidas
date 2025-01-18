import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <>
      <Header />

      <main className="container mx-auto p-16">
        <Outlet />
      </main>
    </>
  );
}
