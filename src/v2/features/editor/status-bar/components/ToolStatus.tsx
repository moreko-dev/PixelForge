import useTool from "@src/hooks/useTool.js";

function ToolStatus() {
  const { selectedTool } = useTool();
  return <span>&lt;{selectedTool ?? "NO_SELECTED_TOOL"}&gt;</span>;
}

export default ToolStatus;
