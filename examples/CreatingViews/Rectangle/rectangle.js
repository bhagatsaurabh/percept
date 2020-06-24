var canvas = new Percept.Canvas(document.getElementById('canvas'));

var rect1 = new Percept.View.Rectangle(
    'rect1',
    new Percept.Vector2(canvas.width * .33, canvas.height / 2),
    40, 40,
    {
        fill: true,
        fillColor: 'orange',
    }
);

var rect2 = new Percept.View.Rectangle(
    'rect2',
    new Percept.Vector2(canvas.width * .66, canvas.height / 2),
    60, 60,
    {
        fill: true,
        outline: true,
        fillColor: 'yellow',
        outlineColor: 'blue'
    }
);

var drawing = new Percept.Drawing(canvas);

drawing.add(rect1);
drawing.add(rect2);
canvas.draw(drawing);