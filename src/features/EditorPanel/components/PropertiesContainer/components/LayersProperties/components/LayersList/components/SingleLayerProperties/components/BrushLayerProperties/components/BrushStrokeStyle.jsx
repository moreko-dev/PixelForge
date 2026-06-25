function BrushStrokeStyle({ layerID, layerProps, handler }) {
    return (
        <div className="property-section">
            <h3 className="property-section__title">Stroke Style</h3>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`brush-stroke-style-${layerID}`}
                        className="property-wrapper__label"
                    >
                        stroke style
                    </label>
                    <input
                        type="color"
                        id={`brush-stroke-style-${layerID}`}
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

export default BrushStrokeStyle;
