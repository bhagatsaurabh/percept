import { Handle } from "../../src/common";
import { Canvas } from "../../src/core/canvas";
import { Matrix, Vector } from "../../src/math";
import { LinearGradient } from "../../src/view/linear-gradient";

let canvas: Canvas;
beforeEach(() => {
  canvas = new Canvas(document.createElement("canvas"));
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The LinearGradient methods", () => {
  test("if the create method creates and returns a new CanvasGradient correctly when length is AUTO", () => {
    const linearGradient = new LinearGradient(
      Vector.Zero(),
      45,
      Handle.AUTO,
      ["red", "green", "blue"],
      [0, 0.5, 1]
    );

    (linearGradient as any).node = {
      getDimension: jest.fn(() => new Vector(34, 56)),
      transform: {
        worldTransform: Matrix.Identity(),
      },
    };
    const createSpy = jest.spyOn(canvas.context, "createLinearGradient");
    const addColorStopSpy = jest.spyOn(
      CanvasGradient.prototype,
      "addColorStop"
    );

    const gradient = linearGradient.create(canvas.context);

    expect(gradient instanceof CanvasGradient).toStrictEqual(true);
    expect(createSpy).toHaveBeenCalledWith(
      -19.79898987322333,
      -19.798989873223327,
      19.79898987322333,
      19.798989873223327
    );
    expect(addColorStopSpy.mock.calls).toEqual([
      [0, "red"],
      [0.5, "green"],
      [1, "blue"],
    ]);
  });

  test("if the create method creates and returns a new CanvasGradient correctly when length is not AUTO", () => {
    const linearGradient = new LinearGradient(
      Vector.Zero(),
      45,
      20,
      ["red", "green", "blue"],
      [0, 0.5, 1]
    );

    (linearGradient as any).node = {
      transform: {
        worldTransform: Matrix.Identity(),
      },
    };
    const createSpy = jest.spyOn(canvas.context, "createLinearGradient");
    const addColorStopSpy = jest.spyOn(
      CanvasGradient.prototype,
      "addColorStop"
    );

    const gradient = linearGradient.create(canvas.context);

    expect(gradient instanceof CanvasGradient).toStrictEqual(true);
    expect(createSpy).toHaveBeenCalledWith(
      -7.0710678118654755,
      -7.071067811865475,
      7.0710678118654755,
      7.071067811865475
    );
    expect(addColorStopSpy.mock.calls).toEqual([
      [0, "red"],
      [0.5, "green"],
      [1, "blue"],
    ]);
  });
});
