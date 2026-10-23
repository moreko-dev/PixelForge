import VSeprator from "@src/components/VSeprator.js";

function CanvasStatus() {
  return (
    <div className="h-full flex items-center text-foreground-secondary">
      <div className="flex gap-0.5">
        <span>500</span>×<span>500</span>
      </div>
      <VSeprator marginValue={3} />
      <span>#FFFFFF</span>
    </div>
  );
}

export default CanvasStatus;
