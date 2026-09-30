import NavbarHeader from "./components/NavbarHeader";
import NavbarMenu from "./components/NavbarMenu";

function StarterNavbar() {
  return (
    <div className="row-span-2 p-4 bg-surface border-e border-e-border">
      <NavbarHeader />
      <NavbarMenu />
    </div>
  );
}

export default StarterNavbar;
