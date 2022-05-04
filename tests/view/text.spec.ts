import { Vector } from "../../src/math";
import { LinearGradient, Text } from "../../src/view";

describe("The Text View constructor", () => {
  test("if the Text view is created", () => {
    const gradient = new LinearGradient(
      Vector.Zero(),
      0,
      10,
      ["red", "green"],
      [0, 1]
    );

    const text = new Text("Node", Vector.Zero(), "sample text", {
      outlineColor: gradient,
      fillColor: gradient,
      font: "Arial 14px",
    });

    expect(text.id).toStrictEqual("Node");
    expect((text.props.outlineColor as LinearGradient).node).toStrictEqual(
      text
    );
    expect((text.props.fillColor as LinearGradient).node).toStrictEqual(text);
  });
});

describe("The Text View accessors", () => {
  test("if the get text accessor returns correct value", () => {
    const text = new Text("Node", Vector.Zero(), "sample text");
    text._text = "something";

    expect(text.text).toStrictEqual("something");
  });

  test("if the set text accessor sets the correct value", () => {
    const text = new Text("Node", Vector.Zero(), "sample text");
    text._text = "new sample text";

    expect(text.text).toStrictEqual("new sample text");
  });
});

describe("The Text View methods", () => {
  test("if the getDimension method returns correct view dimension", () => {
    const text = new Text("Node", Vector.Zero(), "sample text");

    expect(text.getDimension().toString()).toStrictEqual(
      new Vector(text._originalWidth, text._originalHeight).toString()
    );
  });
});
