function HSeprator({ marginValue = 4 }) {
  return (
    <div
      className="w-full h-px border border-border-subtle"
      style={{ marginBlock: `${marginValue * 0.25}rem` }}
    ></div>
  );
}

export default HSeprator;
