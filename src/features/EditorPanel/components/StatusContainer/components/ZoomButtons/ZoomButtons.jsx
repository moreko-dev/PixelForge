import { useContext, useState } from "react";
import {
    HiOutlineMagnifyingGlassMinus,
    HiOutlineMagnifyingGlassPlus,
} from "react-icons/hi2";
import { DocumentContext } from "../../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../../contexts/UndoRedoContext";
import "./ZoomButtons.css";

function ZoomButtons() {
    const [zoomValue, setZoomValue] = useState(100);
    const { saveNewChange } = useContext(UndoRedoContext);
    const { documentState, setDocumentState, documentViewContainerRef } =
        useContext(DocumentContext);

    const updateZoomValue = (newZoom) => {
        saveNewChange();
        setDocumentState({
            ...documentState,
            canvas: {
                ...documentState.canvas,
                styles: {
                    ...documentState.canvas.styles,
                    scale: newZoom,
                },
            },
        });
        documentViewContainerRef.current.style.display = "none";
        documentViewContainerRef.current.offsetHeight;
        documentViewContainerRef.current.style.display = "";
    };

    const zoomInButtonHandler = () => {
        let newZoom = Math.min(documentState.canvas.styles.scale + 0.1, 4);
        setZoomValue(Math.floor(newZoom * 100));
        updateZoomValue(newZoom);
    };

    const zoomOutButtonHandler = () => {
        let newZoom = Math.max(documentState.canvas.styles.scale - 0.1, 0.2);
        setZoomValue(Math.floor(newZoom * 100));
        updateZoomValue(newZoom);
    };

    return (
        <div className="status-container__zoom">
            <button className="button round" onClick={zoomOutButtonHandler}>
                <HiOutlineMagnifyingGlassMinus />
            </button>
            <span className="status-container__zoom-value">{zoomValue}%</span>
            <button className="button round" onClick={zoomInButtonHandler}>
                <HiOutlineMagnifyingGlassPlus />
            </button>
        </div>
    );
}

export default ZoomButtons;
