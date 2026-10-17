type ButtonProps = React.ComponentProps<"button">;

export function DefaultButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={[
        "cursor-pointer size-10 text-lg rounded-full",
        "flex items-center justify-center",
        "bg-secondary text-secondary-foreground transition-colors duration-300",
        "hover:bg-secondary-hover disabled:bg-secondary-disabled",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

// Need to complete
