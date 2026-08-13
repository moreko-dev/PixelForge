import RectangleShape from "./layers/RectangleShape.js";

const rectangle = new RectangleShape({
    id: "12",
    name: "test",
    visible: true,
    locked: false,
});
console.log(rectangle.type);
console.log(rectangle.shapeType);
