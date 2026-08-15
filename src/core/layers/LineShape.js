import { resizeType, shapeType } from "../CoreConstants.js";
import { checkNegativeValueOrThrow } from "../CoreValidation.js";
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
        this.#shapeType = shapeType.LINE;
        this.sx = options.sx || 0;
        this.sy = options.sy || 0;
        this.ex = options.ex || 0;
        this.ey = options.ey || 0;
    }

    get shapeType() {
        return this.#shapeType;
    }

    set sx(value) {
        checkNegativeValueOrThrow(value, "LineShape sx");
        this.#sx = value;
    }

    get sx() {
        return this.#sx;
    }

    set sy(value) {
        checkNegativeValueOrThrow(value, "LineShape sy");
        this.#sy = value;
    }

    get sy() {
        return this.#sy;
    }

    set ex(value) {
        checkNegativeValueOrThrow(value, "LineShape ex");
        this.#ex = value;
    }

    get ex() {
        return this.#ex;
    }

    set ey(value) {
        checkNegativeValueOrThrow(value, "LineShape ey");
        this.#ey = value;
    }

    get ey() {
        return this.#ey;
    }

    move(mouseStartPosition, mousePosition) {
        let deltaX = mousePosition.x - mouseStartPosition.x;
        let deltaY = mousePosition.y - mouseStartPosition.y;
        this.sx += deltaX;
        this.sy += deltaY;
        this.ex += deltaX;
        this.ey += deltaY;
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
