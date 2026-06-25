import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { LuRotateCcw } from "react-icons/lu";
import Modal from "../../../../../../../../../../../../../components/Modal/Modal";
import { DocumentContext } from "../../../../../../../../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../../../../../../../../contexts/UndoRedoContext";
import {
    defaultFilterValues,
    filtersObj,
} from "../../../../../../../../../../../../../data/Constants";

function ResetFilterModalContent() {
    return (
        <div className="modal-body__wrapper">
            <div className="desc">Are you sure to reset image filters?</div>
        </div>
    );
}

function ImageFilters({ layerID }) {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    const [resetFilterModalShow, setResetFilterModalShow] = useState(false);
    let layerProps = documentState.layers.find(
        (item) => item.id === layerID,
    ).properties;

    const resetFilterButtonHandler = () => {
        setResetFilterModalShow(true);
    };

    const resetFilterModalOnCLose = () => {
        setResetFilterModalShow(false);
    };

    const resetFilterModalOnSubmit = () => {
        saveNewChange();
        const layersArray = documentState.layers.slice();
        const layerIndex = layersArray.findIndex((item) => item.id === layerID);
        layersArray.splice(layerIndex, 1, {
            ...layersArray[layerIndex],
            properties: {
                ...layersArray[layerIndex].properties,
                filter: defaultFilterValues,
            },
        });
        setDocumentState({
            ...documentState,
            layers: layersArray,
        });
        layerProps = layersArray[layerIndex].properties;
        setResetFilterModalShow(false);
        toast.success("Filters reset!");
    };

    const filtersInputHandler = (name, value) => {
        saveNewChange();
        const layersArray = documentState.layers.slice();
        const layerIndex = layersArray.findIndex((item) => item.id === layerID);
        layersArray.splice(layerIndex, 1, {
            ...layersArray[layerIndex],
            properties: {
                ...layersArray[layerIndex].properties,
                filter: {
                    ...layersArray[layerIndex].properties.filter,
                    [name]: value,
                },
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
            <div className="property-section">
                <h3 className="property-section__title sbs">
                    <span>Image Filters</span>
                    <button
                        className="button round small"
                        onClick={resetFilterButtonHandler}
                    >
                        <LuRotateCcw />
                    </button>
                </h3>
                <div className="property-section__content">
                    {filtersObj.map(
                        ({ name, minValue, maxValue, unit }, index) => (
                            <div key={index} className="property-wrapper">
                                <label
                                    htmlFor={`image-${name}-${layerID}`}
                                    className="property-wrapper__label"
                                >
                                    {name}:
                                </label>
                                <input
                                    type="number"
                                    id={`image-${name}-${layerID}`}
                                    className="property-wrapper__input"
                                    min={minValue}
                                    max={maxValue}
                                    value={layerProps.filter[name]}
                                    onChange={(event) =>
                                        filtersInputHandler(
                                            name,
                                            Number(event.target.value),
                                        )
                                    }
                                />
                                <span className="property-wrapper__unit">
                                    {unit}
                                </span>
                            </div>
                        ),
                    )}
                </div>
            </div>
            {resetFilterModalShow && (
                <Modal
                    headerContent="Reset filters"
                    bodyContent={<ResetFilterModalContent />}
                    onClose={resetFilterModalOnCLose}
                    onSubmit={resetFilterModalOnSubmit}
                    submitText="Reset"
                />
            )}
        </>
    );
}

export default ImageFilters;
