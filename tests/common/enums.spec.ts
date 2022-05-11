import * as Enums from "../../src/common/enums";

describe("Percept module", () => {
  test("if Percept exports all modules", () => {
    expect(typeof Enums).toBe("object");
  });

  test("if Percept exports are not undefined", () => {
    Object.keys(Enums).forEach((exportKey) =>
      expect(Boolean((Enums as any)[exportKey])).toBe(true)
    );
  });
});
