let canvas = new Percept.Canvas(document.getElementById("canvas"));

let middle = new Percept.View.Rectangle(
  "middle",
  new Percept.Vector(200, 200), 70, 30,
  {
    fill: true,
    fillColor: "#cc99ff",
    outline: true,
    outlineColor: "#3385ff",
    shadowColor: "#d2ff4d",
    shadowBlur: 5,
  }
);

function start() {
  middle.props.fillColor = "red";
  middle.childs.forEach((child) => {
    child.position.addInPlace(50);
  });
}
function stop() {
  middle.props.fillColor = "#cc99ff";
  middle.childs.forEach((child) => {
    child.position = Percept.Vector.Zero();
  });
}

middle.on("enter", start);
middle.on("exit", stop);
middle.on("down", start);
middle.on("up", stop);

let text = new Percept.View.Text(
  "caption",
  middle.position.subtract(0, 40), "Hover or Long press",
  { font: "12px Arial" }
);

for (let i = 0; i < 10; i++) {
  let movingCirc = new Percept.View.Ellipse(
    "movingCirc" + i,
    Percept.Vector.Zero(), 5, 5,
    {
      fill: true,
      fillColor: Percept.Color.Random(),
      shadowColor: "black",
      shadowBlur: 3,
    }
  );

  movingCirc.rotation = i * 36;
  movingCirc.on("update", (view) => {
    view.rotation += 1;
  });

  movingCirc.parent = middle;
}

let drawing = new Percept.Drawing(canvas);

drawing.add(middle);
drawing.add(text);

canvas.draw(drawing);
