function HSeprator({ marginValue = 4 }) {
  return (
    <div
      className="w-full h-px border border-divider"
      style={{ marginBlock: `${marginValue * 0.25}rem` }}
    ></div>
  );
}

export default HSeprator;
