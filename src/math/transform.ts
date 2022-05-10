import { Matrix, Vector } from "./index";
import { Constant } from "../common/constants";
import { Node } from "../core/node";

/**
 * A Node's world and local transform (position, rotation, scale)
 */
export class Transform {
  /** Original reference control points to apply transform to */
  refControlPoints: Vector[];
  /** Transformed control points */
  controlPoints: Vector[];
  localTrasform: Matrix;
  worldTransform: Matrix;
  childs: Transform[];
  private _parent: Transform;
  private _position: Vector;
  private _localRotation: number;
  private _rotation: number;
  private _scale: Vector;

  get parent(): Transform {
    return this._parent;
  }
  set parent(newParent: Transform) {
    if (this._parent) {
      const index = this._parent.childs.indexOf(this);
      if (index > -1) {
        this._parent.childs.splice(index, 1);
      }
    }
    newParent && newParent.childs.push(this);
    this._parent = newParent;

    if (this._parent) {
      this._parent.childs.sort((a, b) => {
        return a.node.order - b.node.order;
      });
    }
  }

  get position(): Vector {
    return this._position;
  }
  set position(newPosition: Vector) {
    this._position = newPosition;
  }

  get absolutePosition(): Vector {
    return Vector.Zero().transform(this.worldTransform);
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

  get scale(): Vector {
    return this._scale;
  }
  set scale(newScale: Vector) {
    this._scale = newScale;
  }

  constructor(
    position: Vector,
    localRotation: number,
    rotation: number,
    scale: Vector,
    controlPoints: Vector[],
    public node: Node
  ) {
    this._position = position;
    this._localRotation = localRotation;
    this._rotation = rotation;
    this._scale = scale;
    this._parent = null;
    this.childs = [];
    this.localTrasform = Matrix.Identity();
    this.worldTransform = Matrix.Identity();
    this.refControlPoints = this.relativeControlPoints(controlPoints);
    this.controlPoints = [...controlPoints];
  }

  /* istanbul ignore next */
  private relativeControlPoints(controlPoints: Vector[]): Vector[] {
    let result: Vector[] = [];
    controlPoints.forEach((controlPoint) => {
      result.push(controlPoint.subtract(this.position));
    });
    return result;
  }

  /** Transforms each control point using this Node's {@link Node.worldTransform worldTransform} */
  /* istanbul ignore next */
  private applyTransform() {
    this.refControlPoints.forEach((controlPoint, index) => {
      this.controlPoints[index] = controlPoint.transform(this.worldTransform);
    });
  }

  /* istanbul ignore next */
  private _updateWorldTransform(parentWorldTransform?: Matrix) {
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

  /**
   * Updates this Node's worldTransform using parent's worldTransform (if this node has any parent)
   * @param parentWorldTransform worldTransform of parent Node
   */
  updateWorldTransform(parentWorldTransform?: Matrix) {
    this._updateWorldTransform(parentWorldTransform);
  }
}
