class Camera {
    #zoom = 1;

    set zoom(value) {
        if (value < 0) {
            throw new Error("Camera zoom cannot be negative");
        }
        this.#zoom = value;
    }

    get zoom() {
        return this.#zoom;
    }

    zoomIn() {
        let newZoom = Math.min(this.zoom + 0.1, 4);
        this.zoom = newZoom;
    }

    zoomOut() {
        let newZoom = Math.max(this.zoom - 0.1, 0.2);
        this.zoom = newZoom;
    }
}

export default Camera;
