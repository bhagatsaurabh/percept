import { Drawing } from "./drawing";

/**
 * The Canvas object holds an HTMLCanvasElement reference and its 2d context
 */
export class Canvas {
  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  offCanvasElement: OffscreenCanvas | HTMLCanvasElement;
  offContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

  currDrawing: Drawing;
  private frameId: number = 0;
  private canvasObserver: MutationObserver;

  get width(): number {
    return this.canvasElement?.width;
  }
  get height(): number {
    return this.canvasElement?.height;
  }

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

    this.registerObservers();

    if (!(window as any)["PERCEPT_INSTANCES"]) {
      (window as any)["PERCEPT_INSTANCES"] = [];
    }
    (window as any)["PERCEPT_INSTANCES"].push(this);
  }

  /* istanbul ignore next */
  private registerObservers() {
    this.canvasObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "width" ||
            mutation.attributeName === "height")
        ) {
          this.draw(this.currDrawing);
        }
      });
    });

    this.canvasObserver.observe(this.canvasElement, { attributes: true });
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

  /**
   * Resumes rendering the current Drawing (if any)
   */
  resume() {
    if (this.currDrawing) {
      this.draw(this.currDrawing);
    }
  }

  /* istanbul ignore next */
  private render(drawing: Drawing) {
    this.currDrawing = drawing;
    drawing.render();
    if (this.frameId < 0) return;
    this.frameId = window.requestAnimationFrame(
      this.render.bind(this, drawing)
    );
  }
}
