import type { IconType } from "react-icons";
import {
  LuCloud,
  LuFolderClosed,
  LuHouse,
  LuLayoutTemplate,
} from "react-icons/lu";
import { NavLink } from "react-router";

type linkType = { to: string; text: string; Icon: IconType };
const links: linkType[] = [
  { to: "/", text: "Home", Icon: LuHouse },
  // { to: "/templates", text: "Templates", Icon: LuLayoutTemplate },
  { to: "/projects", text: "Projects", Icon: LuFolderClosed },
  // { to: "/cloud", text: "Cloud", Icon: LuCloud },
];

function SidebarNav() {
  return (
    <div className="flex-1 flex flex-col gap-2 select-none">
      {links.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            `flex gap-2 items-center text-foreground-secondary px-4 py-2 rounded transition-colors duration-200 hover:text-brand hover:bg-brand-soft ${isActive ? "text-brand! bg-brand-soft" : ""}`
          }
        >
          <item.Icon />
          {item.text}
        </NavLink>
      ))}
    </div>
  );
}

export default SidebarNav;
