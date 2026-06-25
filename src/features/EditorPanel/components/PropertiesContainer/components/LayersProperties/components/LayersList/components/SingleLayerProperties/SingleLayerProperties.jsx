import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BiChevronRight, BiTrash } from "react-icons/bi";
import Modal from "../../../../../../../../../../components/Modal/Modal";
import { DocumentContext } from "../../../../../../../../../../contexts/DocumentContext";
import { layersType } from "../../../../../../../../../../data/Constants";
import "./SingleLayerProperties.css";
import BrushLayerProperties from "./components/BrushLayerProperties/BrushLayerProperties";
import ImageLayerProperties from "./components/ImageLayerProperties/ImageLayerProperties";
import ShapeLayerProperties from "./components/ShapeLayerProperties/ShapeLayerProperties";
import TextLayerProperties from "./components/TextLayerProperties/TextLayerProperties";

function RemoveLayerModalContent({ id, type }) {
    return (
        <div className="modal-body__wrapper">
            <div
                style={{
                    marginBottom: "0.5rem",
                }}
                className="desc"
            >
                Are you sure to remove the layer?
            </div>
            <div style={{ color: "var(--root-color)" }}>
                [ {type}: {id} ]
            </div>
        </div>
    );
}

function SingleLayerProperties({ layer }) {
    const [showProps, setShowProps] = useState(false);
    const [removeLayerModalShow, setRemoveLayerModalShow] = useState(false);
    const { documentState, setDocumentState } = useContext(DocumentContext);

    const toggleShowProps = () => {
        setShowProps(!showProps);
    };

    const removeLayerButtonHandler = () => {
        setRemoveLayerModalShow(true);
    };

    const removeLayerModalOnClose = () => {
        setRemoveLayerModalShow(false);
    };

    const removeLayerModalOnSubmit = () => {
        const layersArray = documentState.layers.slice();
        const currentLayerIndex = layersArray.findIndex(
            (item) => item.id === layer.id,
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
            <div className="properties-section__content--dropdown">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.25rem",
                        marginBottom: "0.5rem",
                    }}
                >
                    <h2
                        className={`properties-section__content--dropdown-toggle ${showProps ? "show" : ""}`}
                        onClick={toggleShowProps}
                    >
                        <BiChevronRight />
                        <span>{layer.type + " " + layer.id}</span>
                    </h2>
                    <button
                        className="button round small"
                        onClick={removeLayerButtonHandler}
                    >
                        <BiTrash />
                    </button>
                </div>
                <div
                    className={`properties-section__content--dropdown-panel ${showProps ? "show" : ""}`}
                >
                    {layer.type === layersType.IMAGE_LAYER ? (
                        <ImageLayerProperties layerID={layer.id} />
                    ) : layer.type === layersType.TEXT_LAYER ? (
                        <TextLayerProperties layerID={layer.id} />
                    ) : layer.type === layersType.BRUSH_LAYER ? (
                        <BrushLayerProperties layerID={layer.id} />
                    ) : layer.type === layersType.SHAPE_LAYER ? (
                        <ShapeLayerProperties
                            layerID={layer.id}
                            layerProperties={layer.properties}
                        />
                    ) : (
                        <div className="empty-list">No properties found</div>
                    )}
                </div>
            </div>
            {removeLayerModalShow && (
                <Modal
                    headerContent="Remove layer"
                    bodyContent={
                        <RemoveLayerModalContent
                            id={layer.id}
                            type={layer.type}
                        />
                    }
                    onClose={removeLayerModalOnClose}
                    onSubmit={removeLayerModalOnSubmit}
                    submitText="Remove"
                />
            )}
        </>
    );
}

export default SingleLayerProperties;
