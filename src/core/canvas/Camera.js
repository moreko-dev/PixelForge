class Camera {
    constructor(zoom) {
        this.zoom = zoom;
    }

    set zoom(value) {
        if (value < 0) {
            throw new Error("Camera zoom cannot be negative");
        }
        this._zoom = value;
    }

    get zoom() {
        return this._zoom;
    }

    zoomIn() {}

    zoomOut() {}
}

export default Camera;
