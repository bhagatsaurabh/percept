var canvas = new Percept.Canvas(document.getElementById('canvas'));
var drawing = new Percept.Drawing(canvas);

var shapes = [];
var shape1 = new Percept.View.Rectangle('rect', new Percept.Vector2(canvas.width * .2, canvas.height / 2), 35, 35, {
    fill: true,
    fillColor: '#99FFCC'
});
var shape2 = new Percept.View.Ellipse('circle', new Percept.Vector2(canvas.width * .4, canvas.height / 2), 17.5, 17.5, {
    fill: true,
    fillColor: '#CCFF99'
});
var shape3 = new Percept.View.Polygon('poly',
    [
        new Percept.Vector2(17.5, 0),
        new Percept.Vector2(35, 28),
        new Percept.Vector2(0, 28)
    ],
    Percept.Handle.AUTO,
    {
        fill: true,
        fillColor: '#FFCC99	'
    }
);
shape3.position = new Percept.Vector2(canvas.width * .6, canvas.height / 2);
var shape4 = new Percept.View.Line('line',
    new Percept.Vector2(0, 0),
    new Percept.Vector2(35, 35),
    .5,
    {
        lineWidth: 5,
        color: '#FFFF99'
    }
);
shape4.position = new Percept.Vector2(canvas.width * .8, canvas.height / 2);

shapes.push(shape1, shape2, shape3, shape4);
shapes.forEach((shape) => {
    shape.on('drag', (view, pos) => {
        view.position = pos;
    });
});

var caption = new Percept.View.Text('caption', new Percept.Vector2(canvas.width / 2, canvas.height / 2 - 50), 'Drag shapes', {
    font: '12px Arial'
});

drawing.add(shapes);
drawing.add(caption);
canvas.draw(drawing);