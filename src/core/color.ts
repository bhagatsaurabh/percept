export class Color {
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

  /* istanbul ignore next */
  private static _componentToHex(c: number) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}
