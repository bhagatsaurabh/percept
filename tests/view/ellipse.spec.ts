import { Handle } from "../../src/common";
import { Vector } from "../../src/math";
import { LinearGradient, Ellipse } from "../../src/view";

describe("The Ellipse View constructor", () => {
  test("if the Ellipse View is created", () => {
    const gradient = new LinearGradient(
      Vector.Zero(),
      0,
      Handle.AUTO,
      ["red", "green"],
      [0, 1]
    );
    const ellipse = new Ellipse("Node", Vector.Zero(), 10, 15, {
      outlineColor: gradient,
      fillColor: gradient,
    });

    expect(ellipse.id).toStrictEqual("Node");
    expect((ellipse.props.outlineColor as LinearGradient).node).toStrictEqual(
      ellipse
    );
    expect((ellipse.props.fillColor as LinearGradient).node).toStrictEqual(
      ellipse
    );
  });
});

describe("The Ellipse View methods", () => {
  test("if the getDimension method returns correct view dimension", () => {
    const ellipse = new Ellipse("Node", Vector.Zero(), 10, 15);

    expect(ellipse.getDimension().toString()).toStrictEqual("[30.000, 20.000]");
  });
});
