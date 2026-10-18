import type { ReactNode } from "react";

type ButtonProps = Omit<React.ComponentProps<"button">, "className"> & {
  className?: string;
  children?: ReactNode;
};

export function DefaultButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={[
        "cursor-pointer size-10 text-lg rounded-full",
        "flex items-center justify-center",
        "bg-secondary text-secondary-foreground transition-colors duration-300",
        "hover:bg-secondary-hover disabled:bg-secondary-disabled",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

// Need to complete
