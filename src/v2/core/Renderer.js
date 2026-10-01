import { filtersDetails, layerTypes } from "./CoreConstants";
import { deg2Rad } from "./CoreUtils";

class Renderer {
  static #drawImage(layer, ctx) {
    // Rotation
    const middleOfImageXAxis = layer.x + layer.width / 2;
    const middleOfImageYAxis = layer.y + layer.height / 2;
    ctx.translate(middleOfImageXAxis, middleOfImageYAxis);
    ctx.rotate(deg2Rad(layer.rotate));
    ctx.scale(layer.flipX ? -1 : 1, layer.flipY ? -1 : 1);
    // Render
    ctx.drawImage(
      layer.image,
      -layer.width / 2,
      -layer.height / 2,
      layer.width,
      layer.height,
    );
  }

  static render(canvasRef, project) {
    const ctx = canvasRef.getContext("2d");
    ctx.clearRect(0, 0, project.canvas.width, project.canvas.height);
    for (const layer of project.layers.reverse()) {
      if (!layer.visible) continue;
      ctx.save();
      // Apply shadow
      ctx.shadowColor = layer.shadow.color;
      ctx.shadowBlur = layer.shadow.blur;
      ctx.shadowOffsetX = layer.shadow.offsetX;
      ctx.shadowOffsetY = layer.shadow.offsetY;
      // Apply filters
      let filterString = "";
      for (const filter in layer.filters.toJSON()) {
        let key = filter;
        let value = layer.filters[key];
        let unit = filtersDetails.find((f) => f.name === key).unit;
        filterString += `${key === "hueRotate" ? "hue-rotate" : key}(${value}${unit})`;
      }
      ctx.filter = filterString;
      // Render layer
      switch (layer.type) {
        case layerTypes.IMAGE:
          this.#drawImage(layer, ctx);
      }
    }
  }
}

export default Renderer;
