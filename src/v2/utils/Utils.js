export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject(new Error("Error: Image load failed."));
      };
      image.src = event.target.result;
    };
    reader.onerror = () => {
      reject(new Error("Error: File load failed."));
    };

    reader.readAsDataURL(file);
  });
}
