import Shape from "./Shape";

class Rectangle extends Shape {
    #type;
    #sx;
    #sy;
    #ex;
    #ey;
    #width;
    #height;

    constructor(id, name, visible, locked) {
        super(id, name, visible, locked);
        this.#type = "rect";
        this.sx = 0;
        this.sy = 0;
        this.ex = 0;
        this.ey = 0;
        this.width = 0;
        this.height = 0;
    }

    get type() {
        return this.#type;
    }

    set sx(value) {
        if (value < 0) {
            throw new Error("Rectangle sx cannot be negative");
        }
        this.#sx = value;
    }

    get sx() {
        return this.#sx;
    }

    set sy(value) {
        if (value < 0) {
            throw new Error("Rectangle sy cannot be negative");
        }
        this.#sy = value;
    }

    get sy() {
        return this.#sy;
    }

    set ex(value) {
        if (value < 0) {
            throw new Error("Rectangle ex cannot be negative");
        }
        this.#ex = value;
    }

    get ex() {
        return this.#ex;
    }

    set ey(value) {
        if (value < 0) {
            throw new Error("Rectangle ey cannot be negative");
        }
        this.#ey = value;
    }

    get ey() {
        return this.#ey;
    }

    set width(value) {
        if (value < 0) {
            throw new Error("Rectangle width cannot be negative");
        }
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        if (value < 0) {
            throw new Error("Rectangle height cannot be negative");
        }
        this.#height = value;
    }

    get height() {
        return this.#height;
    }
}

export default Rectangle;
