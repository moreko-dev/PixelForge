function TextShadow({ layerID, layerProps, handler }) {
    return (
        <div className="property-section">
            <h3 className="property-section__title">Text Shadow</h3>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`text-shadow-color-${layerID}`}
                        className="property-wrapper__label"
                    >
                        shadow color:
                    </label>
                    <input
                        type="color"
                        id={`text-shadow-color-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.shadowColor}
                        onChange={(event) =>
                            handler("shadowColor", event.target.value)
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`text-shadow-blur-${layerID}`}
                        className="property-wrapper__label"
                    >
                        shadow blur:
                    </label>
                    <input
                        type="number"
                        id={`text-shadow-blur-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.shadowBlur}
                        onChange={(event) =>
                            handler("shadowBlur", Number(event.target.value))
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`text-shadow-offsetx-${layerID}`}
                        className="property-wrapper__label"
                    >
                        sh. offsetX:
                    </label>
                    <input
                        type="number"
                        id={`text-shadow-offsetx-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.shadowOffsetX}
                        onChange={(event) =>
                            handler("shadowOffsetX", Number(event.target.value))
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`text-shadow-offsetY-${layerID}`}
                        className="property-wrapper__label"
                    >
                        sh. offsetY:
                    </label>
                    <input
                        type="number"
                        id={`text-shadow-offsetY-${layerID}`}
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

export default TextShadow;
