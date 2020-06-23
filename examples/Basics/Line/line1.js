var rectangle1 = new Percept.View.Rectangle('rect1', new Percept.Vector2(100, 100), 50, 50, {
    fill: true, fillColor: 'red'
});
var rectangle2 = new Percept.View.Rectangle('rect1', new Percept.Vector2(100, 300), 50, 50, {
    fill: true, fillColor: 'green'
});

var line = new Percept.View.Line('myLine', rectangle1, rectangle2, 0, {
    color: 'blue',
    width: 3
});

var canvas = new Percept.Canvas(document.getElementById('ex1R'));
var drawing = new Percept.Drawing(canvas, () => {
    rectangle2.position.addInPlace(0, .2);
});

drawing.add(rectangle1);
drawing.add(rectangle2);
drawing.add(line);
canvas.draw(drawing);