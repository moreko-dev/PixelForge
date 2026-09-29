import { LuDownload, LuSave } from "react-icons/lu";
import { DefaultButton } from "../../../../components/Buttons";

function ProjectSave() {
  return (
    <div className="flex gap-2 items-center">
      <DefaultButton className="size-9 flex items-center justify-center rounded-full cursor-pointer">
        <LuSave />
      </DefaultButton>
      <DefaultButton className="size-9 flex items-center justify-center rounded-full cursor-pointer">
        <LuDownload />
      </DefaultButton>
    </div>
  );
}

export default ProjectSave;
