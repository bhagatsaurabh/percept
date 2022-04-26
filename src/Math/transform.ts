import { Matrix, Vector2 } from ".";
import { Constant } from "../common/constants";
import { Node } from "../core/node";

// Stores a node's transform (position, rotation, scale)
export class Transform {
  // reference control points to apply transform to
  refControlPoints: Vector2[];
  // transformed control points
  controlPoints: Vector2[];
  localTrasform: Matrix;
  worldTransform: Matrix;
  _parent: Transform;
  childs: Transform[];

  get parent(): Transform {
    return this._parent;
  }
  set parent(newParent: Transform) {
    if (this._parent) {
      this._parent.childs.indexOf(this) &&
        this._parent.childs.splice(this._parent.childs.indexOf(this), 1);
    }
    newParent && newParent.childs.push(this);
    this._parent = newParent;

    if (this.parent) {
      this.parent.childs.sort((a, b) => {
        return a.node.order - b.node.order;
      });
    }
  }

  get position(): Vector2 {
    return this._position;
  }
  set position(newPosition: Vector2) {
    this._position = newPosition;
  }

  get absolutePosition(): Vector2 {
    return Vector2.Zero().transform(this.worldTransform);
  }

  get rotation(): number {
    return this._rotation;
  }
  set rotation(degrees: number) {
    this._rotation = degrees % 360;
  }

  get localRotation(): number {
    return this._localRotation;
  }
  set localRotation(newRotation: number) {
    this._localRotation = newRotation % 360;
  }

  get scale(): Vector2 {
    return this._scale;
  }
  set scale(newScale: Vector2) {
    this._scale = newScale;
  }

  constructor(
    public _position: Vector2,
    public _localRotation: number,
    public _rotation: number,
    public _scale: Vector2,
    controlPoints: Vector2[],
    public node: Node
  ) {
    this._parent = null;
    this.childs = [];
    this.localTrasform = Matrix.Identity();
    this.worldTransform = Matrix.Identity();
    this.refControlPoints = this.relativeControlPoints(controlPoints);
    this.controlPoints = [...controlPoints];
  }

  private relativeControlPoints(controlPoints: Vector2[]): Vector2[] {
    let result: Vector2[] = [];
    controlPoints.forEach((controlPoint) => {
      result.push(controlPoint.subtract(this.position));
    });
    return result;
  }

  // Updates this node's worldTransform using parent's worldTransform if any
  updateWorldTransform(parentWorldTransform?: Matrix) {
    // Set translation
    this.localTrasform.value = [
      [1, 0, 0],
      [0, 1, 0],
      [this.position.x, this.position.y, 1],
    ];

    let cos;
    let sin;
    // Transform rotation
    if (this.parent.node.id != "#Root") {
      cos = Math.cos(this.rotation * Constant.TAU);
      sin = Math.sin(this.rotation * Constant.TAU);

      this.localTrasform = new Matrix([
        [1, 0, 0],
        [0, 1, 0],
        [this.position.x, this.position.y, 1],
      ])
        .multiply([
          [cos, sin, 0],
          [-sin, cos, 0],
          [0, 0, 1],
        ])
        .multiply([
          [1, 0, 0],
          [0, 1, 0],
          [-this.position.x, -this.position.y, 1],
        ])
        .multiply(this.localTrasform);
    }

    // Transform localRotation
    cos = Math.cos(this.localRotation * Constant.TAU);
    sin = Math.sin(this.localRotation * Constant.TAU);
    this.localTrasform = new Matrix([
      [cos, sin, 0],
      [-sin, cos, 0],
      [0, 0, 1],
    ]).multiply(this.localTrasform);

    // Transform scale
    this.localTrasform = new Matrix([
      [this.scale.x, 0, 0],
      [0, this.scale.y, 0],
      [0, 0, 1],
    ]).multiply(this.localTrasform);

    if (parentWorldTransform) {
      this.worldTransform = this.localTrasform.multiply(parentWorldTransform);
    } else {
      this.worldTransform = this.localTrasform.clone();
    }

    this.childs.forEach((child) => {
      child.updateWorldTransform(this.worldTransform);
    });

    this.applyTransform();
  }

  // Transforms each control point using this node's worldTransform
  private applyTransform() {
    this.refControlPoints.forEach((controlPoint, index) => {
      this.controlPoints[index] = controlPoint.transform(this.worldTransform);
    });
  }
}
