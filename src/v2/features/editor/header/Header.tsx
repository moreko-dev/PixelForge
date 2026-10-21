import Logo from "@src/assets/images/logo.png";
import VSeprator from "@src/components/VSeprator.js";
import DownloadButton from "./componets/DownloadButton.js";
import ExportButton from "./componets/ExportButton.js";
import HomeButton from "./componets/HomeButton.js";
import ReportBugButton from "./componets/ReportBugButton.js";

function Header() {
  return (
    <div className="col-span-3 bg-toolbar flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center">
        <img
          src={Logo}
          alt="PixelForge logo"
          className="h-8 mix-blend-lighten p-1"
        />
        <span className="text-xl leading-none">
          PixelForge <span className="text-brand">Editor</span>
        </span>
      </div>

      <div className="h-full flex gap-2">
        <ReportBugButton />
        <VSeprator marginValue={1} />
        <DownloadButton />
        <ExportButton />
        <VSeprator marginValue={1} />
        <HomeButton />
      </div>
    </div>
  );
}

export default Header;
