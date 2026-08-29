import { toolsType } from "../CoreConstants.js";
import Tool from "./Tool.js";

class PenTool extends Tool {
    #name = toolsType.PEN;
    #isDragging = false;
    #points = [];

    get name() {
        return this.#name;
    }

    onMouseDown(canvasRef, event) {
        this.#isDragging = true;
        const newPoint = {
            x: event.offsetX,
            y: event.offsetY,
        };
        this.#points.push({ ...newPoint });
        // Draw
        const context = canvasRef.getContext("2d");
        context.beginPath();
        context.moveTo(newPoint.x, newPoint.y);
        context.lineTo(newPoint.x, newPoint.y);
        context.stroke();
    }

    onMouseMove(canvasRef, event) {
        if (!this.#isDragging) return;
        const newPoint = {
            x: event.offsetX,
            y: event.offsetY,
        };
        this.#points.push({ ...newPoint });
        // Draw
        const context = canvasRef.getContext("2d");
        context.lineTo(newPoint.x, newPoint.y);
        context.stroke();
    }

    onMouseUp(canvasRef, createLayerCallback) {
        this.#isDragging = false;
        createLayerCallback(this.#points);
        this.#points = [];
        const context = canvasRef.getContext("2d");
        context.closePath();
    }
}

export default PenTool;
