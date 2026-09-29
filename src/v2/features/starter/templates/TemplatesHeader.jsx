import { LuLayoutTemplate, LuSearch } from "react-icons/lu";
import { DefaultInput } from "../../../components/Inputs";

function TemplatesHeader() {
  return (
    <div className="flex gap-4 items-center mb-8">
      <div className="bg-linear-to-br from-primary/30 from-50% border border-primary-muted flex justify-center items-center p-6 rounded-lg">
        <LuLayoutTemplate className="text-5xl" />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-4xl text-primary mb-2">Templates</h2>
        <span className="text-text-muted">
          Kickstart your creativity with professionally designed templates.
        </span>
        <span className="text-text-muted">Edit, customize and make them your own.</span>
      </div>
      <div className="relative max-w-100 w-full">
        <LuSearch className="absolute left-2 top-[50%] translate-y-[-50%]" />
        <DefaultInput type="text" placeHolder="Search templates..." className="w-full p-2 ps-8 rounded-lg" />
      </div>
    </div>
  );
}

export default TemplatesHeader;
