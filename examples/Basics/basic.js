var line = new Percept.View.Line('myLine', new Percept.Vector2(200, 200), new Percept.Vector2(300, 300), 0, {
    color: 'red',
    width: 2,
    lineDashSegments: [15, 5]
});

var canvas = new Percept.Canvas();

var drawing = new Percept.Drawing(canvas);
drawing.add(line);

canvas.draw(drawing);