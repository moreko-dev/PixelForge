import ShapeLayer from "./ShapeLayer";

class LineShape extends ShapeLayer {
    #type;
    #sx;
    #sy;
    #ex;
    #ey;

    constructor(options = {}) {
        super(
            options.id,
            options.name,
            options.visible,
            options.locked,
            options.shadow,
            options.filter,
        );
        this.#type = "line";
        this.sx = options.sx || 0;
        this.sy = options.sy || 0;
        this.ex = options.ex || 0;
        this.ey = options.ey || 0;
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
        return false;
    }
}

export default LineShape;
