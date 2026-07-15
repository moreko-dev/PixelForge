import { shapeTypes } from "../../../../../../../../../../../../../data/Constants";
import ShapeFillStyle from "./ShapeFillStyle";
import ShapeShadow from "./ShapeShadow";
import ShapeStrokeStyle from "./ShapeStrokeStyle";

function RectangleProperties({ layerID, layerProps, handler }) {
    const rectangleBoudingHanlder = (event, diffType) => {
        const prevSValue = diffType === "sx" ? layerProps.sx : layerProps.sy;
        const newSValue = Number(event.target.value);
        const sDiff = prevSValue - newSValue;
        const prevEValue = diffType === "sx" ? layerProps.ex : layerProps.ey;
        handler(shapeTypes.RECT, {
            [diffType]: newSValue,
            [diffType === "sx" ? "ex" : "ey"]: prevEValue - sDiff,
        });
    };

    return (
        <>
            <div className="property-section">
                <h3 className="property-section__title">Shape Dimension</h3>
                <div className="property-section__content">
                    <div className="property-wrapper__sbs">
                        {["sx", "sy"].map((item, index) => (
                            <div key={index} className="property-wrapper">
                                <label
                                    htmlFor={`shape-${item}-${layerID}`}
                                    className="property-wrapper__label"
                                >
                                    {item.charAt(1)}:
                                </label>
                                <input
                                    type="number"
                                    id={`shape-${item}-${layerID}`}
                                    className="property-wrapper__input"
                                    value={layerProps[item]}
                                    onChange={(event) =>
                                        // handler(shapeTypes.RECT, {
                                        //     [item]: Number(event.target.value),
                                        // })
                                        rectangleBoudingHanlder(event, item)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="property-section">
                <h3 className="property-section__title">Shape Size</h3>
                <div className="property-section__content">
                    {["width", "height"].map((item, index) => (
                        <div key={index} className="property-wrapper">
                            <label
                                htmlFor={`shape-${item}-${layerID}`}
                                className="property-wrapper__label"
                            >
                                {item}:
                            </label>
                            <input
                                type="number"
                                id={`shape-${item}-${layerID}`}
                                className="property-wrapper__input"
                                value={layerProps[item]}
                                onChange={(event) =>
                                    handler(shapeTypes.RECT, {
                                        [item]: Number(event.target.value),
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            <ShapeFillStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={handler}
                shapeType={shapeTypes.RECT}
            />
            <ShapeStrokeStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={handler}
                shapeType={shapeTypes.RECT}
            />
            <ShapeShadow
                layerID={layerID}
                layerProps={layerProps}
                handler={handler}
                shapeType={shapeTypes.RECT}
            />
        </>
    );
}

export default RectangleProperties;
