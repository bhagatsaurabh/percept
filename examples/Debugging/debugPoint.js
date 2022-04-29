var canvas = new Percept.Canvas(document.getElementById('canvas'));

var poly1 = new Percept.View.Polygon('poly1',
    [
        new Percept.Vector(0, 0),
        new Percept.Vector(100, 50),
        new Percept.Vector(70, 100),
        new Percept.Vector(40, 70),
        new Percept.Vector(20, 20),
        new Percept.Vector(10, 10),
    ],
    Percept.Handle.AUTO,
    {
        fill: true,
        fillColor: '#ffffff'
    }
);
poly1.position = new Percept.Vector(canvas.width / 2, canvas.height / 2);

var drawing = new Percept.Drawing(canvas, () => {
    poly1.localRotation += 1;

    Percept.Debug.debugPoint('polyCenter', drawing, poly1.absolutePosition, {color: 'blue', radius: 3});
});

drawing.add(poly1);

canvas.draw(drawing);
