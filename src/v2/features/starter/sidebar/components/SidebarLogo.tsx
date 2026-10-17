import Logo from "@src/assets/images/logo.png";

function SidebarLogo() {
  return (
    <div className="flex gap-3 items-center">
      <img
        src={Logo}
        alt="PixelForge logo"
        className="h-12 mix-blend-lighten"
      />
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-2xl leading-none">PixelForge</h1>
        <span className="text-muted-foreground">Image Editor</span>
      </div>
    </div>
  );
}

export default SidebarLogo;
