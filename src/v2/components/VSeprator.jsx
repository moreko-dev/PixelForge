function VSeprator({variant}) {
  const variants = {
    danger: "from-danger/50",
    primary: "from-primary/50",
  };
  return (
    <div
      className={`w-px h-full mx-1 bg-radial ${variants[variant] ?? variants.primary} to-transparent`}
    ></div>
  );
}

export default VSeprator;
