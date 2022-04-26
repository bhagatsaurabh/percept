import { Drawing } from "./drawing";

/**
 * The Canvas object holds an HTMLCanvasElement reference and its 2d context
 */
export class Canvas {
  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  offCanvasElement: OffscreenCanvas | HTMLCanvasElement;
  offContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

  width: number;
  height: number;
  private frameId: number = 0;

  /**
   * If no parameters are passed then a new canvas element will be created and appended to `<body>`
   *
   * @param element Reference to an html `<canvas>` or `<div>` element, if a `<div>` element is passed, then a canvas will be created and appended
   * @param width Passing a width will overwrite previously defined canvas width
   * @param height Passing a height will overwrite previously defined canvas height
   */
  constructor(
    element?: HTMLCanvasElement | HTMLDivElement,
    width?: number,
    height?: number
  ) {
    if (!element) {
      this.canvasElement = document.createElement("canvas");
      this.canvasElement.width = document.body.clientWidth;
      this.canvasElement.height = document.body.clientHeight;
      document.body.appendChild(this.canvasElement);
    } else {
      if (element instanceof HTMLDivElement) {
        this.canvasElement = document.createElement("canvas");
        if (width && height) {
          this.canvasElement.width = width;
          this.canvasElement.height = height;
        } else {
          this.canvasElement.width = element.clientWidth;
          this.canvasElement.height = element.clientHeight;
        }
        element.appendChild(this.canvasElement);
      } else {
        this.canvasElement = element;
        if (width && height) {
          this.canvasElement.width = width;
          this.canvasElement.height = height;
        }
      }
    }
    this.width = this.canvasElement.width;
    this.height = this.canvasElement.height;
    this.context = this.canvasElement.getContext("2d");

    if (typeof OffscreenCanvas !== "undefined") {
      this.offCanvasElement = new OffscreenCanvas(this.width, this.height);
      this.offContext = this.offCanvasElement.getContext("2d");
    } else {
      this.offCanvasElement = document.createElement("canvas");
      this.offCanvasElement.width = this.width;
      this.offCanvasElement.height = this.height;
      this.offContext = this.offCanvasElement.getContext("2d");
    }
  }

  /**
   * Calls render function of `Drawing`
   *
   * @param drawing A `Drawing` object, which will be rendered by this canvas
   */
  draw(drawing: Drawing) {
    this.stop();
    this.render(drawing);
  }

  /**
   * Stops rendering current Drawing
   */
  stop() {
    window.cancelAnimationFrame(this.frameId);
  }

  /* istanbul ignore next */
  private render(drawing: Drawing) {
    drawing.render();
    if (this.frameId < 0) return;
    this.frameId = window.requestAnimationFrame(
      this.render.bind(this, drawing)
    );
  }
}
