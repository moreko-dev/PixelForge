import { useContext, useState } from "react";
import { TbArtboard } from "react-icons/tb";
import { DocumentContext } from "../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../contexts/UndoRedoContext";
import "./CanvasProperties.css";

function CanvasProperties() {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    const [canvasPropertiesPanelShow, setCanvasPropertiesPanelShow] =
        useState(false);

    const canvasPropertiesInputHandler = (name, value) => {
        saveNewChange();
        setDocumentState({
            ...documentState,
            canvas: {
                ...documentState.canvas,
                [name]: value,
            },
        });
    };

    const canvasStylePropertiesInputHandler = (name, value) => {
        saveNewChange();
        setDocumentState({
            ...documentState,
            canvas: {
                ...documentState.canvas,
                styles: {
                    ...documentState.canvas.styles,
                    [name]: value,
                },
            },
        });
    };

    const canvasPropertiesToggleHandler = () => {
        setCanvasPropertiesPanelShow(!canvasPropertiesPanelShow);
    };

    return (
        <>
            <button
                className={`button round canvas-properties__toggle ${canvasPropertiesPanelShow ? "active" : ""}`}
                onClick={canvasPropertiesToggleHandler}
            >
                <TbArtboard />
            </button>
            <div
                className={`properties-section canvas-properties__panel ${canvasPropertiesPanelShow ? "open" : ""}`}
            >
                <h2 className="properties-section__title">Canvas</h2>
                <div className="seperator"></div>
                <div className="properties-section__content">
                    <div className="property-section">
                        <h3 className="property-section__title">
                            Canvas dimension
                        </h3>
                        <div className="property-section__content">
                            <div className="property-wrapper">
                                <label
                                    htmlFor="canvas-width"
                                    className="property-wrapper__label"
                                >
                                    Width:
                                </label>
                                <input
                                    type="number"
                                    id="canvas-width"
                                    className="property-wrapper__input"
                                    value={documentState.canvas.width}
                                    onChange={(event) =>
                                        canvasPropertiesInputHandler(
                                            "width",
                                            Number(event.target.value),
                                        )
                                    }
                                />
                                <span className="property-wrapper__unit">
                                    px
                                </span>
                            </div>
                            <div className="property-wrapper">
                                <label
                                    htmlFor="canvas-height"
                                    className="property-wrapper__label"
                                >
                                    Height:
                                </label>
                                <input
                                    type="number"
                                    id="canvas-height"
                                    className="property-wrapper__input"
                                    value={documentState.canvas.height}
                                    onChange={(event) =>
                                        canvasPropertiesInputHandler(
                                            "height",
                                            Number(event.target.value),
                                        )
                                    }
                                />
                                <span className="property-wrapper__unit">
                                    px
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="property-section">
                        <h3 className="property-section__title">
                            Canvas style
                        </h3>
                        <div className="property-section__content">
                            <div className="property-wrapper">
                                <label
                                    htmlFor="canvas-backgroundcolor"
                                    className="property-wrapper__label"
                                >
                                    Background color
                                </label>
                                <input
                                    type="color"
                                    id="canvas-backgroundcolor"
                                    className="property-wrapper__input"
                                    value={
                                        documentState.canvas.styles
                                            .backgroundColor
                                    }
                                    onChange={(event) =>
                                        canvasStylePropertiesInputHandler(
                                            "backgroundColor",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CanvasProperties;
