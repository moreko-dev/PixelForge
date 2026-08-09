import Tool from "./Tool";

class ToolManager {
    #currentTool;

    set currentTool(value) {
        if (!(value instanceof Tool)) {
            throw new Error(
                `ToolManager currentTool is not valid object -> [${value}]`,
            );
        }
        this.#currentTool = value;
    }

    get currentTool() {
        return this.#currentTool;
    }
}

export default ToolManager;
