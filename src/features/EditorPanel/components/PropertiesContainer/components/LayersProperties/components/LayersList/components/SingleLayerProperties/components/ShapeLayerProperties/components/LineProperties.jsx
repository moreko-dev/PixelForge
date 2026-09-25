import { shapeTypes } from "../../../../../../../../../../../../../data/Constants";
import ShapeFillStyle from "./ShapeFillStyle";
import ShapeShadow from "./ShapeShadow";
import ShapeStrokeStyle from "./ShapeStrokeStyle";

function LineProperties({ layerID, layerProps, handler }) {
    return (
        <>
            <ShapeFillStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={handler}
                shapeType={shapeTypes.LINE}
            />
            <ShapeStrokeStyle
                layerID={layerID}
                layerProps={layerProps}
                handler={handler}
                shapeType={shapeTypes.LINE}
            />
            <ShapeShadow
                layerID={layerID}
                layerProps={layerProps}
                handler={handler}
                shapeType={shapeTypes.LINE}
            />
        </>
    );
}

export default LineProperties;
