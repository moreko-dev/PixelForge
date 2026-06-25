import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BiChevronDown, BiChevronRight, BiTrash } from "react-icons/bi";
import Modal from "../../../../../../../components/Modal/Modal";
import { DocumentContext } from "../../../../../../../contexts/DocumentContext";
import { layersType, shapeTypes } from "../../../../../../../data/Constants";
import BrushProperties from "./components/BrushProperties";
import CircleProperties from "./components/CircleProperties";
import ImageDimension from "./components/ImageDimension";
import ImageFilters from "./components/ImageFilters";
import ImagePosition from "./components/ImagePosition";
import ImageRotation from "./components/ImageRotation";
import ImageSize from "./components/ImageSize";
import LineProperties from "./components/LineProperties";
import RectProperties from "./components/RectProperties";
import TextProperties from "./components/TextProperties";

function RemoveLayerModalContent({ id, type }) {
    return (
        <div className="modal-body__wrapper">
            <div style={{ color: "#eeeeee", marginBottom: "0.5rem" }}>
                Are you sure to remove the layer?
            </div>
            <div style={{ color: "cyan" }}>
                [ {type}: {id} ]
            </div>
        </div>
    );
}

function LayerSectionProperties({ layerID, layerType, layerProperties }) {
    const [showProps, setShowProps] = useState(false);
    const [removeLayerModalShow, setRemoveLayerModalShow] = useState(false);
    const { documentState, setDocumentState } = useContext(DocumentContext);

    const removeLayerHandler = () => {
        const layersArray = documentState.layers.slice();
        const currentLayerIndex = layersArray.findIndex(
            (item) => item.id === layerID,
        );
        layersArray.splice(currentLayerIndex, 1);
        setDocumentState({
            ...documentState,
            layers: layersArray,
        });
        setRemoveLayerModalShow(false);
        toast.success("Layer removed!");
    };

    return (
        <>
            <div
                className={`properties-wrapper__inner ${showProps ? "" : "hide"}`}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <h3
                        className="properties-wrapper__inner-title clickable"
                        onClick={() => setShowProps(!showProps)}
                    >
                        {showProps ? <BiChevronDown /> : <BiChevronRight />}
                        {layerType + " " + layerID}
                    </h3>
                    <button
                        className="property-button"
                        onClick={() => setRemoveLayerModalShow(true)}
                    >
                        <BiTrash />
                    </button>
                </div>
                {layerType === layersType.IMAGE_LAYER ? (
                    <>
                        <ImageDimension layerID={layerID} />
                        <ImageSize layerID={layerID} />
                        <ImagePosition layerID={layerID} />
                        <ImageFilters layerID={layerID} />
                        <ImageRotation layerID={layerID} />
                    </>
                ) : layerType === layersType.TEXT_LAYER ? (
                    <>
                        <TextProperties layerID={layerID} />
                    </>
                ) : layerType === layersType.BRUSH_LAYER ? (
                    <>
                        <BrushProperties layerID={layerID} />
                    </>
                ) : layerType === layersType.SHAPE_LAYER ? (
                    <>
                        {layerProperties.type === shapeTypes.LINE ? (
                            <LineProperties layerID={layerID} />
                        ) : layerProperties.type === shapeTypes.RECT ? (
                            <RectProperties
                                layerID={layerID}
                                shpaeType={layerProperties.type}
                            />
                        ) : layerProperties.type === shapeTypes.CIRCLE ? (
                            <CircleProperties layerID={layerID} />
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <div className="empty-list">
                        UnKnown type for this layer!
                    </div>
                )}
            </div>
            {removeLayerModalShow && (
                <Modal
                    headerContent="Remove layer"
                    bodyContent={
                        <RemoveLayerModalContent
                            id={layerID}
                            type={layerType}
                        />
                    }
                    onSubmit={removeLayerHandler}
                    onClose={() => setRemoveLayerModalShow(false)}
                />
            )}
        </>
    );
}

export default LayerSectionProperties;
