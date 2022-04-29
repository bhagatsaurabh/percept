import { Color } from "../../src/core/color";

jest.clearAllMocks();

describe("The Color static methods", () => {
  test("if static method Random generates a valid color hex", () => {
    expect(/^#[0-9A-F]{6}$/i.test(Color.Random())).toStrictEqual(true);
  });

  test("if static method rgbToHex converts provided rgb value to color hex", () => {
    expect(Color.rgbToHex([65, 252, 3])).toStrictEqual("#41fc03");
  });
});
