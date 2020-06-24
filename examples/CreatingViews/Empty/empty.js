var canvas = new Percept.Canvas(document.getElementById('canvas'));

var empty = new Percept.View.Empty('empty', new Percept.Vector2(canvas.width / 2, canvas.height / 2));

var drawing = new Percept.Drawing(canvas, () => {
    Percept.Debug.debugPoint('emptyView', drawing, empty.absolutePosition, {color: 'blue'});
});
drawing.add(empty);
canvas.draw(drawing);