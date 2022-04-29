import { Constant, Handle } from "../common";
import { Node } from "../core/node";
import { Vector } from "../math/vector";

export class LinearGradient {
  node: Node;

  constructor(
    public offset: Vector,
    public degrees: number,
    public length: number | Handle,
    public colors: string[],
    public weights: number[]
  ) {}

  create(context: CanvasRenderingContext2D): CanvasGradient {
    let gradient: CanvasGradient,
      from,
      to,
      length,
      delta = new Vector(0, 0);

    length =
      this.length == Handle.AUTO ? this.node.getDimension().max() : this.length;
    delta.x = (length / 2) * Math.cos(this.degrees * Constant.TAU);
    delta.y = (length / 2) * Math.sin(this.degrees * Constant.TAU);

    from = this.offset
      .subtract(delta)
      .transform(this.node.transform.worldTransform);
    to = this.offset.add(delta).transform(this.node.transform.worldTransform);

    gradient = context.createLinearGradient(from.x, from.y, to.x, to.y);
    this.colors.forEach((color, index) => {
      gradient.addColorStop(this.weights[index], color);
    });
    return gradient;
  }
}
