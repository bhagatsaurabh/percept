<p style="text-align: center"><img style="max-width:50%" alt="Percept" src="https://raw.githubusercontent.com/saurabh-prosoft/percept/master/static/logo.png" /></p>

<h2 style="text-align:center">An HTML5 Canvas Rendering Engine</h2>

<br/>

Working with HTML5 canvas can be quite difficult, especially if you're making an
animation, game, or adding interactivity.
<br/>
Percept provides an easy-to-use API for rendering on canvas.

[percept.saurabhagat.me](https://percept.saurabhagat.me)

* [API Documentation](https://docs.percept.saurabhagat.me)
* [Examples](https://percept.saurabhagat.me)
* [Online Playground](https://percept.saurabhagat.me/playground)

<br/>

## Installation & Usage
<br/>

### Node / ESModule

```shell
npm i canvas-percept
```
or
```shell
yarn add canvas-percept
```
<br/>

```js
import * as Percept from 'canvas-percept'
```

<br/>

### CDN

[https://cdn.jsdelivr.net/npm/canvas-percept@latest/dist/percept.js](https://cdn.jsdelivr.net/npm/canvas-percept@latest/dist/percept.js)

```html
<script src="https://cdn.jsdelivr.net/npm/canvas-percept@latest/dist/percept.js"></script>
```

<br/>

## Example

Drawing a simple draggable rotating shape

```javascript
let canvas = new Percept.Canvas(document.getElementById("canvas"));

let shape = new Percept.View.Rectangle(
  "rect",
  new Percept.Vector(canvas.width / 2, canvas.height / 2), 100, 30,
  {
    fill: true,
    fillColor: new Percept.View.LinearGradient(
      Percept.Vector.Zero(), 45,
      Percept.Handle.AUTO,
      ["#57cfd2", "#987bd2", "#ffd966"],
      [0, 0.5, 1]
    ),
    shadowColor: "#000",
    shadowBlur: 5,
  }
);
let text = new Percept.View.Text(
  "caption",
  new Percept.Vector(80, 0), "Drag Me !",
  { font: "bold 12px Arial", fillColor: 'green' }
);

text.parent = shape;

shape.on("drag", (view, pos) => (view.position = pos));
shape.on("update", () => {
  shape.props.fillColor.degrees -= 5;
  shape.localRotation += 1;
  text.rotation -= 1;
});

let drawing = new Percept.Drawing(canvas);
drawing.add(shape);

canvas.draw(drawing);

```

See this in action in the [Playground](https://percept.saurabhagat.me/playground) !

<br/>

## Build & Local Development

To output all module types, run
```shell
npm run build
```

<br/>

To target a specific type, run
```shell
# CommonJS modules
npm run build:cjs

# ECMAScript (ES) modules
npm run build:esm

# UMD modules
npm run build:umd
```

<br/>

API Documentation is generated using [TypeDoc](https://typedoc.org/)

```shell
npm run docs
```

<br/>

## Testing

Run tests with coverage using [Jest](https://jestjs.io/)

```shell
npm run test
```
<br/>

## License

[MIT](./LICENSE)


Copyright &copy; 2021-present | Saurabh Bhagat
