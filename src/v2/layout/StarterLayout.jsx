import { Outlet } from "react-router";
import StarterHeader from "./components/starter-layout/header/StarterHeader";
import StarterNavbar from "./components/starter-layout/navbar/StarterNavbar";

function StarterLayout() {
  return (
    <div className="grid grid-cols-[250px_1fr] grid-rows-[auto_1fr] w-full h-dvh">
      <StarterNavbar />
      <StarterHeader />
      <Outlet />
    </div>
  );
}

export default StarterLayout;
