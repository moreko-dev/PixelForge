import { getActualMousePosition } from "../CoreUtils.js";
import Tool from "./Tool.js";

class RectangleTool extends Tool {
    #isDragging = false;
    #rectangleBounds = { x: 0, y: 0, w: 0, h: 0 };

    onMouseDown(canvasRef, event) {
        this.#isDragging = true;
        const { x: mouseX, y: mouseY } = getActualMousePosition(
            canvasRef,
            event,
        );
        [this.#rectangleBounds.x, this.#rectangleBounds.y] = [mouseX, mouseY];
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
        [this.#rectangleBounds.w, this.#rectangleBounds.h] = [
            mouseX - this.#rectangleBounds.x,
            mouseY - this.#rectangleBounds.y,
        ];
        // Draw
        const context = canvasRef.getContext("2d");
        context.save();
        context.clearRect(0, 0, canvasRef.width, canvasRef.height);
        context.strokeRect(
            this.#rectangleBounds.x,
            this.#rectangleBounds.y,
            this.#rectangleBounds.w,
            this.#rectangleBounds.h,
        );
        context.restore();
    }

    onMouseUp(createLayerCallback) {
        this.#isDragging = false;
        createLayerCallback(this.#rectangleBounds);
        this.#rectangleBounds = { x: 0, y: 0, w: 0, h: 0 };
    }
}

export default RectangleTool;
