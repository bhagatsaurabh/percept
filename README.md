# Percept
An HTML5 Canvas rendering library

Working with HTML5 canvas can be quite cumbersome, especially if you are making an animation or game or adding interactivity, Percept provides an easy to use library for rendering on canvas.

## Usage - NPM

```
npm i canvas-percept
```

```javascript
import * as Percept from 'canvas-percept';
```

## Usage - CDN

[https://cdn.jsdelivr.net/npm/canvas-percept@1.0.0/bundles/percept.js](https://cdn.jsdelivr.net/npm/canvas-percept@1.0.0/bundles/percept.js)

```html
<script src="https://cdn.jsdelivr.net/npm/canvas-percept@1.0.0/bundles/percept.js"></script>
```

## Example

Drawing a simple draggable rotating rectangle

```javascript
let canvas = new Percept.Canvas(document.getElementById('canvas'));

let shape = new Percept.View.Rectangle('rect', new Percept.Vector(canvas.width / 2, canvas.height / 2), 100, 30, {
  fill: true,
  fillColor: new Percept.LinearGradient(Percept.Vector.Zero(), 45, Percept.Handle.AUTO, ['red', 'green', 'blue'], [0, .5, 1]),
  shadowColor: '#000',
  shadowBlur: 5
});
shape.on('drag', (view, pos) => view.position = pos);
shape.on('update', () => shape.localRotation += 1);

let drawing = new Percept.Drawing(canvas);
drawing.add(shape);
canvas.draw(drawing);
```

## Documentation
* [Docs](https://perceptjs.herokuapp.com/docs/)
* [Examples](https://perceptjs.herokuapp.com/)
