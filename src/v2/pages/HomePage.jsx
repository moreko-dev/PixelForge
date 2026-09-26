import { FiPlusSquare } from "react-icons/fi";
import { LuArrowRight, LuImages } from "react-icons/lu";
import home from "../asseets/home.png";

function HomePage() {
  return (
    <div className="p-4 overflow-auto">
      {/* Home page - hero section */}
      <div className="flex gap-2 items-center max-w-5xl w-full mx-auto">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-5xl font-bold">Turn Your Ideas Into</span>
            <span className="pb-2 text-5xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Stunning Images
            </span>
          </div>
          <div className="flex flex-col text-slate-400">
            <span>Edit, enhance and create beautiful images with ease.</span>
            <span>Start your next masterpierce today!</span>
          </div>
          <div className="flex gap-2">
            <button className="flex gap-2 items-center px-8 py-3 bg-cyan-600 rounded-full">
              <LuImages /> Open image
            </button>
            <button className="flex gap-2 items-center px-8 py-3 bg-transparent border border-cyan-600 rounded-full">
              <FiPlusSquare /> Create new
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img src={home} alt="Home page picture" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-col px-8 mb-8">
        <span className="text-lg font-bold">Quick Actions</span>
        <span className="text-sm text-slate-400">
          Get started with popular tools and features.
        </span>
        <div className="mt-4 flex gap-8">
          <div className="bg-slate-900 p-6 flex items-center gap-4 border border-slate-800 rounded-2xl">
            <div className="flex flex-col gap-2">
              <span className="w-fit bg-cyan-800 text-2xl p-3 rounded-lg border border-cyan-400/50">
                <LuImages />
              </span>
              <span className="text-lg mb-2">Open Image</span>
              <span className="text-slate-400 text-sm">
                Choose a photo from your device to start editing.
              </span>
            </div>
            <div>
              <LuArrowRight className="text-xl" />
            </div>
          </div>
          <div className="bg-slate-900 p-6 flex items-center gap-4 border border-slate-800 rounded-2xl">
            <div className="flex flex-col gap-2">
              <span className="w-fit bg-cyan-800 text-2xl p-3 rounded-lg border border-cyan-400/50">
                <LuImages />
              </span>
              <span className="text-lg mb-2">Open Image</span>
              <span className="text-slate-400 text-sm">
                Choose a photo from your device to start editing.
              </span>
            </div>
            <div>
              <LuArrowRight className="text-xl" />
            </div>
          </div>
          <div className="bg-slate-900 p-6 flex items-center gap-4 border border-slate-800 rounded-2xl">
            <div className="flex flex-col gap-2">
              <span className="w-fit bg-cyan-800 text-2xl p-3 rounded-lg border border-cyan-400/50">
                <LuImages />
              </span>
              <span className="text-lg mb-2">Open Image</span>
              <span className="text-slate-400 text-sm">
                Choose a photo from your device to start editing.
              </span>
            </div>
            <div>
              <LuArrowRight className="text-xl" />
            </div>
          </div>
          <div className="bg-slate-900 p-6 flex items-center gap-4 border border-slate-800 rounded-2xl">
            <div className="flex flex-col gap-2">
              <span className="w-fit bg-cyan-800 text-2xl p-3 rounded-lg border border-cyan-400/50">
                <LuImages />
              </span>
              <span className="text-lg mb-2">Open Image</span>
              <span className="text-slate-400 text-sm">
                Choose a photo from your device to start editing.
              </span>
            </div>
            <div>
              <LuArrowRight className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent projects */}
      <div className="flex flex-col px-8">
        <span className="text-lg font-bold">Recent Projects</span>
        <span className="text-sm text-slate-400">
          Continue working on your latest projects or images.
        </span>
        <div className="mt-4 flex gap-8">
          <span className="w-full text-slate-400 text-center py-12 border border-dashed border-cyan-800 rounded-lg ">
            No recent project or image found!
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
