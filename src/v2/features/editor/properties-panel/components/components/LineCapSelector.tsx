import { IconButton } from "@src/components/buttons.js";
import type { LineCapType } from "@src/core/CoreTypes.js";
import { useState } from "react";
import { TbCapProjecting, TbCapRounded, TbCapStraight } from "react-icons/tb";

function LineCapSelector({
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
  const [cap, setCap] = useState<LineCapType>(value);

  return (
    <div className="bg-input rounded border border-border-strong flex overflow-hidden">
      <IconButton
        icon={<TbCapStraight />}
        size="sm"
        className={`rounded-none! ${cap === "butt" ? "bg-icon-button-active! pointer-events-none!" : ""}`}
        onClick={() => setCap("butt")}
      />
      <IconButton
        icon={<TbCapRounded />}
        size="sm"
        className={`rounded-none! ${cap === "round" ? "bg-icon-button-active! pointer-events-none!" : ""}`}
        onClick={() => setCap("round")}
      />
      <IconButton
        icon={<TbCapProjecting />}
        size="sm"
        className={`rounded-none! ${cap === "square" ? "bg-icon-button-active! pointer-events-none!" : ""}`}
        onClick={() => setCap("square")}
      />
    </div>
  );
}

export default LineCapSelector;
