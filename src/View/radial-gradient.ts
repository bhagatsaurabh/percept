import { Vector2 } from "../math";
import { Handle } from "../common";
import { Node } from "../core";

export class RadialGradient {
  node: Node;

  constructor(
    public fromOffset: Vector2,
    public fromRadius: number | Handle,
    public toOffset: Vector2,
    public toRadius: number | Handle,
    public colors: string[],
    public weights: number[]
  ) {}

  create(context: CanvasRenderingContext2D): CanvasGradient {
    let gradient: CanvasGradient;
    let fromCenter = this.fromOffset.transform(
      this.node.transform.worldTransform
    );
    let toCenter = this.toOffset.transform(this.node.transform.worldTransform);
    let fromRadius, toRadius;
    if (this.fromRadius == Handle.AUTO || this.toRadius == Handle.AUTO) {
      fromRadius = 1;
      toRadius = this.node.getDimension().max() / 2;
    } else {
      fromRadius = this.fromRadius;
      toRadius = this.toRadius;
    }

    gradient = context.createRadialGradient(
      fromCenter.x,
      fromCenter.y,
      fromRadius,
      toCenter.x,
      toCenter.y,
      toRadius
    );
    this.colors.forEach((color, index) => {
      gradient.addColorStop(this.weights[index], color);
    });
    return gradient;
  }
}
