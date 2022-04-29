var canvas = new Percept.Canvas(document.getElementById('canvas'));
var drawing = new Percept.Drawing(canvas);

for (var i = 0 ; i < 100 ; i++) {
    var image = new Percept.View.Image(
        'image' + i,
        Percept.Vector.Random(canvas),
        'https://upload.wikimedia.org/wikipedia/commons/f/fa/Barrel_icon.png',
        50, 50
    );

    drawing.add(image);
}

canvas.draw(drawing);
