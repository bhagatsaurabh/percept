var canvas = new Percept.Canvas(document.getElementById('canvas'));

var rect1 = new Percept.View.Rectangle(
    'rect1',
    new Percept.Vector2(canvas.width * .3, canvas.height / 2),
    20, 20,
    {
        fill: true,
        fillColor: 'orange',
    }
);

var rect2 = new Percept.View.Rectangle(
    'rect2',
    new Percept.Vector2(canvas.width * .6, canvas.height / 2),
    40, 40,
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