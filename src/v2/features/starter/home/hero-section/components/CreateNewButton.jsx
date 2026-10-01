import { useContext, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { FiPlusSquare } from "react-icons/fi";
import { useNavigate } from "react-router";
import {
  DefaultButton,
  PrimaryButton,
} from "../../../../../components/Buttons";
import Modal from "../../../../../components/Modal";
import Canvas from "../../../../../core/Canvas";
import { canvasDefaultValues } from "../../../../../core/CoreConstants";
import { generateProjectName } from "../../../../../core/CoreUtils";
import ColorBackground from "../../../../../core/background/ColorBackground";
import { DefaultInput } from "./../../../../../components/Inputs";
import ProjectContext from "./../../../../../contexts/ProjectContext";
import Project from "./../../../../../core/Project";

function CreateNewModalContent({ state, setState }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="name" className="flex-1">
          Project name:
        </label>
        <DefaultInput
          type="text"
          id="name"
          className="max-w-50 w-full py-1 px-3 rounded-lg"
          value={state.name}
          onChange={(event) =>
            setState({ type: "name", payload: event.target.value })
          }
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="width" className="flex-1">
          Canvas width:
        </label>
        <DefaultInput
          type="number"
          id="width"
          className="max-w-20 w-full py-1 px-3 rounded-lg"
          value={state.width}
          onChange={(event) =>
            setState({ type: "width", payload: Number(event.target.value) })
          }
        />
        <span className="text-sm text-text-muted">px</span>
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="height" className="flex-1">
          Canvas height:
        </label>
        <DefaultInput
          type="number"
          id="height"
          className="max-w-20 w-full py-1 px-3 rounded-lg"
          value={state.height}
          onChange={(event) =>
            setState({ type: "height", payload: Number(event.target.value) })
          }
        />
        <span className="text-sm text-text-muted">px</span>
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="bgcolor" className="flex-1">
          Background color:
        </label>
        <DefaultInput
          type="color"
          id="bgcolor"
          className="max-w-20 w-full py-1 px-3 rounded-lg"
          value={state.background.color}
          onChange={(event) =>
            setState({ type: "background", payload: event.target.value })
          }
        />
      </div>
    </div>
  );
}

function CreateNewModalActions({ onClose, onSubmit }) {
  return (
    <>
      <DefaultButton
        className="py-2 px-4 rounded-lg cursor-pointer"
        onClick={onClose}
      >
        Cancel
      </DefaultButton>
      <PrimaryButton
        className="py-2 px-4 rounded-lg cursor-pointer"
        onClick={onSubmit}
      >
        Create project
      </PrimaryButton>
    </>
  );
}

function formReducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        name: generateProjectName(),
        width: canvasDefaultValues.width,
        height: canvasDefaultValues.height,
        background: {
          color: canvasDefaultValues.background.color,
        },
      };
    case "name":
      return {
        ...state,
        name: action.payload,
      };
    case "width":
      return {
        ...state,
        width: action.payload,
      };
    case "height":
      return {
        ...state,
        height: action.payload,
      };
    case "background":
      return {
        ...state,
        background: {
          ...state.background,
          color: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
}

function CreateNewButton() {
  const navigate = useNavigate();
  const { createProject } = useContext(ProjectContext);
  const [modalShow, setModalShow] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, {
    name: generateProjectName(),
    width: canvasDefaultValues.width,
    height: canvasDefaultValues.height,
    background: {
      color: canvasDefaultValues.background.color,
    },
  });

  const handleModalClose = () => setModalShow(false);

  const handleModalOpen = () => {
    dispatch({ type: "reset" });
    setModalShow(true);
  };

  const handleModalSubmit = () => {
    try {
      const project = new Project({
        name: formState.name,
        canvas: new Canvas({
          width: formState.width,
          height: formState.height,
          background: new ColorBackground({
            color: formState.background.color,
          }),
        }),
      });
      createProject(project);
      navigate("/editor");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <DefaultButton
        className="cursor-pointer flex gap-2 items-center px-6 py-2 rounded-full"
        onClick={handleModalOpen}
      >
        <FiPlusSquare /> Create new
      </DefaultButton>
      {modalShow && (
        <Modal
          title="Create new project"
          content={
            <CreateNewModalContent state={formState} setState={dispatch} />
          }
          actions={
            <CreateNewModalActions
              onClose={handleModalClose}
              onSubmit={handleModalSubmit}
            />
          }
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default CreateNewButton;
