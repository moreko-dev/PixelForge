import TemplatesContent from "../features/starter/templates/TemplatesContent";
import TemplatesHeader from "../features/starter/templates/TemplatesHeader";

function TemplatesPage() {
  return (
    <div className="relative p-4 overflow-y-auto overflow-x-hidden">
      <TemplatesHeader />
      <TemplatesContent />
    </div>
  );
}

export default TemplatesPage;
