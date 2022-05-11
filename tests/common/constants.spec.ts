import * as Constants from "../../src/common/constants";

describe("Percept module", () => {
  test("if Percept exports all modules", () => {
    expect(typeof Constants).toBe("object");
  });

  test("if Percept exports are not undefined", () => {
    Object.keys(Constants).forEach((exportKey) =>
      expect(Boolean((Constants as any)[exportKey])).toBe(true)
    );
  });
});
