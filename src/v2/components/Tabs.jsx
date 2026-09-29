import { useState } from "react";

export function Tabs({ tabs, defaultTab, className = "" }) {
  const firstAvailableTab = tabs.find((tab) => !tab.disabled)?.id;

  const [activeTab, setActiveTab] = useState(defaultTab ?? firstAvailableTab);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={`w-full ${className}`}>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Tabs"
        className="flex gap-1 border-b border-border"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "relative px-4 py-2.5",
                "text-sm font-medium",
                "transition-colors duration-150",
                "outline-none",

                "text-text-muted",

                "hover:bg-surface-hover",
                "hover:text-text-secondary",

                "focus-visible:ring-2",
                "focus-visible:ring-focus",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-surface",

                isActive &&
                  [
                    "text-primary",
                    "after:absolute",
                    "after:inset-x-0",
                    "after:-bottom-px",
                    "after:h-0.5",
                    "after:bg-primary",
                  ].join(" "),

                tab.disabled &&
                  [
                    "cursor-not-allowed",
                    "text-text-disabled",
                    "hover:bg-transparent",
                    "hover:text-text-disabled",
                  ].join(" "),
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTabData && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTabData.id}`}
          aria-labelledby={`tab-${activeTabData.id}`}
          tabIndex={0}
          className="mt-4 rounded-lg bg-surface text-text outline-none focus-visible:ring-2 focus-visible:ring-focus px-4 overflow-y-auto"
        >
          {activeTabData.content}
        </div>
      )}
    </div>
  );
}
