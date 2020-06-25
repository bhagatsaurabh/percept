var canvas = new Percept.Canvas(document.getElementById('canvas'));

var circle1 = new Percept.View.Ellipse('circle1', new Percept.Vector2(canvas.width * .33, canvas.height / 2), 30, 30, {
    fill: true,
    fillColor: 'red'
});
var circle2 = new Percept.View.Ellipse('circle2', new Percept.Vector2(50, 0), 15, 15, {
    fill: true,
    fillColor: 'green'
});
var circle3 = new Percept.View.Ellipse('circle3', new Percept.Vector2(25, 0), 5, 5, {
    fill: true,
    fillColor: 'blue'
});
circle3.parent = circle2;
circle2.parent = circle1;

var circle4 = new Percept.View.Ellipse('circle4', new Percept.Vector2(canvas.width * .66, canvas.height / 2), 30, 30, {
    fill: true,
    fillColor: 'red'
});
var circle5 = new Percept.View.Ellipse('circle5', new Percept.Vector2(50, 0), 15, 15, {
    fill: true,
    fillColor: 'green'
});
var circle6 = new Percept.View.Ellipse('circle6', new Percept.Vector2(25, 0), 5, 5, {
    fill: true,
    fillColor: 'blue'
});
circle6.parent = circle5;
circle5.parent = circle4;

var drawing = new Percept.Drawing(canvas, () => {
    circle2.rotation += 1;
    circle3.rotation += 4;

    circle5.rotation += 1;
    circle6.rotation += 4;

    Percept.Debug.debugPoint('normalDebug', drawing, circle3.absolutePosition, {color: 'orange', radius: 3});
    Percept.Debug.debugPoint('persistDebug', drawing, circle6.absolutePosition, {color: 'orange', radius: 3}, 300);
});
drawing.add(circle1);
drawing.add(circle4);

canvas.draw(drawing);