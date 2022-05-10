import * as Percept from "../src/percept";

describe("Percept module", () => {
  test("if Percept exports all modules", () => {
    expect(typeof Percept).toBe("object");
  });

  test("if Percept exports are not undefined", () => {
    Object.keys(Percept).forEach((exportKey) =>
      expect(Boolean((Percept as any)[exportKey])).toBe(true)
    );
  });
});
