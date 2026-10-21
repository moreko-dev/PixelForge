import { IconButton } from "@src/components/buttons.js";
import type { IconType } from "react-icons";
import { LuArrowRight } from "react-icons/lu";

type StatusType = "success" | "error" | "warning" | "info";
type actionCardType = {
  title: string;
  desc: string;
  Icon: IconType;
  mode: StatusType;
};
function ActionCard({ title, desc, Icon, mode }: actionCardType) {
  const modeClasses: Record<StatusType, string> = {
    success: "bg-success text-success-foreground border-success-border",
    error: "bg-error text-error-foreground border-error-border",
    warning: "bg-warning text-warning-foreground border-warning-border",
    info: "bg-info text-info-foreground border-info-border",
  };

  return (
    <div className="bg-surface border border-border-subtle rounded p-4 flex gap-4 justify-between transition-colors duration-200 hover:border-border">
      <div className="flex flex-col">
        <Icon
          className={`size-12 p-2 rounded-lg border-2 ${modeClasses[mode]}`}
        />
        <span className="text-lg leading-none mt-4">{title}</span>
        <span className="text-sm mt-2 text-foreground-secondary">{desc}</span>
      </div>
      <IconButton icon={<LuArrowRight />} className="self-center" />
    </div>
  );
}

export default ActionCard;
