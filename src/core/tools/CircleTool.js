import { calculateRadius, getActualMousePosition } from "../CoreUtils.js";
import Tool from "../tools/Tool.js";

class CircleTool extends Tool {
    #isDragging = false;
    #circleBounds = { x: 0, y: 0, radius: 0 };

    onMouseDown(canvasRef, event) {
        this.#isDragging = true;
        const { x: mouseX, y: mouseY } = getActualMousePosition(
            canvasRef,
            event,
        );
        [this.#circleBounds.x, this.#circleBounds.y] = [mouseX, mouseY];
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
        this.#circleBounds.radius = calculateRadius(
            this.#circleBounds.x,
            this.#circleBounds.y,
            mouseX,
            mouseY,
        );
        // Draw
        const context = canvasRef.getContext("2d");
        context.beginPath();
        context.arc(
            this.#circleBounds.x,
            this.#circleBounds.y,
            this.#circleBounds.radius,
            0,
            Math.PI * 2,
        );
        context.stroke();
        context.closePath();
        context.restore();
    }

    onMouseUp() {
        this.#isDragging = false;
        // Create layer
        this.#circleBounds = { x: 0, y: 0, radius: 0 };
    }
}

export default CircleTool;
