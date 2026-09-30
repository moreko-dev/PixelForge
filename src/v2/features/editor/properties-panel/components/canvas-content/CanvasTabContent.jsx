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
  const { projectState, setProjectState } = useContext(ProjectContext);

  const canvasDimensionStates = [
    {
      value: projectState.canvas.width,
      onChange: (event) => {
        setProjectState((prev) => {
          prev.canvas.width = Number(event.target.value);
          return prev;
        });
      },
    },
    {
      value: projectState.canvas.height,
      onChange: (event) => {
        setProjectState((prev) => {
          prev.canvas.height = Number(event.target.value);
          return prev;
        });
      },
    },
  ];

  const canvasStylesStates = [
    {
      value: projectState.canvas.background.color,
      onChange: (event) => {
        setProjectState((prev) => {
          prev.canvas.background.color = event.target.value;
          return prev;
        });
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
