import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  icon?: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <section
      className={[
        "flex min-h-72 w-full flex-col items-center",
        "justify-center gap-4 rounded border",
        "border-border-subtle bg-surface-sunken p-8 text-center",
        className,
      ].join(" ")}
    >
      {icon && (
        <div
          aria-hidden="true"
          className={[
            "flex size-14 items-center justify-center",
            "rounded-2xl bg-brand-soft text-brand",
            "[&>svg]:size-7",
          ].join(" ")}
        >
          {icon}
        </div>
      )}

      <div className="max-w-sm space-y-2">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>

        {description && (
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-1">{action}</div>}
    </section>
  );
}
