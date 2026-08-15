import { layerType } from "../CoreConstants.js";
import { hitTest } from "../CoreUtils.js";
import { checkValidStringOrThrow } from "../CoreValidation.js";

class SelectionManager {
    #selectedItem;

    set selectedItem(value) {
        checkValidStringOrThrow(value, "SelectionManager selected-item");
        this.#selectedItem = value;
    }

    get selectedItem() {
        return this.#selectedItem;
    }

    handleSelection(mousePosition, layers) {
        for (let i = layers.length - 1; i >= 0; i--) {
            const layer = layers[i];
            if (layer.type === layerType.PEN_LAYER) continue;
            const { x, y, width, height } = layer.boundingBox;
            const { x: mouseX, y: mouseY } = mousePosition;
            if (hitTest(x, y, width, height, mouseX, mouseY)) {
                this.selectedItem = layer.id;
                return;
            }
        }
        this.selectedItem = null;
    }
}

export default SelectionManager;
