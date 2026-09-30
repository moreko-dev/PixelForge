import home from "../../../../asseets/home.png";
import CreateNewButton from "./components/CreateNewButton";
import OpenImageButton from "./components/OpenImageButton";

function HeroSection() {
  return (
    <>
      <div className="max-w-5xl w-full mx-auto flex gap-2 items-center mb-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-5xl font-bold">Turn Your Ideas Into</span>
            <span className="pb-2 text-5xl font-bold bg-linear-to-r from-focus to-accent bg-clip-text text-transparent">
              Stunning Images
            </span>
          </div>
          <div className="flex flex-col text-text-muted">
            <span>Edit, enhance and create beautiful images with ease.</span>
            <span>Start your next masterpierce today!</span>
          </div>
          <div className="flex gap-3 mt-4">
            <OpenImageButton />
            <CreateNewButton />
          </div>
        </div>
        <div className="flex-1">
          <img src={home} alt="Home page picture" />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
