import { useState } from "react";

type TabItemsType = {
  key: string;
  label: string;
  content: React.ReactNode;
};

type TabsType = {
  tabItems: TabItemsType[];
  defaultTab?: string;
  contentClass?: string;
};

function Tabs({ tabItems, defaultTab, contentClass }: TabsType) {
  const firstTabItem = tabItems[0];
  if (!firstTabItem)
    throw new Error("[Tabs.jsx] -> tabItems should has an item!");

  const [selectedItem, setSelectedItem] = useState<string>(
    defaultTab ?? firstTabItem.key,
  );
  const selectedItemContent = tabItems.find(
    (i) => i.key === selectedItem,
  )?.content;

  const handleTabButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.dataset.key;
    if (!key) throw new Error("[Tabs.jsx] -> Tab key doesn't found!");
    setSelectedItem(key);
  };

  return (
    <div className="w-full h-full">
      <div className="bg-surface-sunken border-b border-border-subtle select-none flex flex-nowrap overflow-x-auto scrollbar-hidden">
        {tabItems.map((item) => (
          <button
            key={item.key}
            data-key={item.key}
            data-state={selectedItem === item.key ? "active" : "inactive"}
            className="cursor-pointer border-b border-b-transparent text-sm px-6 py-2 leading-none data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-ghost-hover data-[state=active]:bg-surface-active data-[state=active]:text-foreground data-[state=active]:border-brand"
            onClick={handleTabButtonClick}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={`p-2 ${contentClass}`}>{selectedItemContent}</div>
    </div>
  );
}

export default Tabs;
