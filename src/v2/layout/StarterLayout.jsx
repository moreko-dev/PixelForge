import { Outlet } from "react-router";
import StarterHeader from "../features/starter/common/StarterHeader";
import StarterNavbar from "../features/starter/common/StarterNavbar";

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
