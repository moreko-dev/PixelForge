class HistoryManager {
    #undoStack = [];
    #redoStack = [];

    get undoStack() {
        return this.#undoStack;
    }

    get redoStack() {
        return this.#redoStack;
    }

    pushState(lastChanges) {
        this.#undoStack = [...this.#undoStack, lastChanges];
        this.#redoStack = [];
    }

    undo(lastChanges) {
        if (this.#undoStack.length > 0) {
            this.#redoStack = [...this.#redoStack, lastChanges];
            const lastState = this.#undoStack[this.#undoStack.length - 1];
            this.#undoStack = this.#undoStack.slice(0, -1);
            return lastState;
        }
        return false;
    }

    redo(lastChanges) {
        if (this.#redoStack.length > 0) {
            this.#undoStack = [...this.#undoStack, lastChanges];
            const lastState = this.#redoStack[this.#redoStack.length - 1];
            this.#redoStack = this.#redoStack.slice(0, -1);
            return lastState;
        }
        return false;
    }
}

export default HistoryManager;
