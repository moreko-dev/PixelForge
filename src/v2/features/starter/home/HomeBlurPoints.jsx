function HomeBlurPoints() {
  return (
    <>
      <div className="absolute -z-1 -top-20 -left-20 h-72 w-72 rounded-full bg-focus/15 blur-3xl"></div>
      <div className="absolute -z-1 top-1/3 -right-20 h-80 w-80 rounded-full bg-warning/15 blur-3xl"></div>
      <div className="absolute -z-1 bottom-0 left-1/3 h-64 w-64 rounded-full bg-danger/15 blur-3xl"></div>
    </>
  );
}

export default HomeBlurPoints;
