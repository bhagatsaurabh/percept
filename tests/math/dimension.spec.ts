import { Dimension } from "../../src/math/dimension";

describe("The Dimension methods", () => {
  test("if max method returns the max of width and height", () => {
    const dimension = new Dimension(135, 726);

    expect(dimension.max()).toStrictEqual(dimension.height);
  });
});
