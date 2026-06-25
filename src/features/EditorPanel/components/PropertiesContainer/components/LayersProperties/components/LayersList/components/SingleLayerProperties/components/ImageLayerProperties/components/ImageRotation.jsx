import { useContext, useState } from "react";
import { LuFlipHorizontal, LuFlipVertical } from "react-icons/lu";
import { DocumentContext } from "../../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../../contexts/UndoRedoContext";

function ImageRotation({ layerID }) {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    let layerProps = documentState.layers.find(
        (item) => item.id === layerID,
    ).properties;
    const [flipX, setFlipX] = useState(layerProps.flipX || false);
    const [flipY, setFlipY] = useState(layerProps.flipY || false);

    const imageRotatePropertiesHandler = (name, value) => {
        saveNewChange();
        const layersArray = documentState.layers.slice();
        const layerIndex = layersArray.findIndex((item) => item.id === layerID);
        layersArray.splice(layerIndex, 1, {
            ...layersArray[layerIndex],
            properties: {
                ...layersArray[layerIndex].properties,
                [name]: value,
            },
        });
        setDocumentState({
            ...documentState,
            layers: layersArray,
        });
        layerProps = layersArray[layerIndex].properties;
    };

    const flipXInputHandler = () => {
        const updated = !flipX;
        setFlipX(updated);
        imageRotatePropertiesHandler("flipX", updated);
    };

    const flipYInputHandler = () => {
        const updated = !flipY;
        setFlipY(updated);
        imageRotatePropertiesHandler("flipY", updated);
    };

    return (
        <div className="property-section">
            <div className="property-section__title">Image Rotation</div>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`image-rotate-${layerID}`}
                        className="property-wrapper__label"
                    >
                        Rotate
                    </label>
                    <input
                        type="number"
                        id={`image-rotate-${layerID}`}
                        className="property-wrapper__input"
                        min={0}
                        max={360}
                        value={layerProps.rotate}
                        onChange={(event) =>
                            imageRotatePropertiesHandler(
                                "rotate",
                                Number(event.target.value),
                            )
                        }
                    />
                </div>
                <div className="property-wrapper__sbs">
                    <div className="property-wrapper">
                        <span className="property-wrapper__label">flip x</span>
                        <button
                            className={`property-wrapper__button ${flipX ? "active" : ""}`}
                            onClick={flipXInputHandler}
                        >
                            <LuFlipHorizontal />
                        </button>
                    </div>
                    <div className="property-wrapper">
                        <span className="property-wrapper__label">flip y</span>
                        <button
                            className={`property-wrapper__button ${flipY ? "active" : ""}`}
                            onClick={flipYInputHandler}
                        >
                            <LuFlipVertical />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageRotation;
