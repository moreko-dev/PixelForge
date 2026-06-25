import ImageDimension from "./components/ImageDimension";
import ImageFilters from "./components/ImageFilters";
import ImagePosition from "./components/ImagePosition";
import ImageRotation from "./components/ImageRotation";
import ImageSize from "./components/ImageSize";

function ImageLayerProperties({ layerID }) {
    return (
        <>
            <ImageDimension layerID={layerID} />
            <ImageSize layerID={layerID} />
            <ImagePosition layerID={layerID} />
            <ImageFilters layerID={layerID} />
            <ImageRotation layerID={layerID} />
        </>
    );
}

export default ImageLayerProperties;
