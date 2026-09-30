import {
  LuCloud,
  LuFolderKanban,
  LuHouse,
  LuPanelsTopLeft,
} from "react-icons/lu";
import { NavLink } from "react-router";

const navbarMenuItems = [
  { Icon: LuHouse, content: "Home", to: "/" },
  { Icon: LuPanelsTopLeft, content: "Templates", to: "/templates" },
  { Icon: LuFolderKanban, content: "Projects", to: "/projects" },
  { Icon: LuCloud, content: "Cloud", to: "/cloud" },
];

// eslint-disable-next-line no-unused-vars
function NavbarMenuItem({ Icon, content, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `cursor-pointer flex gap-2 items-center text-text-muted text-lg p-2 rounded-lg transition-colors duration-300 hover:text-focus select-none outline-none ${isActive ? "text-text! bg-secondary-muted pointer-events-none" : ""}`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={isActive ? "text-focus" : ""} />
          {content}
        </>
      )}
    </NavLink>
  );
}

function NavbarMenu() {
  return (
    <div className="flex flex-col gap-2">
      {navbarMenuItems.map((item, index) => (
        <NavbarMenuItem key={index} {...item} />
      ))}
    </div>
  );
}

export default NavbarMenu;
