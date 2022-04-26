import { Vector2 } from "../math/vector";
import { Node } from "../core/node";

export class Empty extends Node {
  constructor(id: string, position: Vector2) {
    super(id, position, []);
  }

  _render(): void {
    /**/
  }
  _offRender(): void {
    /**/
  }

  getDimension(): Vector2 {
    return Vector2.Zero();
  }
}
