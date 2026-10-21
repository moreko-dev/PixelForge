import { PrimaryButton } from "@src/components/buttons.js";
import { LuDownload } from "react-icons/lu";

function DownloadButton() {
  return (
    <PrimaryButton icon={<LuDownload />} size="sm" className="rounded!">
      Download
    </PrimaryButton>
  );
}

export default DownloadButton;
