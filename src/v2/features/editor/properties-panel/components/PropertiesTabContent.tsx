import { EmptyState } from "@src/components/EmptyState.js";

function PropertiesTabContent() {
  return (
    <div>
      <EmptyState
        title="No Selection!"
        description="Select layer to start editing."
        className="min-h-fit! p-4! border-none!"
      />
    </div>
  );
}

export default PropertiesTabContent;
