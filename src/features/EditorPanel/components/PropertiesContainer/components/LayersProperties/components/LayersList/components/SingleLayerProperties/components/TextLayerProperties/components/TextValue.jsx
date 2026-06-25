function TextValue({ layerID, layerProps, handler }) {
    return (
        <div className="property-section">
            <h3 className="property-section__title">Text Value</h3>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`text-value-${layerID}`}
                        className="property-wrapper__label"
                    >
                        value:
                    </label>
                    <input
                        type="text"
                        id={`text-value-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.value}
                        onChange={(event) =>
                            handler("value", event.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default TextValue;
