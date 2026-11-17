import type { CoordinateType } from "@src/core/CoreTypes.js";
import useProject from "@src/hooks/useProject.js";
import { getPointerRelativeCoordinate } from "@src/utils/Utils.js";
import { useEffect, useState } from "react";

function CursorStatus() {
  const { canvasRef } = useProject();
  const [coordinate, setCoordinate] = useState<CoordinateType>({ x: 0, y: 0 });

  useEffect(() => {
    const pointerMoveHanlder = (
      event: React.PointerEvent<HTMLCanvasElement> | PointerEvent,
    ) => {
      const pc = getPointerRelativeCoordinate(canvasRef.current!, event);
      setCoordinate({ ...pc });
    };

    canvasRef.current?.addEventListener("pointermove", pointerMoveHanlder);
    return () =>
      canvasRef.current?.removeEventListener("pointermove", pointerMoveHanlder);
  }, []);

  return (
    <div className="flex gap-0.5">
      <span>{coordinate.x}</span>×<span>{coordinate.y}</span>
    </div>
  );
}

export default CursorStatus;
