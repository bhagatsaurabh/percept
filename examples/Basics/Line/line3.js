var canvas = new Percept.Canvas(document.getElementById('ex3R'));

var line1 = new Percept.View.Line('line1', new Percept.Vector2(canvas.width * .3, canvas.height / 2), new Percept.Vector2(canvas.width * .4, canvas.height / 2), 0, {
    color: 'red'
});

var line2 = new Percept.View.Line('line2', new Percept.Vector2(canvas.width * .6, canvas.height / 2), new Percept.Vector2(canvas.width * .9, canvas.height / 2), 0.5, {
    color: 'green'
});

var drawing = new Percept.Drawing(canvas, () => {
    line1.localRotation += .5;
    line2.localRotation += .5;
});

drawing.add(line1);
drawing.add(line2);
canvas.draw(drawing);