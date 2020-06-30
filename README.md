# Percept
An HTML5 Canvas drawing framework

Working with HTML5 canvas can be quite cumbersome, especially if you are making an animation or game or adding interactivity, Percept provides an easy to use framework for rendering on canvas

## CDN

* [https://cdn.jsdelivr.net/gh/saurabh-prosoft/Percept@2.0/dist/percept.js](https://cdn.jsdelivr.net/gh/saurabh-prosoft/Percept@2.0/dist/percept.js)

## Usage
Drawing a simple draggable rotating rectangle

```javascript
var canvas = new Percept.Canvas(document.getElementById('canvas'));

var shape = new Percept.View.Rectangle('rect', new Percept.Vector2(canvas.width / 2, canvas.height / 2), 100, 30, {
  fill: true,
  fillColor: new Percept.LinearGradient(Percept.Vector2.Zero(), 45, Percept.Handle.AUTO, ['red', 'green', 'blue'], [0, .5, 1]),
  shadowColor: '#000',
  shadowBlur: 5
});
shape.on('drag', (view, pos) => {
   view.position = pos;
});
shape.on('update', () => {
  shape.localRotation += 1;
});

var drawing = new Percept.Drawing(canvas);
drawing.add(shape);
canvas.draw(drawing);
```

## Documentation
* [Docs](https://perceptjs.herokuapp.com/docs/)
* [Examples](https://perceptjs.herokuapp.com/)
