import { Handle } from "../../src/common";
import { Canvas } from "../../src/core/canvas";
import { Matrix, Vector } from "../../src/math";
import { RadialGradient } from "../../src/view/radial-gradient";

let canvas: Canvas;
beforeEach(() => {
  canvas = new Canvas(document.createElement("canvas"));
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The RadialGradient methods", () => {
  test("if the create method returns a new CanvasGradient when fromRadius or toRadius is AUTO", () => {
    const radialGradient = new RadialGradient(
      Vector.Zero(),
      Handle.AUTO,
      Vector.Zero(),
      10,
      ["red", "green", "blue"],
      [0, 0.5, 1]
    );

    (radialGradient as any).node = {
      getDimension: jest.fn(() => new Vector(75, 23)),
      transform: {
        worldTransform: Matrix.Identity(),
      },
    };
    const createSpy = jest.spyOn(canvas.context, "createRadialGradient");
    const addColorStopSpy = jest.spyOn(
      CanvasGradient.prototype,
      "addColorStop"
    );

    const gradient = radialGradient.create(canvas.context);

    expect(gradient instanceof CanvasGradient).toStrictEqual(true);
    expect(createSpy).toHaveBeenCalledWith(0, 0, 1, 0, 0, 37.5);
    expect(addColorStopSpy.mock.calls).toEqual([
      [0, "red"],
      [0.5, "green"],
      [1, "blue"],
    ]);
  });

  test("if the create method returns a new CanvasGradient when fromRadius and toRadius are both not AUTO", () => {
    const radialGradient = new RadialGradient(
      Vector.Zero(),
      5,
      Vector.Zero(),
      10,
      ["red", "green", "blue"],
      [0, 0.5, 1]
    );

    (radialGradient as any).node = {
      getDimension: jest.fn(() => new Vector(75, 23)),
      transform: {
        worldTransform: Matrix.Identity(),
      },
    };
    const createSpy = jest.spyOn(canvas.context, "createRadialGradient");
    const addColorStopSpy = jest.spyOn(
      CanvasGradient.prototype,
      "addColorStop"
    );

    const gradient = radialGradient.create(canvas.context);

    expect(gradient instanceof CanvasGradient).toStrictEqual(true);
    expect(createSpy).toHaveBeenCalledWith(0, 0, 5, 0, 0, 10);
    expect(addColorStopSpy.mock.calls).toEqual([
      [0, "red"],
      [0.5, "green"],
      [1, "blue"],
    ]);
  });
});
