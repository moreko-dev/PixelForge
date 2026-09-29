import CloudContent from "../features/starter/cloud/CloudContent";
import CloudHeader from "../features/starter/cloud/CloudHeader";

function CloudPage() {
  return (
    <div className="relative p-4 overflow-y-auto overflow-x-hidden">
      <CloudHeader />
      <CloudContent />
    </div>
  );
}

export default CloudPage;
