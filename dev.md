///////// Calculating the rect and line bouding \\\\\\\\\
// let layerX, layerY, layerWidth, layerHeight;
// if (sx < ex && sy > ey) {
// // To Right Top
// layerX = sx;
// layerY = ey;
// layerWidth = ex - sx;
// layerHeight = sy - ey;
// } else if (sx > ex && sy > ey) {
// // To Left Top
// layerX = ex;
// layerY = ey;
// layerWidth = sx - ex;
// layerHeight = sy - ey;
// } else if (sx > ex && sy < ey) {
// // To Left Down
// layerX = ex;
// layerY = sy;
// layerWidth = sx - ex;
// layerHeight = ey - sy;
// } else if (sx < ex && sy < ey) {
// // To Right Down
// layerX = sx;
// layerY = sy;
// layerWidth = ex - sx;
// layerHeight = ey - sy;
// } else if (sx === ex && sy === ey) {
// // Just a click
// layerX = sx;
// layerY = sy;
// layerWidth = layerHeight = 0;
// } else if (sx === ex) {
// // On X axis
// layerX = sx;
// layerY = sy;
// layerWidth = ex - sx;
// layerHeight = ey - sy;
// } else if (sy === ey) {
// // On Y axis
// layerX = sx;
// layerY = sy;
// layerWidth = ex - sx;
// layerHeight = ey - sy;
// }
// return { x: layerX, y: layerY, w: layerWidth, h: layerHeight };
// if (sy > ey && sx < ex) {
// layerX = sx;
// layerHeight = sy - ey;
// layerY = sy - layerHeight;
// layerWidth = sx + (ex - sx);
// } else if (sy > ey && sx > ex) {
// layerX = ex;
// layerY = ey;
// layerWidth = ex + (sx - ex);
// layerHeight = ey + (sy - ey);
// } else if (sx > ex && sy < ey) {
// layerX = ex;
// layerHeight = ey - sy;
// layerY = ey - layerHeight;
// layerWidth = ex + (sx - ex);
// } else {
// layerX = sx;
// layerY = sy;
// layerWidth = ex - sx;
// layerHeight = ey - sy;
// }
// return { x: layerX, y: layerY, w: layerWidth, h: layerHeight };
