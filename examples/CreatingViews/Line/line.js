var canvas = new Percept.Canvas(document.getElementById('canvas'));

var line = new Percept.View.Line(
    'myLine',
    new Percept.Vector2(canvas.width / 2, canvas.height / 2),
    new Percept.Vector2(canvas.width / 2 + 100, canvas.height / 2 + 100),
    0,
    {
        color: 'red',
        width: 3
    }
);

var drawing = new Percept.Drawing(canvas);

drawing.add(line);
canvas.draw(drawing);