import { Matrix, Vector } from "../../src/math";
import { Transform } from "../../src/math/transform";
import { Empty } from "../../src/view/empty";
import { Node } from "../../src/core/node";

let node: Node;
beforeEach(() => {
  node = new Empty("Node", Vector.Zero());
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The Transform constructor", () => {
  test("if the constructor creates a new Transform object given the parameters", () => {
    const relativeControlPointsSpy = jest.spyOn<any, any>(
      Transform.prototype,
      "relativeControlPoints"
    );

    const controlPoints = [new Vector(34, 64), new Vector(22, 73)];
    const transform = new Transform(
      Vector.Zero(),
      0,
      0,
      Vector.Unit(),
      controlPoints,
      node
    );

    expect(transform["_parent"]).toStrictEqual(null);
    expect(transform.childs).toStrictEqual([]);
    expect(transform.localTrasform).toStrictEqual(Matrix.Identity());
    expect(transform.worldTransform).toStrictEqual(Matrix.Identity());
    expect(relativeControlPointsSpy).toHaveBeenCalledWith(controlPoints);
    expect(transform.controlPoints === controlPoints).toStrictEqual(false);
  });
});

describe("The Transform accessors", () => {
  let transform: Transform;
  let controlPoints = [new Vector(5, 75), new Vector(56, 234)];

  beforeEach(() => {
    transform = new Transform(
      Vector.Zero(),
      0,
      0,
      Vector.Unit(),
      controlPoints,
      node
    );
  });

  test("if the get parent accessor returns this Transform's parent", () => {
    const parentTransform = new Transform(
      Vector.Zero(),
      0,
      0,
      Vector.Unit(),
      [],
      node
    );

    transform["_parent"] = parentTransform;

    expect(transform.parent).toStrictEqual(parentTransform);
  });

  test("if the set parent accessor sets the parent Transform when there is no parent", () => {
    const parentTransform = new Transform(
      Vector.Zero(),
      0,
      0,
      Vector.Unit(),
      [],
      node
    );

    transform.parent = parentTransform;

    expect(parentTransform.childs[0]).toStrictEqual(transform);
    expect(transform["_parent"]).toStrictEqual(parentTransform);
  });

  test("if the set parent accessor sets the parent Transform when there is already a parent", () => {
    const oldParentTransform = new Transform(
      Vector.Zero(),
      0,
      0,
      Vector.Unit(),
      [],
      node
    );

    const newParentTransform = new Transform(
      Vector.Zero(),
      0,
      0,
      Vector.Unit(),
      [],
      node
    );

    transform.parent = oldParentTransform;
    transform.parent = newParentTransform;

    expect(
      oldParentTransform.childs.find((trns) => trns === transform)
    ).toStrictEqual(undefined);
    expect(newParentTransform.childs[0]).toStrictEqual(transform);
    expect(transform["_parent"]).toStrictEqual(newParentTransform);
  });

  test("if the get position accessor returns the Transform's position", () => {
    const position = new Vector(45, 62);
    transform["_position"] = position;

    expect(transform.position).toStrictEqual(position);
  });

  test("if the set position accessor sets the Transform's position", () => {
    const position = new Vector(456, 67);
    transform.position = position;

    expect(transform["_position"]).toStrictEqual(position);
  });

  test("if the get absolutePosition accessor returns the Transform's absolution position", () => {
    const vectorZeroSpy = jest.spyOn(Vector, "Zero");
    const vectorTransformSpy = jest.spyOn(Vector.prototype, "transform");

    transform.absolutePosition;

    expect(vectorZeroSpy).toHaveBeenCalled();
    expect(vectorTransformSpy).toHaveBeenCalledWith(transform.worldTransform);
  });

  test("if the get rotation accessor returns the Transform's rotation", () => {
    const rotation = 45;
    transform["_rotation"] = rotation;

    expect(transform.rotation).toStrictEqual(rotation);
  });

  test("if the set rotation accessor sets the Transform's rotation", () => {
    const rotation = 45;
    transform.rotation = rotation;

    expect(transform["_rotation"]).toStrictEqual(rotation);
  });

  test("if the set rotation accessor sets the Transform's rotation provided degrees greater than 360", () => {
    const rotation = 2523;
    transform.rotation = rotation;

    expect(transform["_rotation"]).toStrictEqual(3);
  });

  test("if the get localRotation accessor returns the Transform's localRotation", () => {
    const localRotation = 45;
    transform["_localRotation"] = localRotation;

    expect(transform.localRotation).toStrictEqual(localRotation);
  });

  test("if the set localRotation accessor sets the Transform's localRotation", () => {
    const localRotation = 45;
    transform.localRotation = localRotation;

    expect(transform["_localRotation"]).toStrictEqual(localRotation);
  });

  test("if the set localRotation accessor sets the Transform's localRotation provided degrees greater than 360", () => {
    const localRotation = 2523;
    transform.localRotation = localRotation;

    expect(transform["_localRotation"]).toStrictEqual(3);
  });

  test("if the get scale accessor returns the Transform's scale", () => {
    const scale = new Vector(1.5, 0.1);
    transform["_scale"] = scale;

    expect(transform.scale).toStrictEqual(scale);
  });

  test("if the set scale accessor sets the Transform's scale", () => {
    const scale = new Vector(1.5, 0.1);
    transform.scale = scale;

    expect(transform["_scale"]).toStrictEqual(scale);
  });
});

describe("The Transform methods", () => {
  let transform: Transform;
  let controlPoints = [new Vector(5, 75), new Vector(56, 234)];

  beforeEach(() => {
    transform = new Transform(
      Vector.Zero(),
      0,
      0,
      Vector.Unit(),
      controlPoints,
      node
    );
  });

  test("if the updateWorldTransform method updates the worldTransform given parent's worldTransform", () => {
    const parentTransform = new Transform(
      new Vector(34, 65),
      60,
      25,
      new Vector(1.1, 0.9),
      [],
      new Empty("Node2", new Vector(34, 65))
    );

    const _updateWorldTransformSpy = jest.spyOn<any, any>(
      transform,
      "_updateWorldTransform"
    );

    transform.parent = parentTransform;
    transform.updateWorldTransform(parentTransform.worldTransform);

    expect(_updateWorldTransformSpy).toHaveBeenCalledWith(
      parentTransform.worldTransform
    );
  });
});
