import { Constant } from "../Math/math";
import { Vector2 } from "../Math/math";
import { Handle } from "../enums";
import { Node } from '../node';

export * from './ellipse';
export * from './empty';
export * from './image';
export * from './line';
export * from './polygon';
export * from './rectangle';
export * from './text';

export class LinearGradient {

  node: Node;

  constructor(public offset: Vector2, public degrees: number, public length: number | Handle, public colors: string[], public weights: number[]) { }

  create(context: CanvasRenderingContext2D): CanvasGradient {
    let gradient: CanvasGradient, from, to, length, delta = new Vector2(0, 0);

    length = (this.length == Handle.AUTO) ? this.node.getDimension().max() : this.length;
    delta.x = (length / 2) * Math.cos(this.degrees * Constant.TAU);
    delta.y = (length / 2) * Math.sin(this.degrees * Constant.TAU);

    from = this.offset.subtract(delta).transform(this.node.transform.worldTransform);
    to = this.offset.add(delta).transform(this.node.transform.worldTransform);

    //Debug.debugLine(this.node.drawing, from, to, {color: 'yellow', width: 2});

    gradient = context.createLinearGradient(from.x, from.y, to.x, to.y);
    this.colors.forEach((color, index) => {
      gradient.addColorStop(this.weights[index], color);
    });
    return gradient;
  }
}

export class RadialGradient {

  node: Node;

  constructor(public fromOffset: Vector2, public fromRadius: number | Handle, public toOffset: Vector2, public toRadius: number | Handle, public colors: string[], public weights: number[]) { }

  create(context: CanvasRenderingContext2D): CanvasGradient {
    let gradient: CanvasGradient;
    let fromCenter = this.fromOffset.transform(this.node.transform.worldTransform);
    let toCenter = this.toOffset.transform(this.node.transform.worldTransform);
    let fromRadius, toRadius;
    if (this.fromRadius == Handle.AUTO || this.toRadius == Handle.AUTO) {
      fromRadius = 1;
      toRadius = this.node.getDimension().max() / 2;
    } else {
      fromRadius = this.fromRadius;
      toRadius = this.toRadius;
    }

    //Debug.debugPoint(this.node.drawing, fromCenter, {color: 'green', radius: 2});
    //Debug.debugPoint(this.node.drawing, toCenter, {color: 'red', radius: 2});

    gradient = context.createRadialGradient(fromCenter.x, fromCenter.y, fromRadius, toCenter.x, toCenter.y, toRadius);
    this.colors.forEach((color, index) => {
      gradient.addColorStop(this.weights[index], color);
    });
    return gradient;
  }
}
