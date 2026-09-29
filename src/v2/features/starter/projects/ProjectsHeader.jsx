import { LuFolderKanban, LuSearch } from "react-icons/lu";
import { DefaultInput } from "../../../components/Inputs";

function ProjectsHeader() {
  return (
    <div className="flex gap-4 items-center mb-8">
      <div className="bg-linear-to-br from-accent/30 from-50% border border-accent-muted flex justify-center items-center p-6 rounded-lg">
        <LuFolderKanban className="text-5xl" />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-4xl text-accent mb-2">Projects</h2>
        <span className="text-text-muted">
          All your creation in one place. Continue working.
        </span>
        <span className="text-text-muted">
          Organize and bring your ideas to life
        </span>
      </div>
      <div className="relative max-w-100 w-full">
        <LuSearch className="absolute left-2 top-[50%] translate-y-[-50%]" />
        <DefaultInput
          type="text"
          placeHolder="Search projects..."
          className="w-full p-2 ps-8 rounded-lg"
        />
      </div>
    </div>
  );
}

export default ProjectsHeader;
