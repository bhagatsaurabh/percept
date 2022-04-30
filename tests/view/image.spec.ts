import { Vector } from "../../src/math";
import { Image } from "../../src/view";

describe("The Image View constructor", () => {
  test("if the Image View is created with source string", () => {
    const image = new Image("Node", Vector.Zero(), "test/images/url", 100, 70);

    expect(image.id).toStrictEqual("Node");
    expect(image._source.src).toStrictEqual("http://localhost/test/images/url");
    expect(image._source.crossOrigin).toStrictEqual("Anonymous");
  });

  test("if the Image View is created with source image", () => {
    const imgObj = document.createElement("img");
    imgObj.src = "test/images/url";

    const image = new Image("Node", Vector.Zero(), imgObj, 100, 70);

    expect(image.id).toStrictEqual("Node");
    expect(image._source).toStrictEqual(imgObj);
    expect(image._source.crossOrigin).toStrictEqual("Anonymous");
  });
});

describe("The Ellipse View methods", () => {
  test("if the getDimension method returns correct view dimension", () => {
    const image = new Image("Node", Vector.Zero(), "test/images/url", 100, 70);

    expect(image.getDimension().toString()).toStrictEqual("[100.000, 70.000]");
  });
});
