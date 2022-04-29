var canvas = new Percept.Canvas(document.getElementById('canvas'));

var poly = new Percept.View.Polygon(
    'poly',
    [
        new Percept.Vector(100, 0),
        new Percept.Vector(200, 100),
        new Percept.Vector(150, 200),
        new Percept.Vector(50, 200),
        new Percept.Vector(0, 100),
    ],
    Percept.Handle.AUTO,
    {
        fill: true,
        fillColor: 'green',
    }
);
poly.position = new Percept.Vector(canvas.width / 2, canvas.height / 2);

var drawing = new Percept.Drawing(canvas);
drawing.add(poly);
canvas.draw(drawing);
