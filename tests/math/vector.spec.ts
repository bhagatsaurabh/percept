import { Canvas } from "../../src/core";
import { Matrix } from "../../src/math";
import { Vector } from "../../src/math/vector";

describe("The Vector methods", () => {
  test("if toString method returns string representation of vector", () => {
    expect(new Vector(33.564363, 86.435435).toString()).toStrictEqual(
      "[33.564, 86.435]"
    );
  });

  test("if add method adds this and provided (x, y) values and creates a new Vector result", () => {
    const vector1 = new Vector(4, 72);
    const result = vector1.add(5, 3);
    expect(vector1 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[9.000, 75.000]");
  });

  test("if add method adds this and provided Vector and creates a new Vector result", () => {
    const vector1 = new Vector(4, 72);
    const vector2 = new Vector(5, 3);
    const result = vector1.add(vector2);
    expect(vector1 === result).toStrictEqual(false);
    expect(vector2 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[9.000, 75.000]");
  });

  test("if add method adds this and provided scalar value and creates a new Vector result", () => {
    const vector1 = new Vector(4, 72);
    const result = vector1.add(8);
    expect(vector1 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[12.000, 80.000]");
  });

  test("if addInPlace method adds this and provided (x, y) values in-place", () => {
    const vector1 = new Vector(4, 72);
    const result = vector1.addInPlace(5, 3);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[9.000, 75.000]");
  });

  test("if addInPlace method adds this and provided Vector in-place", () => {
    const vector1 = new Vector(4, 72);
    const vector2 = new Vector(5, 3);
    const result = vector1.addInPlace(vector2);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[9.000, 75.000]");
  });

  test("if addInPlace method adds this and provided scalar value in-place", () => {
    const vector1 = new Vector(4, 72);
    const result = vector1.addInPlace(8);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[12.000, 80.000]");
  });

  test("if multiply method multiplies this and provided (x, y) values and creates a new Vector result", () => {
    const vector1 = new Vector(5, 3);
    const result = vector1.multiply(4, 8);
    expect(vector1 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[20.000, 24.000]");
  });

  test("if multiply method multiplies this and provided Vector and creates a new Vector result", () => {
    const vector1 = new Vector(5, 3);
    const vector2 = new Vector(4, 8);
    const result = vector1.multiply(vector2);
    expect(vector1 === result).toStrictEqual(false);
    expect(vector2 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[20.000, 24.000]");
  });

  test("if multiply method multiplies this and provided scalar value and creates a new Vector result", () => {
    const vector1 = new Vector(5, 3);
    const result = vector1.multiply(8);
    expect(vector1 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[40.000, 24.000]");
  });

  test("if multiplyInPlace method multiplies this and provided (x, y) values in-place", () => {
    const vector1 = new Vector(5, 3);
    const result = vector1.multiplyInPlace(4, 8);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[20.000, 24.000]");
  });

  test("if multiplyInPlace method multiplies this and provided Vector in-place", () => {
    const vector1 = new Vector(5, 3);
    const vector2 = new Vector(4, 8);
    const result = vector1.multiplyInPlace(vector2);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[20.000, 24.000]");
  });

  test("if multiplyInPlace method multiplies this and provided scalar value in-place", () => {
    const vector1 = new Vector(5, 3);
    const result = vector1.multiplyInPlace(8);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[40.000, 24.000]");
  });

  test("if subtract method subtracts this and provided (x, y) values and creates a new Vector result", () => {
    const vector1 = new Vector(5, 3);
    const result = vector1.subtract(4, 8);
    expect(vector1 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[1.000, -5.000]");
  });

  test("if subtract method subtracts this and provided Vector and creates a new Vector result", () => {
    const vector1 = new Vector(5, 3);
    const vector2 = new Vector(4, 8);
    const result = vector1.subtract(vector2);
    expect(vector1 === result).toStrictEqual(false);
    expect(vector2 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[1.000, -5.000]");
  });

  test("if subtract method subtracts this and provided scalar value and creates a new Vector result", () => {
    const vector1 = new Vector(5, 3);
    const result = vector1.subtract(8);
    expect(vector1 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[-3.000, -5.000]");
  });

  test("if subtractInPlace method subtracts this and provided (x, y) values in-place", () => {
    const vector1 = new Vector(5, 3);
    const result = vector1.subtractInPlace(4, 8);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[1.000, -5.000]");
  });

  test("if subtractInPlace method subtracts this and provided Vector in-place", () => {
    const vector1 = new Vector(5, 3);
    const vector2 = new Vector(4, 8);
    const result = vector1.subtractInPlace(vector2);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[1.000, -5.000]");
  });

  test("if subtractInPlace method subtracts this and provided scalar value in-place", () => {
    const vector1 = new Vector(5, 3);
    const result = vector1.subtractInPlace(8);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[-3.000, -5.000]");
  });

  test("if rotate method rotates this Vector by provided pivot and degrees", () => {
    const vector1 = new Vector(5, 3);
    const pivot = new Vector(0, 1);
    const result = vector1.rotate(pivot, -45);
    expect(vector1 === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[4.950, -1.121]");
  });

  test("if rotateInPlace method rotates this Vector by provided pivot and degrees in-place", () => {
    const vector1 = new Vector(5, 3);
    const pivot = new Vector(0, 1);
    const result = vector1.rotateInPlace(pivot, -45);
    expect(vector1 === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[4.950, -1.121]");
  });

  test("if transform method transforms this Vector by provided transformation matrix", () => {
    const vector = new Vector(5, 3);
    const transformationMatrix = new Matrix([
      [1, 5, 3],
      [7, 2, 1],
      [1, 3, 3],
    ]);
    const result = vector.transform(transformationMatrix);
    expect(vector === result).toStrictEqual(false);
    expect(result.toString()).toStrictEqual("[27.000, 34.000]");
  });

  test("if transformInPlace method transforms this Vector by provided transformation matrix in-place", () => {
    const vector = new Vector(5, 3);
    const transformationMatrix = new Matrix([
      [1, 5, 3],
      [7, 2, 1],
      [1, 3, 3],
    ]);
    const result = vector.transformInPlace(transformationMatrix);
    expect(vector === result).toStrictEqual(true);
    expect(result.toString()).toStrictEqual("[27.000, 34.000]");
  });

  test("if max method returns max of x and y values", () => {
    const vector = new Vector(234.62, 234.63);

    expect(vector.max()).toStrictEqual(234.63);
  });

  test("if clone method clones this Vector into new Vector object", () => {
    const vector = new Vector(234.62, 234.63);
    const clone = vector.clone();

    expect(vector === clone).toStrictEqual(false);
    expect(clone.toString()).toStrictEqual(vector.toString());
  });
});

describe("The Vector static methods", () => {
  test("if static method Midpoint returns midpoint co-ord of two vectors", () => {
    const vector1 = new Vector(34, 73);
    const vector2 = new Vector(224, 83);

    expect(Vector.Midpoint(vector1, vector2).toString()).toStrictEqual(
      "[129.000, 78.000]"
    );
  });

  test("if static method Distance returns the distance between two vectors", () => {
    const vector1 = new Vector(34, 73);
    const vector2 = new Vector(224, 83);

    expect(Vector.Distance(vector1, vector2).toFixed(3)).toStrictEqual(
      "190.263"
    );
  });

  test("if static method Zero returns a new zero vector", () => {
    const zero = Vector.Zero();

    expect(zero.x).toStrictEqual(0);
    expect(zero.y).toStrictEqual(0);
  });

  test("if static method Unit returns a new unit vector", () => {
    const unit = Vector.Unit();

    expect(unit.x).toStrictEqual(1);
    expect(unit.y).toStrictEqual(1);
  });

  test("if static method Bounds returns a mininum spanning rectangle for given set of vectors", () => {
    const vectors = [
      new Vector(45, 73),
      new Vector(658, 34),
      new Vector(64, 34),
      new Vector(2, 89),
      new Vector(345, 9),
    ];

    const [topLeft, bottomRight] = Vector.Bounds(vectors);

    expect(topLeft.x).toStrictEqual(2);
    expect(topLeft.y).toStrictEqual(9);
    expect(bottomRight.x).toStrictEqual(658);
    expect(bottomRight.y).toStrictEqual(89);
  });

  test("if static method Average returns a new Vector having values average of all xs and all ys", () => {
    const vectors = [
      new Vector(45, 73),
      new Vector(658, 34),
      new Vector(64, 34),
      new Vector(2, 89),
      new Vector(345, 9),
    ];

    const average = Vector.Average(vectors);

    expect(average.x).toStrictEqual(222.8);
    expect(average.y).toStrictEqual(47.8);
  });

  test("if static method Random returns a new random Vector provided a canvas", () => {
    const canvasEl = document.createElement("canvas");
    canvasEl.width = 240;
    canvasEl.height = 200;

    const canvas = new Canvas(canvasEl);

    jest.spyOn(Math, "random").mockImplementation(() => 0.5);

    expect(Vector.Random(canvas).toString()).toStrictEqual(
      "[120.000, 100.000]"
    );
  });

  test("if static method Random returns a new random Vector provided min/max values", () => {
    jest.spyOn(Math, "random").mockImplementation(() => 0.5);

    expect(Vector.Random(0, 240, 0, 200).toString()).toStrictEqual(
      "[120.000, 100.000]"
    );
  });

  test("if static method Lerp performs linear interpolation between start and end vectors", () => {
    const start = new Vector(4, 64);
    const end = new Vector(-65, 23);

    const interpolated: Vector[] = [];
    for (let t = 0; t <= 1; t += 0.1) {
      interpolated.push(Vector.Lerp(start, end, t));
    }

    expect(interpolated.map((vector) => vector.toString())).toStrictEqual([
      "[4.000, 64.000]",
      "[-2.900, 59.900]",
      "[-9.800, 55.800]",
      "[-16.700, 51.700]",
      "[-23.600, 47.600]",
      "[-30.500, 43.500]",
      "[-37.400, 39.400]",
      "[-44.300, 35.300]",
      "[-51.200, 31.200]",
      "[-58.100, 27.100]",
      "[-65.000, 23.000]",
    ]);
  });
});
