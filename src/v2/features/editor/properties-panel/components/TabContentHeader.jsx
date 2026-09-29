function TabContentHeader({ title }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="inline-block w-4 h-1 bg-primary-active rounded-full"></span>
      <span className="text-lg font-bold">{title}</span>
      <span className="inline-block flex-1 h-px bg-surface-elevated"></span>
    </div>
  );
}

export default TabContentHeader;
