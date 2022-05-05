// Create a new Percept.Canvas
let canvas = new Percept.Canvas(document.getElementById("canvas"));

// Create new Drawings by providing the reference to Percept.Canvas
let drawing1 = new Percept.Drawing(canvas);
let drawing2 = new Percept.Drawing(canvas);
let drawing3 = new Percept.Drawing(canvas);

const drawings = [drawing1, drawing2, drawing3];

const [redShape, greenShape, blueShape] = ["red", "green", "blue"].map(
  (color) => {
    return new Percept.View.Rectangle(
      "rect",
      new Percept.Vector(100, 100),
      100,
      30,
      {
        fill: true,
        fillColor: color,
      }
    );
  }
);

// Add Views to Drawings
drawing1.add(redShape);
drawing2.add(greenShape);
drawing3.add(blueShape);

// Finally, start rendering the Drawings
setInterval(() => {
  canvas.draw(drawings[Math.floor(Math.random() * 3)]);
}, 500);
