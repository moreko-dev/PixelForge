import {
    LuCircle,
    LuCornerDownRight,
    LuMinus,
    LuPentagon,
    LuSquare,
    LuTriangle,
} from "react-icons/lu";

function BrushLineStyle({ layerID, layerProps, handler }) {
    const lineCapObject = [
        { id: 0, Icon: <LuMinus />, key: "butt" },
        { id: 1, Icon: <LuCircle />, key: "round" },
        { id: 2, Icon: <LuSquare />, key: "square" },
    ];
    const lineJoinObject = [
        { id: 0, Icon: <LuCornerDownRight />, key: "round" },
        { id: 1, Icon: <LuPentagon />, key: "bevel" },
        { id: 2, Icon: <LuTriangle />, key: "miter" },
    ];

    return (
        <div className="property-section">
            <h3 className="property-section__title">Line Style</h3>
            <div className="property-section__content">
                <div className="property-wrapper">
                    <label
                        htmlFor={`brush-line-width-${layerID}`}
                        className="property-wrapper__label"
                    >
                        line width
                    </label>
                    <input
                        type="number"
                        id={`brush-line-width-${layerID}`}
                        className="property-wrapper__input"
                        value={layerProps.lineWidth}
                        onChange={(event) =>
                            handler("lineWidth", Number(event.target.value))
                        }
                    />
                </div>
                <div className="property-wrapper">
                    <span className="property-wrapper__label">line cap</span>
                    {lineCapObject.map((item) => (
                        <button
                            key={item.id}
                            className="property-wrapper__button"
                            onClick={() => handler("lineCap", item.key)}
                        >
                            {item.Icon}
                        </button>
                    ))}
                </div>
                <div className="property-wrapper">
                    <span className="property-wrapper__label">line join</span>
                    {lineJoinObject.map((item) => (
                        <button
                            key={item.id}
                            className="property-wrapper__button"
                            onClick={() => handler("lineJoin", item.key)}
                        >
                            {item.Icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BrushLineStyle;
