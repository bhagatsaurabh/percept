var canvas = new Percept.Canvas(document.getElementById('ex2R'));

var rectangle1 = new Percept.View.Rectangle('rect1', new Percept.Vector2(canvas.width / 2, canvas.height / 2), 15, 15, {
    fill: true, fillColor: 'red'
});
var rectangle2 = new Percept.View.Rectangle('rect1', rectangle1.position.add(100, 0), 15, 15, {
    fill: true, fillColor: 'green'
});

var line = new Percept.View.Line('myLine', rectangle1, rectangle2, 0, {
    color: 'blue',
    width: 3
});

var drawing = new Percept.Drawing(canvas, () => {
    rectangle2.position.addInPlace(0, .2);
});

drawing.add(rectangle1);
drawing.add(rectangle2);
drawing.add(line);
canvas.draw(drawing);