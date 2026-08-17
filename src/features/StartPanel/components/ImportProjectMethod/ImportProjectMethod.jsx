import { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { DocumentContext } from "../../../../contexts/DocumentContext";
import Project from "../../../../core/project/Project";

function ImportProjectMethod() {
    const { projectState, forceUpdateProject } = useContext(DocumentContext);
    const importProjectInputRef = useRef(null);

    const importProjectButtonHandler = () => {
        importProjectInputRef.current.click();
    };

    const importProjectInputHandler = (event) => {
        const loadingToastID = toast.loading("Importing project...");
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/json") {
            const fileReader = new FileReader();
            fileReader.readAsText(selectedFile);
            fileReader.onload = (fileReaderEvent) => {
                try {
                    const projectJson = JSON.parse(
                        fileReaderEvent.target.result,
                    );
                    if (Project.checkProjectJsonSchema(projectJson)) {
                        const layers = Project.convertJson2Layers(projectJson);
                        projectState.layers = layers;
                        forceUpdateProject((prev) => !prev);
                        toast.success("Project imported successfuly", {
                            id: loadingToastID,
                        });
                    } else {
                        toast.error("Project json schema is invalid", {
                            id: loadingToastID,
                        });
                    }
                } catch (error) {
                    toast.error(
                        `An unknown error occured while reading json file -> ${error.message}`,
                        { id: loadingToastID },
                    );
                }
            };
            fileReader.onerror = () => {
                toast.error("Error: Load file failed", { id: loadingToastID });
            };
        } else {
            toast.error("Only json files are valid", {
                id: loadingToastID,
            });
        }
    };

    return (
        <>
            <button
                className="start-panel__method-button secondary"
                onClick={importProjectButtonHandler}
            >
                <HiOutlineFolderOpen />
                <span className="start-panel__method-button-title">
                    Open project
                </span>
                <span className="start-panel__method-button-desc">
                    Open an existing project
                </span>
            </button>
            <input
                type="file"
                accept=".json"
                ref={importProjectInputRef}
                onChange={importProjectInputHandler}
                hidden
            />
        </>
    );
    // const { documentState, setDocumentState } = useContext(DocumentContext);
    // const importProjectInputRef = useRef(null);

    // const importProjectButtonHandler = () => {
    //     importProjectInputRef.current.click();
    // };

    // const importProjectInputHandler = (event) => {
    //     const loadingToastID = toast.loading("Importing project...");
    //     const selectedFile = event.target.files[0];
    //     if (selectedFile && selectedFile.type === "application/json") {
    //         const fileReader = new FileReader();
    //         fileReader.readAsText(selectedFile);
    //         fileReader.onload = (fileReaderEvent) => {
    //             try {
    //                 const jsonObject = JSON.parse(
    //                     fileReaderEvent.target.result,
    //                 );
    //                 if (checkJSONFileSchema(jsonObject)) {
    //                     const jsonObjectLayers = jsonObject.layers;
    //                     jsonObjectLayers.forEach((layer, index) => {
    //                         if (layer.type === layersType.IMAGE_LAYER) {
    //                             const image = new Image();
    //                             image.src = layer.properties.src;
    //                             image.onload = () => {
    //                                 jsonObjectLayers[index].properties.image =
    //                                     image;
    //                             };
    //                         }
    //                     });
    //                     jsonObject.layers = jsonObjectLayers;
    //                     setDocumentState({ ...jsonObject });
    //                     toast.success("Project imported successfuly.", {
    //                         id: loadingToastID,
    //                     });
    //                 } else {
    //                     toast.error("Project json schema is not valid.", {
    //                         id: loadingToastID,
    //                     });
    //                 }
    //             } catch (error) {
    //                 toast.error(
    //                     "Error: An unknown error while reading Json file.",
    //                     { id: loadingToastID },
    //                 );
    //             }
    //         };
    //         fileReader.onerror = () => {
    //             toast.error("Error: File load failed.", { id: loadingToastID });
    //         };
    //     } else {
    //         toast.error("Only json files are valid.", { id: loadingToastID });
    //     }
    // };

    // return (
    //     <>
    //         <button
    //             className="start-panel__method-button secondary"
    //             onClick={importProjectButtonHandler}
    //         >
    //             <HiOutlineFolderOpen />
    //             <span className="start-panel__method-button-title">
    //                 Open project
    //             </span>
    //             <span className="start-panel__method-button-desc">
    //                 Open an existing project
    //             </span>
    //         </button>
    //         <input
    //             type="file"
    //             accept=".json"
    //             ref={importProjectInputRef}
    //             onChange={importProjectInputHandler}
    //             hidden
    //         />
    //     </>
    // );
}

export default ImportProjectMethod;
