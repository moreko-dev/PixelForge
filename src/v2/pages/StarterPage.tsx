import { Outlet } from "react-router";
import Header from "../features/starter/header/Header.js";
import Sidebar from "../features/starter/sidebar/Sidebar.js";

function StarterPage() {
  return (
    <main className="w-full h-dvh grid gap-2 grid-cols-[300px_1fr] grid-rows-[auto_1fr] p-2">
      <Sidebar />
      <Header />
      <div className="p-4">
        <Outlet />
      </div>
    </main>
  );
}

export default StarterPage;
