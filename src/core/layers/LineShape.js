import { resizeType } from "../CoreConstants.js";
import ShapeLayer from "./ShapeLayer.js";

class LineShape extends ShapeLayer {
    #shapeType;
    #sx;
    #sy;
    #ex;
    #ey;

    constructor(options = {}) {
        super({
            id: options.id,
            name: options.name,
            visible: options.visible,
            locked: options.locked,
            shadow: options.shadow,
            filter: options.filter,
        });
        this.#shapeType = "line";
        this.sx = options.sx || 0;
        this.sy = options.sy || 0;
        this.ex = options.ex || 0;
        this.ey = options.ey || 0;
    }

    get shapeType() {
        return this.#shapeType;
    }

    set sx(value) {
        if (value < 0) {
            throw new Error("Line sx cannot be negative");
        }
        this.#sx = value;
    }

    get sx() {
        return this.#sx;
    }

    set sy(value) {
        if (value < 0) {
            throw new Error("Line sy cannot be negative");
        }
        this.#sy = value;
    }

    get sy() {
        return this.#sy;
    }

    set ex(value) {
        if (value < 0) {
            throw new Error("Line ex cannot be negative");
        }
        this.#ex = value;
    }

    get ex() {
        return this.#ex;
    }

    set ey(value) {
        if (value < 0) {
            throw new Error("Line ey cannot be negative");
        }
        this.#ey = value;
    }

    get ey() {
        return this.#ey;
    }

    move(mouseStartPosition, mousePosition) {
        let deltaX = mousePosition.x - mouseStartPosition.x;
        let deltaY = mousePosition.y - mouseStartPosition.y;
        let draggedPosition = {
            sx: deltaX + this.sx,
            sy: deltaY + this.sy,
            ex: deltaX + this.ex,
            ey: deltaY + this.ey,
        };
        this.sx = draggedPosition.sx;
        this.sy = draggedPosition.sy;
        this.ex = draggedPosition.ex;
        this.ey = draggedPosition.ey;
    }

    resize(type, mouseStartPosition, mousePosition) {
        let posType = type === resizeType.right ? "x" : "y";
        let resizePoint =
            type === resizeType.right
                ? Math.max(this.sx, this.ex) === this.sx
                    ? "sx"
                    : "ex"
                : Math.max(this.sy, this.ey) === this.sy
                  ? "sy"
                  : "ey";
        let diff = mousePosition[posType] - mouseStartPosition[posType];
        this[resizePoint] += diff;
    }

    getBounds() {
        let x, y, width, height;
        x = Math.min(this.sx, this.ex);
        y = Math.min(this.sy, this.ey);
        width = Math.abs(this.ex - this.sx);
        height = Math.abs(this.ey - this.sy);
        return { x, y, width, height };
    }
}

export default LineShape;
