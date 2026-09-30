import logo from "../../../../../asseets/logo.png";

function NavbarHeader() {
  return (
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
  );
}

export default NavbarHeader;
