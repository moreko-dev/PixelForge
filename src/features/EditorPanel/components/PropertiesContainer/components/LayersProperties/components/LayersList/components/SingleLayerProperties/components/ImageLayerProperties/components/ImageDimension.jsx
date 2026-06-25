import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../../contexts/UndoRedoContext";

function ImageDimension({ layerID }) {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    let layerProps = documentState.layers.find(
        (item) => item.id === layerID,
    ).properties;

    const imageDimensionPropertiesHandler = (name, value) => {
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

    return (
        <>
            <div className="property-section">
                <h3 className="property-section__title">Image Dimension</h3>
                <div className="property-section__content">
                    <div className="property-wrapper__sbs">
                        {["x", "y"].map((item, index) => (
                            <div key={index} className="property-wrapper">
                                <label
                                    htmlFor={`image-${item}-${layerID}`}
                                    className="property-wrapper__label"
                                >
                                    {item}:
                                </label>
                                <input
                                    type="number"
                                    id={`image-${item}-${layerID}`}
                                    className="property-wrapper__input"
                                    value={layerProps[item]}
                                    onChange={(event) =>
                                        imageDimensionPropertiesHandler(
                                            item,
                                            Number(event.target.value),
                                        )
                                    }
                                />
                                <span className="property-wrapper__unit">
                                    px
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImageDimension;
