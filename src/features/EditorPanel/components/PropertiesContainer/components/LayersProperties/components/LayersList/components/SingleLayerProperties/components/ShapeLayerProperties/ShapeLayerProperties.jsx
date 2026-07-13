import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../contexts/UndoRedoContext";
import { shapeTypes } from "../../../../../../../../../../../../data/Constants";
import {
    getCircleLayerBounds,
    getLayerBounds,
} from "../../../../../../../../../../../../utils/Utils";
import CircleProperties from "./components/CircleProperties";
import RectangleProperties from "./components/RectangleProperties";
import ShapeFillStyle from "./components/ShapeFillStyle";
import ShapeShadow from "./components/ShapeShadow";
import ShapeStrokeStyle from "./components/ShapeStrokeStyle";

function ShapeLayerProperties({ layerID, layerProperties }) {
    const { documentState, setDocumentState, setHandlerNeedsUpdate } =
        useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    let layerProps = documentState.layers.find(
        (item) => item.id === layerID,
    ).properties;

    const shapeLayerPropertiesHandler = (type, key, value) => {
        saveNewChange();
        const layersArray = documentState.layers.slice();
        const layerIndex = layersArray.findIndex((item) => item.id === layerID);
        const layer = {
            ...layersArray[layerIndex],
            properties: {
                ...layersArray[layerIndex].properties,
                [key]: value,
            },
        };
        const { x, y, w, h } =
            type === shapeTypes.RECT
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
        setHandlerNeedsUpdate((prev) => !prev);
        layerProps = layersArray[layerIndex].properties;
    };

    return (
        <>
            {layerProperties.type === shapeTypes.RECT && (
                <RectangleProperties
                    layerID={layerID}
                    layerProps={layerProps}
                    handler={shapeLayerPropertiesHandler}
                />
            )}
            {layerProperties.type === shapeTypes.CIRCLE && (
                <CircleProperties
                    layerID={layerID}
                    layerProps={layerProps}
                    handler={shapeLayerPropertiesHandler}
                />
            )}
            <ShapeFillStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={shapeLayerPropertiesHandler}
            />
            <ShapeStrokeStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={shapeLayerPropertiesHandler}
            />
            <ShapeShadow
                layerID={layerID}
                layerProps={layerProps}
                handler={shapeLayerPropertiesHandler}
            />
        </>
    );
}

export default ShapeLayerProperties;
