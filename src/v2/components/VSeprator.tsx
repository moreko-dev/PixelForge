function VSeprator({ marginValue = 4 }) {
  return (
    <div
      className="h-full w-px border border-divider"
      style={{ marginInline: `${marginValue * 0.25}rem` }}
    ></div>
  );
}

export default VSeprator;
