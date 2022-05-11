import * as Common from "../../src/common/index";

describe("Common module", () => {
  test("if Common exports all modules", () => {
    expect(typeof Common).toBe("object");
  });

  test("if Common exports are not undefined", () => {
    Object.keys(Common).forEach((exportKey) =>
      expect(Boolean((Common as any)[exportKey])).toBe(true)
    );
  });
});
