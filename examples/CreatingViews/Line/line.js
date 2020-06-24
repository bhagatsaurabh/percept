var line = new Percept.View.Line(
    'myLine',
    new Percept.Vector2(100, 100),
    new Percept.Vector2(200, 200),
    0,
    {
        color: 'red',
        width: 3
    }
 );
 
 var canvas = new Percept.Canvas(document.getElementById('canvas'));
 var drawing = new Percept.Drawing(canvas);
 
 drawing.add(line);
 canvas.draw(drawing);