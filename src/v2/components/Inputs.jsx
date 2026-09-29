export function DefaultInput({ className, ...props }) {
  return (
    <input
      className={`outline-none bg-border border border-border-strong transition-colors duration-300 focus:bg-border-strong ${className}`}
      {...props}
    />
  );
}
