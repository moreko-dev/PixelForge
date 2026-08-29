import { useContext } from "react";
import { DocumentContext } from "../../../../../../../../contexts/DocumentContext";
import "./LayersList.css";
import EmptyLayerList from "./components/EmptyLayerList/EmptyLayerList";
import SingleLayerProperties from "./components/SingleLayerProperties/SingleLayerProperties";

function LayersList() {
    const { projectState } = useContext(DocumentContext);
    const layersLength = projectState.layers.length;

    return (
        <div
            className={`properties-section__content--group ${layersLength ? "" : "empty"}`}
        >
            {layersLength ? (
                <>
                    {projectState.layers.map((layer) => (
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
