import { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { LuImage } from "react-icons/lu";
import { ToolsButton } from "../../../../components/Buttons";
import { loadImage } from "../../../../utils/Utils";
import ProjectContext from "./../../../../contexts/ProjectContext";
import ImageLayer from "./../../../../core/layers/ImageLayer";

function ImageTool() {
  const fileInputRef = useRef(null);
  const { projectState, forceUpdate } = useContext(ProjectContext);

  const handleImportImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (event) => {
    const selectedImage = event.target.files?.[0];
    if (!selectedImage) return;
    const loadingToast = toast.loading(
      `Importing images ${selectedImage.name} ...`,
    );
    if (!selectedImage.type.startsWith("image")) {
      toast.error("Only image files are allowed.", { id: loadingToast });
      return;
    }
    try {
      const image = await loadImage(selectedImage);
      const imageLayer = new ImageLayer({
        image: image,
        src: image.src,
        width: image.width,
        height: image.height,
      });
      projectState.current.addLayer(imageLayer);
      forceUpdate();
      toast.success("Image imported successfuly.", {
        id: loadingToast,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToolsButton
        className="select-none mt-auto rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer"
        active
        onClick={handleImportImageClick}
      >
        <LuImage /> Import Image
      </ToolsButton>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        hidden
      />
    </>
  );
}

export default ImageTool;
