import { IconButton } from "@src/components/buttons.js";
import type { LineJoinType } from "@src/core/CoreTypes.js";
import { useState } from "react";
import { LuOctagon } from "react-icons/lu";
import { TbBorderCornerRounded, TbBorderCornerSquare } from "react-icons/tb";

function LineJoinSelector({
  value,
  onChange,
}: {
  value: any;
  onChange: React.ActionDispatch<
    [
      action: {
        type: string;
        payload: any;
      },
    ]
  >;
}) {
  const [join, setJoin] = useState<LineJoinType>(value);
  return (
    <div className="bg-input rounded border border-border-strong flex overflow-hidden">
      <IconButton
        icon={<TbBorderCornerSquare />}
        size="sm"
        className={`rounded-none! ${join === "miter" ? "bg-icon-button-active! pointer-events-none" : ""}`}
        onClick={() => setJoin("miter")}
      />
      <IconButton
        icon={<TbBorderCornerRounded />}
        size="sm"
        className={`rounded-none! ${join === "round" ? "bg-icon-button-active! pointer-events-none" : ""}`}
        onClick={() => setJoin("round")}
      />
      <IconButton
        icon={<LuOctagon />}
        size="sm"
        className={`rounded-none! ${join === "bevel" ? "bg-icon-button-active! pointer-events-none" : ""}`}
        onClick={() => setJoin("bevel")}
      />
    </div>
  );
}

export default LineJoinSelector;
