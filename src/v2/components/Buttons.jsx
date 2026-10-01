export function DefaultButton({ children, className, ...props }) {
  return (
    <button
      className={`bg-border border border-border-strong transition-colors duration-300 hover:bg-border-strong ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ToolsButton({ children, className, active = false, ...props }) {
  return (
    <button
      className={`transition-colors duration-300 hover:bg-surface-hover border border-transparent ${active ? "bg-linear-to-r from-primary/20 to-surface-elevated border-primary-active/50! text-primary" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      className={`bg-primary text-primary-foreground transition-colors duration-300 hover:bg-primary-hover disabled:bg-primary-muted ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryLineButton({ children, className, ...props }) {
  return (
    <button
      className={`bg-transparent text-primary underline underline-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className, ...props }) {
  return (
    <button
      className={`bg-secondary transition-colors duration-300 hover:bg-secondary-hover disabled:bg-secondary-muted ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function DangerButton({ children, className, ...props }) {
  return (
    <button
      className={`bg-danger transition-colors duration-300 hover:bg-danger-hover disabled:bg-danger-muted ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
