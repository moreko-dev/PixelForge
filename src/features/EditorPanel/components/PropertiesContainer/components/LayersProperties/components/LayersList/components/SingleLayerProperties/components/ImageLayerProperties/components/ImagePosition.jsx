import { useContext } from "react";
import {
    AlignBottomCenter,
    AlignBottomLeft,
    AlignBottomRight,
    AlignMiddleCenter,
    AlignMiddleLeft,
    AlignMiddleRight,
    AlignTopCenter,
    AlignTopLeft,
    AlignTopRight,
} from "../../../../../../../../../../../../../components/AlignIcons/AlignIcons";
import { DocumentContext } from "../../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../../contexts/UndoRedoContext";

function ImagePosition({ layerID }) {
    const alignObj = [
        [
            {
                name: "top-left",
                Icon: AlignTopLeft,
            },
            {
                name: "top-center",
                Icon: AlignTopCenter,
            },
            {
                name: "top-right",
                Icon: AlignTopRight,
            },
        ],
        [
            {
                name: "middle-left",
                Icon: AlignMiddleLeft,
            },
            {
                name: "middle-center",
                Icon: AlignMiddleCenter,
            },
            {
                name: "middle-right",
                Icon: AlignMiddleRight,
            },
        ],
        [
            {
                name: "bottom-left",
                Icon: AlignBottomLeft,
            },
            {
                name: "bottom-center",
                Icon: AlignBottomCenter,
            },
            {
                name: "bottom-right",
                Icon: AlignBottomRight,
            },
        ],
    ];

    const { documentState, setDocumentState } = useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);

    const alignButtonsHandler = (align) => {
        saveNewChange();
        const canvasObj = documentState.canvas;
        const layersArray = documentState.layers.slice();
        const layerIndex = layersArray.findIndex((item) => item.id === layerID);
        const layerProps = layersArray[layerIndex].properties;
        let x, y;

        if (align.endsWith("left")) {
            x = 0;
        } else if (align.endsWith("center")) {
            x = canvasObj.width / 2 - layerProps.width / 2;
        } else if (align.endsWith("right")) {
            x = canvasObj.width - layerProps.width;
        }

        if (align.startsWith("top")) {
            y = 0;
        }
        if (align.startsWith("middle")) {
            y = canvasObj.height / 2 - layerProps.height / 2;
        }
        if (align.startsWith("bottom")) {
            y = canvasObj.height - layerProps.height;
        }

        layerProps.x = x;
        layerProps.y = y;

        layersArray.splice(layerIndex, 1, {
            ...layersArray[layerIndex],
            properties: layerProps,
        });
        setDocumentState({
            ...documentState,
            layers: layersArray,
        });
    };

    return (
        <div className="property-section">
            <h3 className="property-section__title">Image Position</h3>
            <div className="property-section__content">
                {alignObj.map((item, index) => (
                    <div key={index} className="property-wrapper">
                        {item.map((align) => (
                            <button
                                key={align.name}
                                className="property-wrapper__button"
                                onClick={() => alignButtonsHandler(align.name)}
                            >
                                <align.Icon />
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImagePosition;
