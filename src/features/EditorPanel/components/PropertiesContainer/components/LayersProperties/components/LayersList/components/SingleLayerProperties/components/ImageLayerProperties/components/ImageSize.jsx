import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../../../../../../contexts/DocumentContext";

function ImageSize({ layerID }) {
    const { projectState, forceUpdateProject, historyState } =
        useContext(DocumentContext);
    let layerProps = projectState.layers.find((l) => l.id === layerID);

    const imageSizePropertiesHandler = (name, value) => {
        historyState.pushState(projectState);
        const layerIndex = projectState.layers.findIndex(
            (l) => l.id === layerID,
        );
        const currentLayer = projectState.layers[layerIndex];
        currentLayer[name] = value;
        currentLayer.boundingBox = currentLayer.getBounds();
        forceUpdateProject((prev) => !prev);
        layerProps = currentLayer;
    };

    return (
        <>
            <div className="property-section">
                <h3 className="property-section__title">Image Dimension</h3>
                <div className="property-section__content">
                    {["width", "height"].map((item, index) => (
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
                                    imageSizePropertiesHandler(
                                        item,
                                        Number(event.target.value),
                                    )
                                }
                            />
                            <span className="property-wrapper__unit">px</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ImageSize;
