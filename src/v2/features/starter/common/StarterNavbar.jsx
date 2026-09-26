import {
  LuCloud,
  LuFolderKanban,
  LuHouse,
  LuPanelsTopLeft,
} from "react-icons/lu";
import { NavLink } from "react-router";
import logo from "../../../asseets/logo.png";

function StarterNavbar() {
  return (
    <div className="row-span-2 p-4 bg-surface border-e border-e-border">
      {/* Navbar header */}
      <div className="flex gap-2 items-center mb-8">
        <img
          src={logo}
          alt="PixelForge logo"
          className="size-16 rounded-full mix-blend-screen"
        />
        <div className="flex-1">
          <h1 className="font-bold text-lg">PixelForge</h1>
          <span className="text-sm text-text-muted">Image Editor</span>
        </div>
      </div>

      {/* Navbar menu */}
      <div className="flex flex-col gap-2">
        {navbarMenuItems.map((item, index) => (
          <NavbarMenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

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
        `flex gap-2 items-center text-text-muted text-lg p-2 rounded-lg transition-colors duration-300 hover:text-focus select-none outline-none ${isActive ? "text-text! bg-secondary-muted pointer-events-none" : ""}`
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

export default StarterNavbar;
