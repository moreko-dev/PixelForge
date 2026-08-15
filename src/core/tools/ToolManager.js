import { checkInstanceOfOrThrow } from "../CoreValidation.js";
import Tool from "./Tool.js";

class ToolManager {
    static #currentTool;

    static set currentTool(value) {
        checkInstanceOfOrThrow(value, Tool, "ToolManager current-tool");
        this.#currentTool = value;
    }

    static get currentTool() {
        return this.#currentTool;
    }
}

export default ToolManager;
