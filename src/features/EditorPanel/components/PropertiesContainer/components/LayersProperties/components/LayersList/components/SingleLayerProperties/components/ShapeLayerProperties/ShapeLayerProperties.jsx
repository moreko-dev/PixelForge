import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../contexts/UndoRedoContext";
import { shapeTypes } from "../../../../../../../../../../../../data/Constants";
import CircleProperties from "./components/CircleProperties";
import RectangleProperties from "./components/RectangleProperties";
import ShapeFillStyle from "./components/ShapeFillStyle";
import ShapeShadow from "./components/ShapeShadow";
import ShapeStrokeStyle from "./components/ShapeStrokeStyle";

function ShapeLayerProperties({ layerID, layerProperties }) {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    let layerProps = documentState.layers.find(
        (item) => item.id === layerID,
    ).properties;

    const shapeLayerPropertiesHandler = (key, value) => {
        saveNewChange();
        const layersArray = documentState.layers.slice();
        const layerIndex = layersArray.findIndex((item) => item.id === layerID);
        layersArray.splice(layerIndex, 1, {
            ...layersArray[layerIndex],
            properties: {
                ...layersArray[layerIndex].properties,
                [key]: value,
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
