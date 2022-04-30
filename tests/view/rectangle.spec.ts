import { Handle } from "../../src/common";
import { Vector } from "../../src/math";
import { LinearGradient, Rectangle } from "../../src/view";

describe("The Rectangle View constructor", () => {
  test("if the Rectangle View is created", () => {
    const gradient = new LinearGradient(
      Vector.Zero(),
      0,
      Handle.AUTO,
      ["red", "green"],
      [0, 1]
    );
    const rectangle = new Rectangle("Node", Vector.Zero(), 456, 395, {
      outlineColor: gradient,
      fillColor: gradient,
    });

    expect(rectangle.id).toStrictEqual("Node");
    expect((rectangle.props.outlineColor as LinearGradient).node).toStrictEqual(
      rectangle
    );
    expect((rectangle.props.fillColor as LinearGradient).node).toStrictEqual(
      rectangle
    );
  });
});

describe("The Rectangle View methods", () => {
  test("if the getDimension method returns correct view dimension", () => {
    const rectangle = new Rectangle("Node", Vector.Zero(), 234, 34);

    expect(rectangle.getDimension().toString()).toStrictEqual(
      "[234.000, 34.000]"
    );
  });
});
