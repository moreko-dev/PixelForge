import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../contexts/UndoRedoContext";
import { shapeTypes } from "../../../../../../../../../../../../data/Constants";
import {
    getCircleLayerBounds,
    getLayerBounds,
} from "../../../../../../../../../../../../utils/Utils";
import CircleProperties from "./components/CircleProperties";
import LineProperties from "./components/LineProperties";
import RectangleProperties from "./components/RectangleProperties";

function ShapeLayerProperties({ layerID, layerProperties }) {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    let layerProps = documentState.layers.find(
        (item) => item.id === layerID,
    ).properties;

    const shapeLayerPropertiesHandler = (type, keyValues) => {
        saveNewChange();
        const layersArray = documentState.layers.slice();
        const layerIndex = layersArray.findIndex((item) => item.id === layerID);
        const layer = {
            ...layersArray[layerIndex],
            properties: {
                ...layersArray[layerIndex].properties,
                ...keyValues,
            },
        };
        const { x, y, w, h } =
            type === shapeTypes.RECT || type === shapeTypes.LINE
                ? getLayerBounds(
                      layer.properties.sx,
                      layer.properties.sy,
                      layer.properties.ex,
                      layer.properties.ey,
                  )
                : getCircleLayerBounds(layer.properties);
        layer.layer = {
            x,
            y,
            width: w,
            height: h,
        };
        layersArray.splice(layerIndex, 1, layer);
        setDocumentState({
            ...documentState,
            layers: layersArray,
        });
        layerProps = layersArray[layerIndex].properties;
    };

    return (
        <>
            {layerProperties.type === shapeTypes.RECT ? (
                <RectangleProperties
                    layerID={layerID}
                    layerProps={layerProps}
                    handler={shapeLayerPropertiesHandler}
                />
            ) : layerProperties.type === shapeTypes.CIRCLE ? (
                <CircleProperties
                    layerID={layerID}
                    layerProps={layerProps}
                    handler={shapeLayerPropertiesHandler}
                />
            ) : layerProperties.type === shapeTypes.LINE ? (
                <LineProperties
                    layerID={layerID}
                    layerProps={layerProps}
                    handler={shapeLayerPropertiesHandler}
                />
            ) : (
                <>!Invalid shape type!</>
            )}
        </>
    );
}

export default ShapeLayerProperties;
