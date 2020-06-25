var canvas = new Percept.Canvas(document.getElementById('canvas'));
var drawing = new Percept.Drawing(canvas);

for (var i = 0 ; i < 50 ; i++) {
    var empty = new Percept.View.Empty('empty' + i, new Percept.Vector2(canvas.width / 2, canvas.height / 2));
    empty.on('update', function(view) {
        Percept.Debug.debugPoint(view.id, drawing, view.absolutePosition, {color: 'blue'});
    });
}

drawing.add(empty);
canvas.draw(drawing);