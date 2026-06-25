function TextDimension({ layerID, layerProps, handler }) {
    return (
        <div className="property-section">
            <h3 className="property-section__title">Text Dimension</h3>
            <div className="property-section__content">
                <div className="property-wrapper__sbs">
                    {["x", "y"].map((item, index) => (
                        <div key={index} className="property-wrapper">
                            <label
                                htmlFor={`text-${item}-${layerID}`}
                                className="property-wrapper__label"
                            >
                                {item}:
                            </label>
                            <input
                                type="text"
                                id={`text-${item}-${layerID}`}
                                className="property-wrapper__input"
                                value={layerProps[item]}
                                onChange={(event) =>
                                    handler(item, Number(event.target.value))
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TextDimension;
