import { Canvas } from "../../src/core/canvas";
import { Drawing } from "../../src/core/drawing";

jest.mock("../../src/core/drawing", () => {
  return {
    Drawing: function () {
      this.render = jest.fn(() => {});
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The Canvas constructor", () => {
  test("if Canvas is created with no args", () => {
    const canvas = new Canvas();

    expect(canvas.canvasElement).toStrictEqual(document.body.children[0]);
    expect(canvas.canvasElement.width).toStrictEqual(document.body.clientWidth);
    expect(canvas.canvasElement.height).toStrictEqual(
      document.body.clientHeight
    );
    expect(canvas.width).toStrictEqual(canvas.canvasElement.width);
    expect(canvas.height).toStrictEqual(canvas.canvasElement.height);
    expect(canvas.context).toStrictEqual(canvas.canvasElement.getContext("2d"));
  });

  test("if Canvas is created by passing the HTMLCanvasElement without dimensions", () => {
    const canvasEl = document.createElement("canvas");
    const canvas = new Canvas(canvasEl);

    expect(canvas.canvasElement).toStrictEqual(canvasEl);

    expect(canvas.width).toStrictEqual(canvas.canvasElement.width);
    expect(canvas.height).toStrictEqual(canvas.canvasElement.height);
    expect(canvas.context).toStrictEqual(canvas.canvasElement.getContext("2d"));
  });

  test("if Canvas is created by passing the HTMLCanvasElement with dimensions", () => {
    const canvasEl = document.createElement("canvas");
    const canvas = new Canvas(canvasEl, 1000, 700);

    expect(canvas.canvasElement).toStrictEqual(canvasEl);
    expect(canvas.canvasElement.width).toStrictEqual(1000);
    expect(canvas.canvasElement.height).toStrictEqual(700);

    expect(canvas.width).toStrictEqual(canvas.canvasElement.width);
    expect(canvas.height).toStrictEqual(canvas.canvasElement.height);
    expect(canvas.context).toStrictEqual(canvas.canvasElement.getContext("2d"));
  });

  test("if Canvas is created by passing the HTMLDivElement without dimensions", () => {
    const divEl = document.createElement("div");
    const canvas = new Canvas(divEl);

    expect(canvas.canvasElement.width).toStrictEqual(divEl.clientWidth);
    expect(canvas.canvasElement.height).toStrictEqual(divEl.clientHeight);

    expect(canvas.width).toStrictEqual(canvas.canvasElement.width);
    expect(canvas.height).toStrictEqual(canvas.canvasElement.height);
    expect(canvas.context).toStrictEqual(canvas.canvasElement.getContext("2d"));
  });

  test("if Canvas is created by passing the HTMLDivElement with dimensions", () => {
    const divEl = document.createElement("div");
    const canvas = new Canvas(divEl, 1000, 700);

    expect(canvas.canvasElement.width).toStrictEqual(1000);
    expect(canvas.canvasElement.height).toStrictEqual(700);

    expect(canvas.width).toStrictEqual(canvas.canvasElement.width);
    expect(canvas.height).toStrictEqual(canvas.canvasElement.height);
    expect(canvas.context).toStrictEqual(canvas.canvasElement.getContext("2d"));
  });
});

describe("The Canvas methods", () => {
  const canvas = new Canvas();

  test("if draw method renders the Drawing", () => {
    const stopSpy = jest.spyOn(canvas, "stop");
    const windowSpy = jest.spyOn(window, "requestAnimationFrame");

    const drawing = new Drawing(canvas);
    canvas.draw(drawing);

    expect(stopSpy).toHaveBeenCalled();
    expect(drawing.render).toHaveBeenCalled();
    expect(windowSpy).toHaveBeenCalled();
  });

  test("if stop method cancels rendering the Drawing", () => {
    const windowSpy = jest.spyOn(window, "cancelAnimationFrame");

    const drawing = new Drawing(canvas);
    canvas.draw(drawing);
    canvas.stop();

    expect(windowSpy).toHaveBeenCalledWith(canvas["frameId"]);
  });
});

describe("With OffscreenCanvas", () => {
  test("if OffscreenCanvas is created if supported", () => {
    (global as any)["OffscreenCanvas"] = function (
      width: number,
      height: number
    ) {
      this.width = width;
      this.height = height;
      this.getContext = jest.fn();
    };
    const canvas = new Canvas();

    expect(canvas.offCanvasElement instanceof OffscreenCanvas).toStrictEqual(
      true
    );
    expect(canvas.offCanvasElement.getContext).toHaveBeenCalledWith("2d", {
      willReadFrequently: true,
    });
  });
});
