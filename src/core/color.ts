/* export class Color {
  static Random(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    return color;
  }

  static rgbToHex(rgb: number[] | Uint8ClampedArray): string {
    return (
      "#" +
      Color._componentToHex(rgb[0]) +
      Color._componentToHex(rgb[1]) +
      Color._componentToHex(rgb[2])
    );
  }
  private static _componentToHex(c: number) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
} */

import { getRandom, normalize } from "../utils/utils";

export class Color {
  rgbaValue: Uint8ClampedArray | number[];
  hexValue: string;
  key: string;
  cssString: string;

  constructor(rgba: Uint8ClampedArray | number[]) {
    this.rgbaValue = rgba;
    this.hexValue = Color.rgbaToHex(this.rgbaValue);
    this.key = Color.rgbaToKey(this.rgbaValue);
    this.cssString = Color.rgbaToCSSString(this.rgbaValue);
  }

  isEqual(color: Color) {
    return (
      color.rgbaValue[0] === this.rgbaValue[0] &&
      color.rgbaValue[1] === this.rgbaValue[1] &&
      color.rgbaValue[2] === this.rgbaValue[2] &&
      color.rgbaValue[3] === this.rgbaValue[3]
    );
  }

  static Random(): Color {
    return new Color(
      new Uint8ClampedArray([
        Math.floor(getRandom(0, 255)),
        Math.floor(getRandom(0, 255)),
        Math.floor(getRandom(0, 255)),
        255,
      ])
    );
  }

  static hexToRGBA(hex: string): Uint8ClampedArray {
    return new Uint8ClampedArray([
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
      parseInt(hex.slice(7, 9), 16),
    ]);
  }

  /* istanbul ignore next */
  private static _componentToHex(c: number) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  static rgbaToHex(rgba: number[] | Uint8ClampedArray): string {
    return (
      "#" +
      Color._componentToHex(rgba[0]) +
      Color._componentToHex(rgba[1]) +
      Color._componentToHex(rgba[2]) +
      Color._componentToHex(rgba[3])
    );
  }

  static rgbaToKey(rgba: Uint8ClampedArray | number[]): string {
    return `${rgba[0]}:${rgba[1]}:${rgba[2]}:${rgba[3]}`;
  }

  static rgbaToCSSString(rgba: Uint8ClampedArray | number[]): string {
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${normalize(
      rgba[3],
      0,
      255
    ).toFixed(3)})`;
  }
}
