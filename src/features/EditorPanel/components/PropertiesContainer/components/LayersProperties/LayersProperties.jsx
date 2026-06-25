import { useState } from "react";
import { LuLayers } from "react-icons/lu";

import "./LayersProperties.css";
import LayersList from "./components/LayersList/LayersList";

function LayersProperties() {
    const [layerPropertiesPanelShow, setLayerPropertiesPanelShow] =
        useState(false);

    const layerPropertiesToggleHandler = () => {
        setLayerPropertiesPanelShow(!layerPropertiesPanelShow);
    };

    return (
        <>
            <button
                className={`button round layer-properties__toggle ${layerPropertiesPanelShow ? "active" : ""}`}
                onClick={layerPropertiesToggleHandler}
            >
                <LuLayers />
            </button>
            <div
                className={`properties-section layer-properties__panel ${layerPropertiesPanelShow ? "open" : ""}`}
            >
                <h2 className="properties-section__title">Layers</h2>
                <div className="seperator"></div>
                <LayersList />
            </div>
        </>
    );
}

export default LayersProperties;
