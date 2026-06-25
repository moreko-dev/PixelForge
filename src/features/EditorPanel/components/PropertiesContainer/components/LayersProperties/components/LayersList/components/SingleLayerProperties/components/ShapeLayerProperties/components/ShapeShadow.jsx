function ShapeShadow({ layerID, layerProps, handler }) {
    return (
        <div className="property-section">
            <h3 className="property-section__title">Shape Shadow</h3>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`shape-shadow-color-${layerID}`}
                        className="property-wrapper__label"
                    >
                        shadow color:
                    </label>
                    <input
                        type="color"
                        id={`shape-shadow-color-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.shadowColor}
                        onChange={(event) =>
                            handler("shadowColor", event.target.value)
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`shape-shadow-blur-${layerID}`}
                        className="property-wrapper__label"
                    >
                        shadow blur:
                    </label>
                    <input
                        type="number"
                        id={`shape-shadow-blur-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.shadowBlur}
                        onChange={(event) =>
                            handler("shadowBlur", Number(event.target.value))
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`shape-shadow-offsetx-${layerID}`}
                        className="property-wrapper__label"
                    >
                        sh. offsetX:
                    </label>
                    <input
                        type="number"
                        id={`shape-shadow-offsetx-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.shadowOffsetX}
                        onChange={(event) =>
                            handler("shadowOffsetX", Number(event.target.value))
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`shape-shadow-offsetY-${layerID}`}
                        className="property-wrapper__label"
                    >
                        sh. offsetY:
                    </label>
                    <input
                        type="number"
                        id={`shape-shadow-offsetY-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.shadowOffsetY}
                        onChange={(event) =>
                            handler("shadowOffsetY", Number(event.target.value))
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default ShapeShadow;
