import { useContext } from "react";
import ProjectContext from "../../../../../contexts/ProjectContext";
import TabContentFields from "../TabContentFields";
import TabContentHeader from "../TabContentHeader";

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
    type: "color",
  },
];

function CanvasTabContent() {
  const { projectState, forceUpdate } = useContext(ProjectContext);

  const canvasDimensionStates = [
    {
      value: projectState.current.canvas.width,
      onChange: (event) => {
        projectState.current.canvas.setWidth(Number(event.target.value));
        forceUpdate();
      },
    },
    {
      value: projectState.current.canvas.height,
      onChange: (event) => {
        projectState.current.canvas.setHeight(Number(event.target.value));
        forceUpdate();
      },
    },
  ];

  const canvasStylesStates = [
    {
      value: projectState.current.canvas.background.color,
      onChange: (event) => {
        projectState.current.canvas.background.setColor(event.target.value);
        forceUpdate();
      },
    },
  ];

  return (
    <>
      <TabContentHeader title="Dimension" />
      <TabContentFields
        fields={canvasDimensionFields}
        states={canvasDimensionStates}
      />
      <TabContentHeader title="Styles" />
      <TabContentFields
        fields={canvasStylesFields}
        states={canvasStylesStates}
      />
    </>
  );
}

export default CanvasTabContent;
