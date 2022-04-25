export class Color {
  static Random(): string {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  static rgbToHex(rgb: number[] | Uint8ClampedArray): string {
    return (
      "#" +
      Color._componentToHex(rgb[0]) +
      Color._componentToHex(rgb[1]) +
      Color._componentToHex(rgb[2])
    );
  }

  static _componentToHex(c: number) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}
