import { Canvas } from "../core/canvas";
import { Constant } from "../common/constants";
import { Matrix } from "../math/matrix";

/**
 * Stores 2D Vector
 */
export class Vector {
  tmpX: number;
  tmpY: number;

  constructor(public x: number, public y: number) {}

  toString() {
    return "[" + this.x.toFixed(3) + ", " + this.y.toFixed(3) + "]";
  }

  add(x: number, y: number): Vector;
  add(value: number): Vector;
  add(vector: Vector): Vector;
  add(arg1: number | Vector, arg2?: number): Vector {
    // Params : (vector) or (x, y)
    if (arg1 instanceof Vector) {
      return new Vector(this.x + arg1.x, this.y + arg1.y);
    } else if (typeof arg2 === "undefined") {
      return new Vector(this.x + arg1, this.y + arg1);
    } else {
      return new Vector(this.x + arg1, this.y + arg2);
    }
  }

  addInPlace(x: number, y: number): Vector;
  addInPlace(value: number): Vector;
  addInPlace(vector: Vector): Vector;
  addInPlace(arg1: number | Vector, arg2?: number): Vector {
    // Params : (vector) or (x, y)
    if (arg1 instanceof Vector) {
      this.x += arg1.x;
      this.y += arg1.y;
    } else if (typeof arg2 === "undefined") {
      this.x += arg1;
      this.y += arg1;
    } else {
      this.x += arg1;
      this.y += arg2;
    }
    return this;
  }

  multiply(x: number, y: number): Vector;
  multiply(value: number): Vector;
  multiply(vector: Vector): Vector;
  multiply(arg1: number | Vector, arg2?: number): Vector {
    // Params : (vector) or (x, y)
    if (arg1 instanceof Vector) {
      return new Vector(this.x * arg1.x, this.y * arg1.y);
    } else if (typeof arg2 === "undefined") {
      return new Vector(this.x * arg1, this.y * arg1);
    } else {
      return new Vector(this.x * arg1, this.y * arg2);
    }
  }

  multiplyInPlace(x: number, y: number): Vector;
  multiplyInPlace(value: number): Vector;
  multiplyInPlace(vector: Vector): Vector;
  multiplyInPlace(arg1: number | Vector, arg2?: number): Vector {
    // Params : (vector) or (x, y)
    if (arg1 instanceof Vector) {
      this.x *= arg1.x;
      this.y *= arg1.y;
    } else if (typeof arg2 === "undefined") {
      this.x *= arg1;
      this.y *= arg1;
    } else {
      this.x *= arg1;
      this.y *= arg2;
    }
    return this;
  }

  subtract(x: number, y: number): Vector;
  subtract(value: number): Vector;
  subtract(vector: Vector): Vector;
  subtract(arg1: number | Vector, arg2?: number): Vector {
    // Params : (vector) or (x, y)
    if (arg1 instanceof Vector) {
      return new Vector(this.x - arg1.x, this.y - arg1.y);
    } else if (typeof arg2 === "undefined") {
      return new Vector(this.x - arg1, this.y - arg1);
    } else {
      return new Vector(this.x - arg1, this.y - arg2);
    }
  }

  subtractInPlace(x: number, y: number): Vector;
  subtractInPlace(value: number): Vector;
  subtractInPlace(vector: Vector): Vector;
  subtractInPlace(arg1: number | Vector, arg2?: number): Vector {
    // Params : (vector) or (x, y)
    if (arg1 instanceof Vector) {
      this.x -= arg1.x;
      this.y -= arg1.y;
    } else if (typeof arg2 === "undefined") {
      this.x -= arg1;
      this.y -= arg1;
    } else {
      this.x -= arg1;
      this.y -= arg2;
    }

    return this;
  }

  rotate(pivot: Vector, degrees: number): Vector {
    degrees = degrees * Constant.TAU;
    let cosT = Math.cos(degrees);
    let sinT = Math.sin(degrees);
    return new Vector(
      cosT * (this.x - pivot.x) - sinT * (this.y - pivot.y) + pivot.x,
      sinT * (this.x - pivot.x) + cosT * (this.y - pivot.y) + pivot.y
    );
  }

  rotateInPlace(pivot: Vector, degrees: number): Vector {
    degrees = degrees * Constant.TAU;
    let cosT = Math.cos(degrees);
    let sinT = Math.sin(degrees);
    this.tmpX = cosT * (this.x - pivot.x) - sinT * (this.y - pivot.y) + pivot.x;
    this.tmpY = sinT * (this.x - pivot.x) + cosT * (this.y - pivot.y) + pivot.y;
    this.x = this.tmpX;
    this.y = this.tmpY;
    return this;
  }

  transform(matrix: Matrix) {
    let result = Matrix.Multiply([[this.x, this.y, 1]], matrix.value);
    return new Vector(result[0][0], result[0][1]);
  }

  transformInPlace(matrix: Matrix): Vector {
    let result = Matrix.Multiply([[this.x, this.y, 1]], matrix.value);
    this.x = result[0][0];
    this.y = result[0][1];
    return this;
  }

  max() {
    return Math.max(this.x, this.y);
  }

  static Midpoint(vector1: Vector, vector2: Vector): Vector {
    return new Vector((vector1.x + vector2.x) / 2, (vector1.y + vector2.y) / 2);
  }

  static Distance(vector1: Vector, vector2: Vector): number {
    return Math.sqrt(
      Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2)
    );
  }

  static Zero(): Vector {
    return new Vector(0, 0);
  }

  static Unit(): Vector {
    return new Vector(1, 1);
  }

  static Bounds(vectors: Vector[]): Vector[] {
    let minVec = new Vector(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    let maxVec = new Vector(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

    vectors.forEach((vector) => {
      if (vector.x < minVec.x) minVec.x = vector.x;
      if (vector.y < minVec.y) minVec.y = vector.y;
      if (vector.x > maxVec.x) maxVec.x = vector.x;
      if (vector.y > maxVec.y) maxVec.y = vector.y;
    });
    return [minVec, maxVec];
  }

  static Average(vectors: Vector[]): Vector {
    let sumX = 0;
    let sumY = 0;
    vectors.forEach((vector) => {
      sumX += vector.x;
      sumY += vector.y;
    });
    return new Vector(sumX / vectors.length, sumY / vectors.length);
  }

  static Random(canvas: Canvas): Vector;
  static Random(minX: number, maxX: number, minY: number, maxY: number): Vector;
  static Random(
    minXOrCanvas: number | Canvas,
    maxX?: number,
    minY?: number,
    maxY?: number
  ): Vector {
    if (minXOrCanvas instanceof Canvas) {
      return new Vector(
        Math.random() * minXOrCanvas.width,
        Math.random() * minXOrCanvas.height
      );
    } else {
      return new Vector(
        Math.random() * (maxX - minXOrCanvas) + minXOrCanvas,
        Math.random() * (maxY - minY) + minY
      );
    }
  }

  static Lerp(start: Vector, end: Vector, amount: number): Vector {
    return new Vector(
      start.x + (end.x - start.x) * amount,
      start.y + (end.y - start.y) * amount
    );
  }

  clone(): Vector {
    return new Vector(this.x, this.y);
  }
}
