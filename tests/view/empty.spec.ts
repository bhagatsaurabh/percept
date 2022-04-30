import { Vector } from "../../src/math";
import { Empty } from "../../src/view/empty";

describe("The Empty View constructor", () => {
  test("if a new Empty View is created using constructor provided the parameters", () => {
    const position = new Vector(34, 46);
    const view = new Empty("Node1", position);

    expect(view.id).toStrictEqual("Node1");
    expect(view.position).toStrictEqual(position);
    expect(view.transform.controlPoints).toStrictEqual([]);
  });
});

describe("The Empty View methods", () => {
  test("if the getDimension method returns the correct dimension", () => {
    const position = new Vector(34, 46);
    const view = new Empty("Node1", position);

    expect(view.getDimension().toString()).toStrictEqual(
      Vector.Zero().toString()
    );
  });
});
