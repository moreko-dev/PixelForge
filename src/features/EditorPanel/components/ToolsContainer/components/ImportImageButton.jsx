import { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { defaultFilterValues, layersType } from "../../../../../data/Constants";
import { randomID } from "../../../../../utils/Functions";
import { UndoRedoContext } from "./../../../../../contexts/UndoRedoContext";

function ImportImageButton() {
    const { saveNewChange } = useContext(UndoRedoContext);
    const { documentState, setDocumentState } = useContext(DocumentContext);
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
                saveNewChange();
                const layerID = randomID(6);
                setDocumentState({
                    ...documentState,
                    layers: [
                        ...documentState.layers,
                        {
                            id: layerID,
                            type: layersType.IMAGE_LAYER,
                            properties: {
                                image: image,
                                src: image.src,
                                x: 0,
                                y: 0,
                                width: image.width,
                                height: image.height,
                                filter: defaultFilterValues,
                                rotate: 0,
                                flipX: false,
                                flipY: false,
                            },
                        },
                    ],
                });
                toast.success("Image imported!", { id: loadingToastID });
            };
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
