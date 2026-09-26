export function DefaultButton({ children, className, ...props }) {
  return (
    <button
      className={`
        bg-border border border-border-strong transition-colors duration-300 hover:bg-border-strong
        ${className}
    `}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      className={`
        bg-primary text-primary-foreground transition-colors duration-300 hover:bg-primary-hover disabled:bg-primary-muted
        ${className}
    `}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryLineButton({ children, className, ...props }) {
  return (
    <button className={`bg-transparent text-primary underline underline-offset-2 ${className}`} {...props}>
      {children}
    </button>
  );
}
