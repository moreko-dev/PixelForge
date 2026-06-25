import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../contexts/DocumentContext";
import "./LayersList.css";
import EmptyLayerList from "./components/EmptyLayerList/EmptyLayerList";
import SingleLayerProperties from "./components/SingleLayerProperties/SingleLayerProperties";

function LayersList() {
    const { documentState } = useContext(DocumentContext);
    const layersLength = documentState.layers.length;

    return (
        <div
            className={`properties-section__content--group ${layersLength ? "" : "empty"}`}
        >
            {layersLength ? (
                <>
                    {documentState.layers.map((layer) => (
                        <SingleLayerProperties key={layer.id} layer={layer} />
                    ))}
                </>
            ) : (
                <EmptyLayerList />
            )}
        </div>
    );
}

export default LayersList;
