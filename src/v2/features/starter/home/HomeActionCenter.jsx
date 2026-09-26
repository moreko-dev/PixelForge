function HomeActionCenter({ children, title, desc, className = "" }) {
  return (
    <div className="flex flex-col px-8 mb-8">
      <span className="text-xl font-bold">{title}</span>
      <span className="text-sm text-text-muted mb-4">{desc}</span>
      <div className={className}>{children}</div>
    </div>
  );
}

export default HomeActionCenter;
