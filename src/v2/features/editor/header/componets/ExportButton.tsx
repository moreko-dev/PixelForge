import { SecondaryButton } from "@src/components/buttons.js";
import { CiExport } from "react-icons/ci";

function ExportButton() {
  return (
    <SecondaryButton icon={<CiExport />} size="sm" className="rounded!">
      Export
    </SecondaryButton>
  );
}

export default ExportButton;
