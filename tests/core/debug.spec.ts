import { Drawing } from "../../src/core";
import { Canvas } from "../../src/core/canvas";
import { Debug } from "../../src/core/debug";
import { Vector2 } from "../../src/math/vector";

const canvas = new Canvas(document.createElement("canvas"));

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The Debug methods", () => {
  test("if static method debugPoint pushes a new debug call to the queue", () => {
    const drawing = new Drawing(canvas);
    const limitDebugCallsSpy = jest.spyOn<any, any>(Debug, "limitDebugCalls");

    const props = { color: "red" };
    Debug.debugPoint("test", drawing, new Vector2(50, 50), props, 10);

    expect(limitDebugCallsSpy).toHaveBeenCalledWith(drawing, "test", 10);
    expect(drawing.debugCalls.hasOwnProperty("test")).toStrictEqual(true);
    expect(drawing.debugCalls.test[0].debugFunction).toStrictEqual(
      Debug["_debugPoint"]
    );
    expect(drawing.debugCalls.test[0].arguments[0]).toStrictEqual(
      drawing.canvas.context
    );
    expect(drawing.debugCalls.test[0].arguments[1].x).toStrictEqual(50);
    expect(drawing.debugCalls.test[0].arguments[1].y).toStrictEqual(50);
    expect(drawing.debugCalls.test[0].arguments[2]).toStrictEqual(props);
  });

  test("if static method debugLine pushes a new debug call to the queue", () => {
    const drawing = new Drawing(canvas);
    const limitDebugCallsSpy = jest.spyOn<any, any>(Debug, "limitDebugCalls");

    const props = { color: "red" };
    Debug.debugLine(
      "test",
      drawing,
      new Vector2(50, 50),
      new Vector2(100, 100),
      props,
      10
    );

    expect(limitDebugCallsSpy).toHaveBeenCalledWith(drawing, "test", 10);
    expect(drawing.debugCalls.hasOwnProperty("test")).toStrictEqual(true);
    expect(drawing.debugCalls.test[0].debugFunction).toStrictEqual(
      Debug["_debugLine"]
    );
    expect(drawing.debugCalls.test[0].arguments[0]).toStrictEqual(
      drawing.canvas.context
    );

    const from = drawing.debugCalls.test[0].arguments[1];
    const to = drawing.debugCalls.test[0].arguments[2];
    expect(from.x).toStrictEqual(50);
    expect(from.y).toStrictEqual(50);
    expect(to.x).toStrictEqual(100);
    expect(to.y).toStrictEqual(100);
    expect(drawing.debugCalls.test[0].arguments[3]).toStrictEqual(props);
  });

  test("if static method show pushes a new debug call to the queue", () => {
    const debugCalls = {
      key1: [{ debugFunction: jest.fn(), arguments: [1, "test1", true] }],
      key2: [
        { debugFunction: jest.fn(), arguments: [2, "test2", false] },
        { debugFunction: jest.fn(), arguments: [3, "test3", true] },
      ],
      key3: [
        { debugFunction: jest.fn(), arguments: [4, "test4", false] },
        { debugFunction: jest.fn(), arguments: [5, "test5", null] },
      ],
    };

    Debug.show(debugCalls, canvas.context);

    expect(debugCalls.key1[0].debugFunction).toHaveBeenCalledWith(
      1,
      "test1",
      true
    );
    expect(debugCalls.key2[0].debugFunction).toHaveBeenCalledWith(
      2,
      "test2",
      false
    );
    expect(debugCalls.key2[1].debugFunction).toHaveBeenCalledWith(
      3,
      "test3",
      true
    );
    expect(debugCalls.key3[0].debugFunction).toHaveBeenCalledWith(
      4,
      "test4",
      false
    );
    expect(debugCalls.key3[1].debugFunction).toHaveBeenCalledWith(
      5,
      "test5",
      null
    );
  });
});
