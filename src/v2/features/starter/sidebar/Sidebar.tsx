import HSeprator from "@src/components/HSeprator.js";
import MorekoDev from "@src/components/MorekoDev.js";
import SidebarLogo from "./components/SidebarLogo.js";
import SidebarNav from "./components/SidebarNav.js";

function Sidebar() {
  return (
    <div className="flex flex-col row-span-2 p-4 bg-sidebar rounded">
      <SidebarLogo />
      <HSeprator />
      <SidebarNav />
      <MorekoDev />
    </div>
  );
}

export default Sidebar;
