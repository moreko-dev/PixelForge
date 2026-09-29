import TabContentFields from "./TabContentFields";
import TabContentHeader from "./TabContentHeader";

const canvasDimensionFields = [
  {
      id: "canvas-width",
      label: "Width",
      unit: "px",
      type: "number",
  },
  {
      id: "canvas-height",
      label: "Height",
      unit: "px",
      type: "number",
  },
];

const canvasStylesFields = [
    {
        id: "canvas-bg",
        label: "Background",
        type: "color"
    }
]

function CanvasTabContent() {
  return (
    <>
      <TabContentHeader title="Dimension" />
      <TabContentFields fields={canvasDimensionFields} />
      <TabContentHeader title="Styles" />
      <TabContentFields fields={canvasStylesFields} />
    </>
  );
}

export default CanvasTabContent;
