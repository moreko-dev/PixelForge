class Camera {
    #zoom = 1;

    get zoom() {
        return this.#zoom;
    }

    zoomIn() {
        this.#zoom = Math.min(this.zoom + 0.1, 4);
    }

    zoomOut() {
        this.#zoom = Math.max(this.zoom - 0.1, 0.2);
    }
}

export default Camera;
