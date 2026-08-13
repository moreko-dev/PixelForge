import Tool from "./Tool.js";

class PenTool extends Tool {
    #isDragging = false;
    #points = [];

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

    onMouseUp(canvasRef) {
        this.#isDragging = false;
        // Create layer
        this.#points = [];
        const context = canvasRef.getContext("2d");
        context.closePath();
    }
}

export default PenTool;
