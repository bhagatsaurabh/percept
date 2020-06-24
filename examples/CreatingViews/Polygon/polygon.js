var canvas = new Percept.Canvas(document.getElementById('canvas'));

var poly = new Percept.View.Polygon(
    'poly',
    [
        new Percept.Vector2(100, 0),
        new Percept.Vector2(200, 100),
        new Percept.Vector2(150, 200),
        new Percept.Vector2(50, 200),
        new Percept.Vector2(0, 100),
    ],
    Percept.Handle.AUTO,
    {
        fill: true,
        fillColor: 'green',
    }
);
poly.position = new Vector2(canvas.width / 2, canvas.height / 2);

var drawing = new Percept.Drawing(canvas);
drawing.add(poly);
canvas.draw(drawing);