import { getRandom, normalize } from "../../src/utils/utils";

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The Util methods", () => {
  test("if getRandom util returns a random number in range correctly", () => {
    const randomSpy = jest.spyOn(global.Math, "random");
    const random = getRandom(23, 476);

    expect(randomSpy).toHaveBeenCalled();
    expect(random).toBeGreaterThanOrEqual(23);
    expect(random).toBeLessThanOrEqual(476);
  });

  test("if normalize util correctly normalizes given value within range", () => {
    const normalized = normalize(45, -74, 84);

    expect(normalized).toBeGreaterThanOrEqual(0);
    expect(normalized).toBeLessThanOrEqual(1);
  });

  test("if normalize util correctly normalizes given value with no range", () => {
    const normalized = normalize(45, 24, 24);

    expect(normalized).toStrictEqual(1);
  });
});
