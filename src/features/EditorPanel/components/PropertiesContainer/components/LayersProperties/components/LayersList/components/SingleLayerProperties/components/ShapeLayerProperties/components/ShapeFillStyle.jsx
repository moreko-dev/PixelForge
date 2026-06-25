function ShapeFillStyle({ layerID, layerProps, handler }) {
    return (
        <div className="property-section">
            <h3 className="property-section__title">Shape Fill</h3>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`shape-fill-style-${layerID}`}
                        className="property-wrapper__label"
                    >
                        fill style:
                    </label>
                    <input
                        type="color"
                        id={`shape-fill-style-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.fillStyle}
                        onChange={(event) =>
                            handler("fillStyle", event.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default ShapeFillStyle;
