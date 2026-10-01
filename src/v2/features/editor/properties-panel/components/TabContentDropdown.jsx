import { LuChevronDown, LuImage } from "react-icons/lu";
function TabContentDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className={`cursor-pointer w-full border border-border rounded-sm flex gap-2 items-center p-2 transition-colors duration-300 hover:bg-border
            ${open ? "bg-border! rounded-none! rounded-t-sm! border-b-border-strong" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="p-2 border border-border-strong bg-border rounded-sm text-text-secondary">
          <LuImage />
        </div>
        <span className="flex-1 text-start">image-123456</span>
        <LuChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="p-2 bg-border border border-border rounded-b-sm">
          Layer props
        </div>
      )}
    </div>
  );
}

export default TabContentDropdown;

import { useState } from "react";

export function LayerDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-64">
      {/* Layer */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={[
          "flex w-full items-center gap-2",
          "rounded-md border px-2 py-1.5",
          "bg-[var(--pf-surface)]",
          "border-[var(--pf-border)]",
          "text-[var(--pf-text)]",
          "transition-colors",
          "hover:bg-[var(--pf-surface-hover)]",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--pf-focus)]",
        ].join(" ")}
      >
        {/* Layer icon */}
        <div
          className="
            flex h-7 w-7 shrink-0 items-center justify-center
            rounded
            border border-[var(--pf-border)]
            bg-[var(--pf-surface-hover)]
            text-xs
            text-[var(--pf-text-muted)]
          "
        >
          T
        </div>

        {/* Layer name */}
        <span className="flex-1 truncate text-left text-sm font-medium">
          Text Layer
        </span>

        {/* Chevron */}
        <svg
          className={[
            "h-4 w-4 text-[var(--pf-text-muted)]",
            "transition-transform duration-150",
            open ? "rotate-180" : "",
          ].join(" ")}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            d="m5 7.5 5 5 5-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Properties dropdown */}
      {open && (
        <div
          className="
            absolute left-0 right-0 top-full z-50 mt-1
            overflow-hidden
            rounded-lg
            border border-[var(--pf-border)]
            bg-[var(--pf-surface-elevated)]
            p-2
            shadow-lg
          "
        >
          {/* Opacity */}
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-xs text-[var(--pf-text-muted)]">Opacity</span>

            <span className="text-xs font-medium text-[var(--pf-text)]">
              100%
            </span>
          </div>

          {/* Blend mode */}
          <button
            type="button"
            className="
              flex w-full items-center justify-between
              rounded-md px-2 py-1.5
              text-xs
              text-[var(--pf-text-secondary)]
              hover:bg-[var(--pf-surface-hover)]
            "
          >
            <span>Blend Mode</span>
            <span className="text-[var(--pf-text-muted)]">Normal</span>
          </button>

          <div className="my-1.5 h-px bg-[var(--pf-border-subtle)]" />

          {/* Position */}
          <div className="px-2 py-1.5">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--pf-text-subtle)]">
              Position
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-[var(--pf-control)] px-2 py-1.5">
                <span className="text-[10px] text-[var(--pf-text-subtle)]">
                  X
                </span>
                <p className="text-xs text-[var(--pf-text)]">120 px</p>
              </div>

              <div className="rounded-md bg-[var(--pf-control)] px-2 py-1.5">
                <span className="text-[10px] text-[var(--pf-text-subtle)]">
                  Y
                </span>
                <p className="text-xs text-[var(--pf-text)]">80 px</p>
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="px-2 py-1.5">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--pf-text-subtle)]">
              Size
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-[var(--pf-control)] px-2 py-1.5">
                <span className="text-[10px] text-[var(--pf-text-subtle)]">
                  W
                </span>
                <p className="text-xs text-[var(--pf-text)]">240 px</p>
              </div>

              <div className="rounded-md bg-[var(--pf-control)] px-2 py-1.5">
                <span className="text-[10px] text-[var(--pf-text-subtle)]">
                  H
                </span>
                <p className="text-xs text-[var(--pf-text)]">120 px</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
