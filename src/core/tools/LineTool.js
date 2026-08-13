import { getActualMousePosition } from "../CoreUtils.js";
import Tool from "../tools/Tool.js";

class LineTool extends Tool {
    #isDragging = false;
    #lineBounds = { sx: 0, sy: 0, ex: 0, ey: 0 };

    onMouseDown(canvasRef, event) {
        this.#isDragging = true;
        const { x: mouseX, y: mouseY } = getActualMousePosition(
            canvasRef,
            event,
        );
        [this.#lineBounds.sx, this.#lineBounds.sy] = [mouseX, mouseY];
        // Draw
        const context = canvasRef.getContext("2d");
        context.save();
    }

    onMouseMove(canvasRef, event) {
        if (!this.#isDragging) return;
        const { x: mouseX, y: mouseY } = getActualMousePosition(
            canvasRef,
            event,
        );
        [this.#lineBounds.ex, this.#lineBounds.ey] = [mouseX, mouseY];
        // Draw
        const context = canvasRef.getContext("2d");
        context.clearRect(0, 0, canvasRef.width, canvasRef.height);
        context.beginPath();
        context.moveTo(this.#lineBounds.sx, this.#lineBounds.sy);
        context.LineTo(this.#lineBounds.ex, this.#lineBounds.ey);
        context.stroke();
        context.closePath();
        context.restore();
    }

    onMouseUp() {
        this.#isDragging = false;
        // Create layer
        this.#lineBounds = { sx: 0, sy: 0, ex: 0, ey: 0 };
    }
}

export default LineTool;
