var line = new Percept.View.Line(
    'myLine',
    new Percept.Vector2(100, 100),
    new Percept.Vector2(200, 200),
    {
        color: 'red',
        width: 3
    }
 );
 
 var canvas = new Percept.Canvas();
 var drawing = new Percept.Drawing(canvas);
 
 drawing.add(line);
 canvas.draw(drawing);