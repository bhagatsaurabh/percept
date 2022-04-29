import { Matrix } from "../../src/math/matrix";

describe("The Matrix constructor", () => {
  test("if the value is set", () => {
    const matrix = new Matrix([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);

    expect(matrix.value).toStrictEqual([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);
  });
});

describe("The Matrix static methods", () => {
  test("if the static method Identity creates and returns a new Identity Matrix object", () => {
    expect(Matrix.Identity().value).toStrictEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  test("if the static method Zero creates and returns a new Zero Matrix object", () => {
    expect(Matrix.Zero().value).toStrictEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  test("if the static method Multiply multiples two 3x3 arrays and returns a new 3x3 array", () => {
    const matrix1 = [
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ];
    const matrix2 = [
      [6, 7, 1],
      [0, 1, 6],
      [1, 4, 7],
    ];

    const result = Matrix.Multiply(matrix1, matrix2);

    expect(result).not.toStrictEqual(matrix1);
    expect(result).not.toStrictEqual(matrix2);
    expect(result).toStrictEqual([
      [9, 26, 64],
      [16, 37, 72],
      [50, 70, 58],
    ]);
  });
});

describe("The Matrix methods", () => {
  test("if the multiply method multiplies this matrix to 3x3 array and returns a new Matrix object", () => {
    const matrix = new Matrix([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);

    const result = matrix.multiply([
      [6, 7, 1],
      [0, 1, 6],
      [1, 4, 7],
    ]);

    expect(result).not.toStrictEqual(matrix);
    expect(result.value).toStrictEqual([
      [9, 26, 64],
      [16, 37, 72],
      [50, 70, 58],
    ]);
  });

  test("if the multiply method multiplies this matrix to another Matrix and returns a new Matrix object", () => {
    const matrix1 = new Matrix([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);

    const matrix2 = new Matrix([
      [6, 7, 1],
      [0, 1, 6],
      [1, 4, 7],
    ]);

    const result = matrix1.multiply(matrix2);

    expect(result).not.toStrictEqual(matrix1);
    expect(result).not.toStrictEqual(matrix2);
    expect(result.value).toStrictEqual([
      [9, 26, 64],
      [16, 37, 72],
      [50, 70, 58],
    ]);
  });

  test("if the multiplyInPlace method multiplies this matrix to 3x3 array in-place", () => {
    const matrix = new Matrix([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);

    const result = matrix.multiplyInPlace([
      [6, 7, 1],
      [0, 1, 6],
      [1, 4, 7],
    ]);

    expect(result).toStrictEqual(matrix);
    expect(result.value).toStrictEqual([
      [9, 26, 64],
      [16, 37, 72],
      [50, 70, 58],
    ]);
  });

  test("if the multiplyInPlace method multiplies this matrix to another Matrix in-place", () => {
    const matrix1 = new Matrix([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);

    const matrix2 = new Matrix([
      [6, 7, 1],
      [0, 1, 6],
      [1, 4, 7],
    ]);

    const result = matrix1.multiplyInPlace(matrix2);

    expect(result).toStrictEqual(matrix1);
    expect(result.value).toStrictEqual([
      [9, 26, 64],
      [16, 37, 72],
      [50, 70, 58],
    ]);
  });

  test("if the clone method creates a new Matrix object with same values", () => {
    const matrix = new Matrix([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);

    const clone = matrix.clone();

    expect(matrix === clone).toStrictEqual(false);
    expect(clone.value).toStrictEqual([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);
  });

  test("if getRotation method returns the rotation of transform matrix", () => {
    const matrix = new Matrix([
      [1, 7, 3],
      [2, 7, 4],
      [8, 6, 2],
    ]);

    expect(matrix.getRotation()).toStrictEqual(
      Math.atan2(7, 1) * (180 / Math.PI)
    );
  });
});
