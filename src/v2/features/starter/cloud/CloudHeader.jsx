import { LuCloud, LuSearch } from "react-icons/lu";
import { DefaultInput } from "../../../components/Inputs";

function CloudHeader() {
  return (
    <div className="flex gap-4 items-center mb-8">
      <div className="bg-linear-to-br from-secondary/30 from-50% border border-secondary-muted flex justify-center items-center p-6 rounded-lg">
        <LuCloud className="text-5xl" />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-4xl text-secondary mb-2">Cloud</h2>
        <span className="text-text-muted">
          Your creative files always with you.
        </span>
        <span className="text-text-muted">
          Save, sync and access your images, projects, and assets from any
          devices.
        </span>
      </div>
      <div className="relative max-w-100 w-full">
        <LuSearch className="absolute left-2 top-[50%] translate-y-[-50%]" />
        <DefaultInput
          type="text"
          placeHolder="Search in your cloud..."
          className="w-full p-2 ps-8 rounded-lg"
        />
      </div>
    </div>
  );
}

export default CloudHeader;
