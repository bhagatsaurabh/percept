var canvas = new Percept.Canvas(document.getElementById('canvas'));

var rect1 = new Percept.View.Rectangle('rect1', Percept.Vector2.Random(canvas), 40, 40, {
    fill: true,
    fillColor: 'violet'
});

var rect2 = new Percept.View.Rectangle('rect2', Percept.Vector2.Random(canvas), 20, 20, {
    fill: true,
    fillColor: 'orange'
});

var rect3 = new Percept.View.Rectangle('rect3', Percept.Vector2.Random(canvas), 60, 60, {
    fill: true,
    fillColor: 'lime'
});

var drawing = new Percept.Drawing(canvas, () => {
    rect1.localRotation += .2;
    rect2.localRotation += 1;
    rect3.localRotation += .5;
});

drawing.add(rect1);
drawing.add(rect2);
drawing.add(rect3);

canvas.draw(drawing);