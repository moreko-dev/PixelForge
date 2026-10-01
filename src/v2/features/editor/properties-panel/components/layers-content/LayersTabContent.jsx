import TabContentDropdown from "../TabContentDropdown";
import TabContentFields from "../TabContentFields";
import TabContentHeader from "../TabContentHeader";
import { filtersDetails } from "./../../../../../core/CoreConstants";

const layersShadowFields = [
  {
    id: "shadow-color",
    label: "Color",
    type: "color",
  },
  {
    id: "shadow-blur",
    label: "Blur",
    unit: "px",
    type: "number",
  },
  {
    id: "shadow-offsetx",
    label: "OffsetX",
    unit: "px",
    type: "number",
  },
  {
    id: "shadow-offsety",
    label: "OffsetY",
    unit: "px",
    type: "number",
  },
];

const layersFiltersFields = [
  {
    id: "filter-grayscale",
    label: "Grayscale",
    unit: filtersDetails[0].unit,
    type: "number",
  },
  {
    id: "filter-brightness",
    label: "Brightness",
    unit: filtersDetails[1].unit,
    type: "number",
  },
  {
    id: "filter-contrast",
    label: "Contrast",
    unit: filtersDetails[2].unit,
    type: "number",
  },
  {
    id: "filter-blur",
    label: "Blur",
    unit: filtersDetails[3].unit,
    type: "number",
  },
  {
    id: "filter-hueRotate",
    label: "HueRotate",
    unit: filtersDetails[4].unit,
    type: "number",
  },
  {
    id: "filter-saturate",
    label: "Saturate",
    unit: filtersDetails[5].unit,
    type: "number",
  },
  {
    id: "filter-sepia",
    label: "Sepia",
    unit: filtersDetails[6].unit,
    type: "number",
  },
  {
    id: "filter-opacity",
    label: "Opacity",
    unit: filtersDetails[7].unit,
    type: "number",
  },
];

function LayersTabContent() {
  return (
    <>
      <TabContentHeader title="Layers" />
      <div className="flex flex-col gap-2 my-2">
        <TabContentDropdown />
        <TabContentDropdown />
        <TabContentDropdown />
      </div>
      <TabContentHeader title="Shadow" />
      <TabContentFields fields={layersShadowFields} states={[]} />
      <TabContentHeader title="Filters" />
      <TabContentFields fields={layersFiltersFields} states={[]} />
    </>
  );
}

export default LayersTabContent;
