var canvas = new Percept.Canvas(document.getElementById('canvas'));
var drawing = new Percept.Drawing(canvas);

for (var i = 0 ; i < 20 ; i++) {
    var strider = new Percept.View.Ellipse('strider' + i, new Percept.Vector2(canvas.width / 2, canvas.height / 2), 4, 4, {
        fill: true,
        fillColor: Percept.Color.Random(),
        shadowColor: 'black',
        shadowBlur: 3
    });

    strider.currentTarget = Percept.Vector2.Random(canvas);
    strider.on('update', (view) => {
        if (Percept.Vector2.Distance(view.absolutePosition, view.currentTarget) <= 1) {
            view.currentTarget = Percept.Vector2.Random(canvas);
        }

        view.position = Percept.Vector2.Lerp(view.position, view.currentTarget, .05);
    });

    drawing.add(strider);
}

canvas.draw(drawing);