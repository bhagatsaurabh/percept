/**@hidden */

export class Dimension {
  constructor(public width: number, public height: number) { }

  max() {
    return Math.max(this.width, this.height);
  }
}
