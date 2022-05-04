import { Vector } from "../math/vector";
import { Node } from "../core/node";

export class Empty extends Node {
  constructor(id: string, position: Vector) {
    super(id, position, []);
  }

  _render(): void {
    /**/
  }
  _offRender(): void {
    /**/
  }

  getDimension(): Vector {
    return Vector.Zero();
  }
}
