import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../contexts/UndoRedoContext";
import BrushLineStyle from "./components/BrushLineStyle";
import BrushStrokeStyle from "./components/BrushStrokeStyle";

function BrushLayerProperties({ layerID }) {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    let layerProps = documentState.layers.find(
        (item) => item.id === layerID,
    ).properties;

    const brushLayerPropertiesHandler = (key, value) => {
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
            <BrushStrokeStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={brushLayerPropertiesHandler}
            />
            <BrushLineStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={brushLayerPropertiesHandler}
            />
        </>
    );
}

export default BrushLayerProperties;
