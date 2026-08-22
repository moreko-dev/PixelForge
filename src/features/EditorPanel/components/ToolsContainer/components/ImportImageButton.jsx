import { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { generateID } from "../../../../../core/CoreUtils";
import Filter from "../../../../../core/layers/Filter";
import ImageLayer from "../../../../../core/layers/ImageLayer";
import Shadow from "../../../../../core/layers/Shadow";

function ImportImageButton() {
    const { projectState, forceUpdateProject } = useContext(DocumentContext);
    const importImageInputRef = useRef(null);

    const importImageButtonHandler = () => {
        importImageInputRef.current.click();
    };

    const importImageInputHandler = () => {
        const loadingToastID = toast.loading("Importing image...");
        const selectedImage = event.target.files[0];
        if (!selectedImage || !selectedImage.type.startsWith("image")) {
            toast.error("Only image fiiles are valid!", { id: loadingToastID });
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectedImage);
        fileReader.onload = (fileReaderEvent) => {
            const image = new Image();
            image.src = fileReaderEvent.target.result;
            image.onload = () => {
                const layerID = generateID();
                const imageLayer = new ImageLayer({
                    id: layerID,
                    name: `Image-${layerID}`,
                    visible: true,
                    locked: false,
                    shadow: new Shadow(),
                    filter: new Filter(),
                    image: image,
                    src: image.src,
                    width: image.width,
                    height: image.height,
                });
                imageLayer.boundingBox.width = image.width;
                imageLayer.boundingBox.height = image.height;
                projectState.layers.push(imageLayer);
                forceUpdateProject((prev) => !prev);
                toast.success("Image imported!", { id: loadingToastID });
            };
            image.onerror = () => {
                toast.error("Error: Image load failed.", {
                    id: loadingToastID,
                });
            };
        };
        fileReader.onerror = () => {
            toast.error("File load failed.", { id: loadingToastID });
        };
    };

    return (
        <>
            <button className="button round" onClick={importImageButtonHandler}>
                <MdOutlineAddPhotoAlternate />
            </button>
            <input
                type="file"
                accept="image/*"
                ref={importImageInputRef}
                onChange={importImageInputHandler}
                hidden
            />
        </>
    );
}

export default ImportImageButton;

// import { useContext, useRef } from "react";
// import toast from "react-hot-toast";
// import { MdOutlineAddPhotoAlternate } from "react-icons/md";
// import { DocumentContext } from "../../../../../contexts/DocumentContext";
// import { defaultFilterValues, layersType } from "../../../../../data/Constants";
// import { randomID } from "../../../../../utils/Functions";
// import { UndoRedoContext } from "./../../../../../contexts/UndoRedoContext";

// function ImportImageButton() {
//     const { saveNewChange } = useContext(UndoRedoContext);
//     const { documentState, setDocumentState } = useContext(DocumentContext);
//     const importImageInputRef = useRef(null);

//     const importImageButtonHandler = () => {
//         importImageInputRef.current.click();
//     };

//     const importImageInputHandler = () => {
//         const loadingToastID = toast.loading("Importing image...");
//         const selectedImage = event.target.files[0];
//         if (!selectedImage || !selectedImage.type.startsWith("image")) {
//             toast.error("Only image fiiles are valid!", { id: loadingToastID });
//             return;
//         }
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(selectedImage);
//         fileReader.onload = (fileReaderEvent) => {
//             const image = new Image();
//             image.src = fileReaderEvent.target.result;
//             image.onload = () => {
//                 saveNewChange();
//                 const layerID = randomID(6);
//                 setDocumentState({
//                     ...documentState,
//                     layers: [
//                         ...documentState.layers,
//                         {
//                             id: layerID,
//                             type: layersType.IMAGE_LAYER,
//                             layer: {
//                                 x: 0,
//                                 y: 0,
//                                 width: image.width,
//                                 height: image.height,
//                             },
//                             properties: {
//                                 image: image,
//                                 src: image.src,
//                                 x: 0,
//                                 y: 0,
//                                 width: image.width,
//                                 height: image.height,
//                                 filter: defaultFilterValues,
//                                 rotate: 0,
//                                 flipX: false,
//                                 flipY: false,
//                             },
//                         },
//                     ],
//                 });
//                 toast.success("Image imported!", { id: loadingToastID });
//             };
//         };
//     };

//     return (
//         <>
//             <button className="button round" onClick={importImageButtonHandler}>
//                 <MdOutlineAddPhotoAlternate />
//             </button>
//             <input
//                 type="file"
//                 accept="image/*"
//                 ref={importImageInputRef}
//                 onChange={importImageInputHandler}
//                 hidden
//             />
//         </>
//     );
// }

// export default ImportImageButton;
