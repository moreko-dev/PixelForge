import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { DefaultButton } from "../../../../components/Buttons";

function ProjectUndoRedo() {
  return (
    <div className="flex gap-2">
      <DefaultButton className="size-9 flex items-center justify-center rounded-full cursor-pointer">
        <LuUndo2 />
      </DefaultButton>
      <DefaultButton className="size-9 flex items-center justify-center rounded-full cursor-pointer">
        <LuRedo2 />
      </DefaultButton>
    </div>
  );
}

export default ProjectUndoRedo;
