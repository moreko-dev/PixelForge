import Tool from "./Tool.js";

class ToolManager {
    static #currentTool;

    static set currentTool(value) {
        if (!(value instanceof Tool)) {
            throw new Error(
                `ToolManager currentTool is not valid object -> [${value}]`,
            );
        }
        this.#currentTool = value;
    }

    static get currentTool() {
        return this.#currentTool;
    }
}

export default ToolManager;
