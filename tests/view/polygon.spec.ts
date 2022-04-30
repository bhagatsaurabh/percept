import { Handle } from "../../src/common";
import { Vector } from "../../src/math";
import { LinearGradient, Polygon } from "../../src/view";

describe("The Polygon View constructor", () => {
  test("if the Polygon View is created without auto center", () => {
    const gradient = new LinearGradient(
      Vector.Zero(),
      0,
      Handle.AUTO,
      ["red", "green"],
      [0, 1]
    );
    const polygon = new Polygon(
      "Node",
      [
        new Vector(100, 0),
        new Vector(200, 100),
        new Vector(150, 200),
        new Vector(50, 200),
        new Vector(0, 100),
      ],
      new Vector(150, 150),
      { outlineColor: gradient, fillColor: gradient }
    );

    expect(polygon.id).toStrictEqual("Node");
    expect((polygon.props.outlineColor as LinearGradient).node).toStrictEqual(
      polygon
    );
    expect((polygon.props.fillColor as LinearGradient).node).toStrictEqual(
      polygon
    );
  });

  test("if the Polygon View is created with auto center", () => {
    const gradient = new LinearGradient(
      Vector.Zero(),
      0,
      Handle.AUTO,
      ["red", "green"],
      [0, 1]
    );
    const polygon = new Polygon(
      "Node",
      [
        new Vector(100, 0),
        new Vector(200, 100),
        new Vector(150, 200),
        new Vector(50, 200),
        new Vector(0, 100),
      ],
      Handle.AUTO,
      { outlineColor: gradient, fillColor: gradient }
    );

    expect(polygon.id).toStrictEqual("Node");
    expect(polygon.position.toString()).toStrictEqual("[100.000, 120.000]");
    expect((polygon.props.outlineColor as LinearGradient).node).toStrictEqual(
      polygon
    );
    expect((polygon.props.fillColor as LinearGradient).node).toStrictEqual(
      polygon
    );
  });
});

describe("The Polygon View methods", () => {
  test("if the getDimension method returns correct view dimension", () => {
    const polygon = new Polygon(
      "Node",
      [
        new Vector(100, 0),
        new Vector(200, 100),
        new Vector(150, 200),
        new Vector(50, 200),
        new Vector(0, 100),
      ],
      Handle.AUTO
    );

    expect(polygon.getDimension().toString()).toStrictEqual(
      "[200.000, 200.000]"
    );
  });
});
