import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../contexts/UndoRedoContext";
import TextDimension from "./components/TextDimension";
import TextShadow from "./components/TextShadow";
import TextStyle from "./components/TextStyle";
import TextValue from "./components/TextValue";

function TextLayerProperties({ layerID }) {
    const { saveNewChange } = useContext(UndoRedoContext);
    const { documentState, setDocumentState } = useContext(DocumentContext);
    let layerProps = documentState.layers.find(
        (item) => item.id === layerID,
    ).properties;

    const textLayerPropertiesHandler = (key, value) => {
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
            <TextValue
                layerID={layerID}
                layerProps={layerProps}
                handler={textLayerPropertiesHandler}
            />
            <TextDimension
                layerID={layerID}
                layerProps={layerProps}
                handler={textLayerPropertiesHandler}
            />
            <TextStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={textLayerPropertiesHandler}
            />
            <TextShadow
                layerID={layerID}
                layerProps={layerProps}
                handler={textLayerPropertiesHandler}
            />
        </>
    );
}

export default TextLayerProperties;
