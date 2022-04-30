import { Vector } from "../../src/math";
import { Empty, LinearGradient } from "../../src/view";
import { Line } from "../../src/view/line";

describe("The Line View constructor", () => {
  test("if the Line View is created with from/to vectors without pivot", () => {
    const from = new Vector(34, 46);
    const to = new Vector(97, -34);
    const line = new Line("Node", from, to);

    expect(line.id).toStrictEqual("Node");
    expect(line.position.toString()).toStrictEqual("[34.000, 46.000]");
    expect(line.transform.controlPoints).toStrictEqual([from, to]);
  });

  test("if the Line View is created with from/to vectors with pivot", () => {
    const from = new Vector(34, 46);
    const to = new Vector(97, -34);
    const line = new Line("Node", from, to, 0.6, {
      color: new LinearGradient(Vector.Zero(), 0, 10, ["red", "green"], [0, 1]),
    });

    expect(line.id).toStrictEqual("Node");
    expect(line.position.toString()).toStrictEqual("[71.800, -2.000]");
    expect(line.transform.controlPoints).toStrictEqual([from, to]);
  });

  test("if the Line View is created with from/to nodes", () => {
    const from = new Empty("from", new Vector(345, 7));
    const to = new Empty("from", new Vector(57, 234));
    const line = new Line("Node", from, to);

    expect(line.id).toStrictEqual("Node");
    expect(line.position.toString()).toStrictEqual("[0.000, 0.000]");
    expect(line.transform.controlPoints).toStrictEqual([]);
  });
});

describe("The Line View accessors", () => {
  test("if the get from accessor returns correct coords when from is a vector", () => {
    const from = new Vector(34, 46);
    const to = new Vector(97, -34);
    const line = new Line("Node", from, to);

    expect(line.from.toString()).toStrictEqual("[34.000, 46.000]");
  });

  test("if the get from accessor returns correct coords when from is a node", () => {
    const from = new Empty("from", new Vector(84, 25));
    const to = new Vector(97, -34);
    const line = new Line("Node", from, to);

    expect(line.from.toString()).toStrictEqual("[0.000, 0.000]");
  });

  test("if the get to accessor returns correct coords when from is a vector", () => {
    const from = new Vector(34, 46);
    const to = new Vector(97, -34);
    const line = new Line("Node", from, to);

    expect(line.to.toString()).toStrictEqual("[97.000, -34.000]");
  });

  test("if the get to accessor returns correct coords when from is a node", () => {
    const from = new Vector(97, -34);
    const to = new Empty("from", new Vector(84, 25));
    const line = new Line("Node", from, to);

    expect(line.to.toString()).toStrictEqual("[0.000, 0.000]");
  });
});

describe("The Line View methods", () => {
  test("if the getDimension method returns correct view dimension", () => {
    const from = new Vector(34, 46);
    const to = new Vector(97, -34);
    const line = new Line("Node", from, to);

    expect(line.getDimension().toString()).toStrictEqual("[101.828, 0.000]");
  });
});
