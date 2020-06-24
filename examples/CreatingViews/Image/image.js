var canvas = new Percept.Canvas(document.getElementById('canvas'));
var drawing = new Percept.Drawing(canvas);

for (var i = 0 ; i < 100 ; i++) {
    var image = new Percept.View.Image(
        'image' + i,
        Percept.Vector2.Random(canvas),
        'https://commons.wikimedia.org/wiki/Category:Computer-generated_images#/media/File:Barrel_icon.png',
        50, 50
    );

    drawing.add(image);
}

canvas.draw(drawing);