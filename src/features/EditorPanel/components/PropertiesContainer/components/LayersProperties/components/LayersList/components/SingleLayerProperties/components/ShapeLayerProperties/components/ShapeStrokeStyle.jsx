function ShapeStrokeStyle({ layerID, layerProps, handler }) {
    return (
        <div className="property-section">
            <h3 className="property-section__title">Shape Stroke</h3>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`shape-line-width-${layerID}`}
                        className="property-wrapper__label"
                    >
                        line width:
                    </label>
                    <input
                        type="number"
                        id={`shape-line-width-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.lineWidth}
                        onChange={(event) =>
                            handler("lineWidth", Number(event.target.value))
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`shape-stroke-style-${layerID}`}
                        className="property-wrapper__label"
                    >
                        stroke style:
                    </label>
                    <input
                        type="color"
                        id={`shape-stroke-style-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.strokeStyle}
                        onChange={(event) =>
                            handler("strokeStyle", event.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default ShapeStrokeStyle;
