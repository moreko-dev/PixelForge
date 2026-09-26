import { LuSun, LuUser } from "react-icons/lu";

function StarterHeader() {
  return (
    <div className="flex justify-end gap-4 p-4 border-b border-b-border">
      <button className="size-10 flex justify-center items-center rounded-full bg-border transition-colors duration-300 hover:bg-border-strong">
        <LuSun />
        {/* <LuMoon /> */}
      </button>
      <button className="size-10 flex justify-center items-center rounded-full bg-secondary transition-colors duration-300 hover:bg-secondary-hover">
        <LuUser />
      </button>
    </div>
  );
}

export default StarterHeader;
