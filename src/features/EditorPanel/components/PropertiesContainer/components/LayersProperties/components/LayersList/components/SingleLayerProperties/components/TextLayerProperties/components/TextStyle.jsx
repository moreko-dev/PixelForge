function TextStyle({ layerID, layerProps, handler }) {
    return (
        <div className="property-section">
            <h3 className="property-section__title">Text Style</h3>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`text-fill-style-${layerID}`}
                        className="property-wrapper__label"
                    >
                        fill style:
                    </label>
                    <input
                        type="color"
                        id={`text-fill-style-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.fillStyle}
                        onChange={(event) =>
                            handler("fillStyle", event.target.value)
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`text-font-size-${layerID}`}
                        className="property-wrapper__label"
                    >
                        font size:
                    </label>
                    <input
                        type="number"
                        id={`text-font-size-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.fontSize}
                        onChange={(event) =>
                            handler("fontSize", Number(event.target.value))
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <label
                        htmlFor={`text-font-family-${layerID}`}
                        className="property-wrapper__label"
                    >
                        font family:
                    </label>
                    <input
                        type="text"
                        id={`text-font-family-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.fontFamily}
                        onChange={(event) =>
                            handler("fontFamily", event.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default TextStyle;
