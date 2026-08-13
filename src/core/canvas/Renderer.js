import { filters, layerType, shapeType } from "../CoreConstants.js";
import { deg2Rad } from "../CoreUtils.js";

class Renderer {
    static #renderImage(layer) {
        // Rotation
        const middleOfImageXAxis = layer.x + layer.width / 2;
        const middleOfImageYAxis = layer.y + layer.height / 2;
        ctx.translate(middleOfImageXAxis, middleOfImageYAxis);
        ctx.rotate(deg2Rad(layer.rotate || 0));
        ctx.scale(layer.flipX ? -1 : 1, layer.flipY ? -1 : 1);

        // Render
        cts.drawImage(
            layer.image,
            -layer.width / 2,
            -layer.height / 2,
            layer.width,
            layer.height,
        );
    }

    static #renderText(layer) {
        // Font & align
        ctx.font = `${layer.fontSize}px ${layer.fontFamily || "sans-serif"}`;
        ctx.fillStyle = layer.fillStyle;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        // Render
        ctx.fillText(layer.value, layer.x, layer.y);
    }

    static #renderPen(layer) {
        // Style
        ctx.strokeStyle = layer.strokeStyle;
        ctx.lineWidth = layer.lineWidth;
        ctx.lineCap = layer.lineCap;
        ctx.lineJoin = layer.lineJoin;
        ctx.miterLimit = layer.miterLimit;

        // Render
        ctx.beginPath();
        layer.points.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        });
        ctx.closePath();
    }

    static #renderRectangle() {
        ctx.fillRect(layer.x, layer.y, layer.width, layer.height);
        ctx.strokeRect(layer.x, layer.y, layer.width, layer.height);
    }

    static #renderLine() {
        ctx.beginPath();
        ctx.moveTo(layer.sx, layer.sy);
        ctx.lineTo(layer.ex, layer.ey);
        ctx.stroke();
        ctx.closePath();
    }

    static #renderCircle() {
        ctx.beginPath();
        ctx.arc(layer.x, layer.y, layer.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    static render(canvasRef, canvasObj, layersArr) {
        const ctx = canvasRef.getContext("2d");

        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
        for (const layer of layersArr) {
            ctx.save();
            // Shadow
            ctx.shadowColor = layer.shadow.color;
            ctx.shadowBlur = layer.shadow.blur;
            ctx.shadowOffsetX = layer.shadow.offsetX;
            ctx.shadowOffsetY = layer.shadow.offsetY;
            // Filter
            let filterString = "";
            for (const filter in layer.filter.getFilters()) {
                let key = filter;
                let value = layer.filter[key];
                let unit = filters.find((f) => f.name === key).unit;
                filterString += `${key}(${value}${unit})`;
            }
            ctx.filter = filterString;
            // Render
            if (layer.type === layerType.IMAGE_LAYER) {
                this.#renderImage(layer);
            } else if (layer.type === layerType.TEXT_LAYER) {
                this.#renderText(layer);
            } else if (layer.type === layerType.PEN_LAYER) {
                this.#renderPen(layer);
            } else if (layer.type === layerType.SHAPE_LAYER) {
                // Style
                ctx.strokeStyle = layer.strokeStyle;
                ctx.fillStyle = layer.fillStyle;
                ctx.lineWidth = layer.lineWidth;

                if (layer.shapeType === shapeType.RECT) {
                    this.#renderRectangle(layer);
                } else if (layer.shapeType === shapeType.LINE) {
                    this.#renderLine(layer);
                } else if (layer.shapeType === shapeType.CIRCLE) {
                    this.#renderCircle(layer);
                } else {
                    return `Unknow shape type -> [${layer.shapeType}]`;
                }
            } else {
                return `Unknow layer type -> [${layer.type}]`;
            }
        }
    }
}

export default Renderer;
