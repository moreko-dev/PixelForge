function CanvasViewer() {
  return (
    <div className="bg-workspace overflow-auto p-20! grid place-items-center">
      <canvas
        width={800}
        height={600}
        className="bg-white border border-black"
      ></canvas>
    </div>
  );
}

export default CanvasViewer;
