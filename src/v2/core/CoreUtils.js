export function generateProjectName() {
  return `untitled-${Date.now().toString().slice(-6)}`;
}

export function generateID() {
  return crypto.randomUUID();
}

export function generateLayerName(layerType = "layer") {
  return `${layerType}-${Date.now().toString().slice(-6)}`;
}

export function deg2Rad(deg) {
  return deg * (Math.PI / 180);
}
