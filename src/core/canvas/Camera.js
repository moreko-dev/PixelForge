class Camera {
    #zoom;

    constructor(zoom) {
        this.zoom = zoom;
    }

    set zoom(value) {
        if (value < 0) {
            throw new Error("Camera zoom cannot be negative");
        }
        this.#zoom = value;
    }

    get zoom() {
        return this.#zoom;
    }

    zoomIn() {}

    zoomOut() {}
}

export default Camera;
