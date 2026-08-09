class Line extends Shape {
    #type;
    #sx;
    #sy;
    #ex;
    #ey;

    constructor(id, name, visible, locked) {
        super(id, name, visible, locked);
        this.#type = "line";
        this.sx = 0;
        this.sy = 0;
        this.ex = 0;
        this.ey = 0;
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
}

export default Line;
