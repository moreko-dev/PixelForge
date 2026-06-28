import { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { DocumentContext } from "../../../../contexts/DocumentContext";
import { defaultFilterValues, layersType } from "../../../../data/Constants";
import { randomID } from "../../../../utils/Functions";

function ImportImageMethod() {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const importImageInputRef = useRef(null);

    const importImageButtonHandler = () => {
        importImageInputRef.current.click();
    };

    const importImageInputHandler = (event) => {
        const loadingToastID = toast.loading("Importing image...");
        const selectedImage = event.target.files[0];
        if (selectedImage && selectedImage.type.startsWith("image")) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(selectedImage);
            fileReader.onload = (fileReaderEvent) => {
                const image = new Image();
                image.src = fileReaderEvent.target.result;
                image.onload = () => {
                    const layerID = randomID(6);
                    setDocumentState({
                        isDocumentCreated: true,
                        documentName: `untitled-${randomID(6)}`,
                        canvas: {
                            width: image.width,
                            height: image.height,
                            styles: {
                                backgroundColor: "#ffffff",
                                border: "1px solid #000000",
                                scale: 1,
                            },
                        },
                        layers: [
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
                    toast.success("Image imported successfuly.", {
                        id: loadingToastID,
                    });
                };
                image.onerror = () => {
                    toast.error("Error: Image load failed.", {
                        id: loadingToastID,
                    });
                };
            };
            fileReader.onerror = (fileReaderError) => {
                toast.error("File load failed.", { id: loadingToastID });
            };
        } else {
            toast.error("Only image files are valid.", { id: loadingToastID });
        }
    };

    return (
        <>
            <button
                className="start-panel__method-button secondary"
                onClick={importImageButtonHandler}
            >
                <MdOutlineAddPhotoAlternate />
                <span className="start-panel__method-button-title">
                    Import image
                </span>
                <span className="start-panel__method-button-desc">
                    Import an image to edit
                </span>
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

export default ImportImageMethod;
