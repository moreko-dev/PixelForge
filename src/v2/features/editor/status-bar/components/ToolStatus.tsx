import useTool from "@src/hooks/useTool.js";

function ToolStatus() {
  const { activeTool } = useTool();
  return <span>&lt;{activeTool?.type ?? "NO_SELECTED_TOOL"}&gt;</span>;
}

export default ToolStatus;
