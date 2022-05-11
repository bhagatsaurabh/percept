import { Color } from "../../src/core/color";
import * as utils from "../../src/utils/utils";

jest.clearAllMocks();

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The Color methods", () => {
  test("if a new Color object is created with all formats", () => {
    const hexSpy = jest.spyOn<any, any>(Color, "rgbaToHex");
    const keySpy = jest.spyOn<any, any>(Color, "rgbaToKey");
    const cssSpy = jest.spyOn<any, any>(Color, "rgbaToCSSString");

    const newColor = new Color([10, 20, 30, 40]);

    expect(hexSpy).toHaveBeenCalledWith([10, 20, 30, 40]);
    expect(keySpy).toHaveBeenCalledWith([10, 20, 30, 40]);
    expect(cssSpy).toHaveBeenCalledWith([10, 20, 30, 40]);
    expect(/^#[0-9a-f]{8}$/i.test(newColor.hexValue)).toStrictEqual(true);
  });

  test("if isEqual method correctly compares two colors", () => {
    const color1 = new Color([10, 20, 30, 40]);
    let color2 = new Color([10, 20, 30, 50]);

    expect(color1.isEqual(color2)).toStrictEqual(false);

    color2 = new Color([10, 20, 30, 40]);

    expect(color1.isEqual(color2)).toStrictEqual(true);
  });
});

describe("The Color static methods", () => {
  test("if static method Random generates an rgba color", () => {
    const getRandomSpy = jest.spyOn(utils, "getRandom").mockReturnValue(50);
    const randomColor = Color.Random();

    expect(randomColor).toBeInstanceOf(Color);
    expect(getRandomSpy).toHaveBeenCalledTimes(3);
    expect(Array.from(randomColor.rgbaValue)).toEqual([50, 50, 50, 255]);
  });

  test("if static method hexToRGBA converts provided hex value to rgba", () => {
    const hex = "#abcdef09";
    const sliceSpy = jest.spyOn(String.prototype, "slice");
    const rgba = Color.hexToRGBA(hex);

    expect(sliceSpy.mock.calls).toEqual([
      [1, 3],
      [3, 5],
      [5, 7],
      [7, 9],
    ]);
    expect(rgba).toBeInstanceOf(Uint8ClampedArray);
    expect(Array.from(rgba)).toStrictEqual([171, 205, 239, 9]);
  });

  test("if static method rgbaToHex converts provided rgba value to hex", () => {
    const rgba = [10, 20, 30, 40];
    const _componentToHexSpy = jest.spyOn<any, any>(Color, "_componentToHex");
    const hex = Color.rgbaToHex(rgba);

    expect(_componentToHexSpy.mock.calls).toEqual([
      [10],
      [20],
      [30],
      [40],
    ]);
    expect(typeof hex).toStrictEqual("string");
    expect(/^#[0-9A-F]{8}$/i.test(hex)).toStrictEqual(true);
    expect(hex).toStrictEqual("#0a141e28");
  });

  test("if static method rgbaToKey converts provided rgba value to key string", () => {
    const rgba = [10, 20, 30, 40];
    const key = Color.rgbaToKey(rgba);

    expect(typeof key).toStrictEqual("string");
    expect(/^\d+:\d+:\d+:\d+$/i.test(key)).toStrictEqual(true);
    expect(key).toStrictEqual("10:20:30:40");
  });

  test("if static method rgbaToCSSString converts provided rgba value to rgba css string", () => {
    const rgba = [10, 20, 30, 40];
    const normalizeSpy = jest.spyOn(utils, "normalize").mockReturnValue(0.5);
    const cssString = Color.rgbaToCSSString(rgba);

    expect(typeof cssString).toStrictEqual("string");
    expect(normalizeSpy).toHaveBeenCalledWith(40, 0, 255);
    expect(cssString).toStrictEqual("rgba(10, 20, 30, 0.500)");
  });
});
