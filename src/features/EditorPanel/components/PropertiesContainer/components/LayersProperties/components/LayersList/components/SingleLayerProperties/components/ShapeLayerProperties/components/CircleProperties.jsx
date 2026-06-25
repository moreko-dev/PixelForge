function CircleProperties({ layerID, layerProps, handler }) {
    return (
        <>
            <div className="property-section">
                <h3 className="property-section__title">Shape Dimension</h3>
                <div className="property-section__content">
                    <div className="property-wrapper__sbs">
                        {["x", "y"].map((item, index) => (
                            <div key={index} className="property-wrapper">
                                <label
                                    htmlFor={`circle-${item}-${layerID}`}
                                    className="property-wrapper__label"
                                >
                                    {item}:
                                </label>
                                <input
                                    type="number"
                                    id={`circle-${item}-${layerID}`}
                                    className="property-wrapper__input"
                                    value={layerProps[item]}
                                    onChange={(event) =>
                                        handler(
                                            item,
                                            Number(event.target.value),
                                        )
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
                    <div className="property-wrapper">
                        <label
                            htmlFor={`circle-radius-${layerID}`}
                            className="property-wrapper__label"
                        >
                            radius:
                        </label>
                        <input
                            type="number"
                            id={`circle-radius-${layerID}`}
                            className="property-wrapper__input"
                            value={layerProps.radius}
                            onChange={(event) =>
                                handler("radius", Number(event.target.value))
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CircleProperties;
