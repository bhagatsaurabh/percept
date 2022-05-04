import { Canvas, Drawing, Node } from "../../src/core";
import { Vector } from "../../src/math/vector";
import { Empty } from "../../src/view/empty";

const createMockSceneGraph = (drawing: Drawing) => {
  const node1 = new Empty("Node1", Vector.Zero());
  const node2 = new Empty("Node2", Vector.Zero());
  const node3 = new Empty("Node3", Vector.Zero());
  const node4 = new Empty("Node4", Vector.Zero());
  node3.parent = node1;
  node4.parent = node1;
  drawing.add([node1, node2]);
};

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The Drawing constructor", () => {
  const canvas = new Canvas(document.createElement("canvas"));

  test("if Drawing object is created using constructor with Canvas", () => {
    const registerEventsSpy = jest
      .spyOn<any, any>(Drawing.prototype, "_registerEvents")
      .mockImplementation(() => {});

    const drawing = new Drawing(canvas);

    expect(drawing["sceneGraph"] instanceof Node).toStrictEqual(true);
    expect(drawing["sceneGraph"].id).toStrictEqual("#Root");
    expect(drawing["debugCalls"]).toStrictEqual({});
    expect(drawing.colorToNode).toStrictEqual({});
    expect(registerEventsSpy).toHaveBeenCalled();
  });
});

describe("The Drawing methods", () => {
  let canvas: Canvas;

  beforeEach(() => {
    canvas = new Canvas(document.createElement("canvas"));
    canvas.width = 500;
    canvas.height = 300;
  });

  test("if render method renders the scene-graph", () => {
    const globalUpdate = jest.fn();
    const drawing = new Drawing(canvas, globalUpdate);
    drawing.add(new Empty("Node1", Vector.Zero()));

    const clearRectSpy = jest.spyOn(drawing.canvas.context, "clearRect");
    const offClearRectSpy = jest.spyOn(drawing.canvas.offContext, "clearRect");
    const renderTreeSpy = jest.spyOn(drawing["sceneGraph"], "call");
    const updateWorldTransformSpy = jest.spyOn(
      drawing["sceneGraph"].transform.childs[0],
      "updateWorldTransform"
    );
    const renderSpy = jest.spyOn(
      drawing["sceneGraph"].transform.childs[0].node,
      "render"
    );

    drawing.render();

    expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 500, 300);
    expect(offClearRectSpy).toHaveBeenCalledWith(0, 0, 500, 300);
    expect(renderTreeSpy).toHaveBeenCalledWith("update");
    expect(globalUpdate).toHaveBeenCalled();
    expect(updateWorldTransformSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalled();
  });

  test("if add method adds a single new view object to the scene-graph", () => {
    Node.prototype.setContext = jest.fn();
    Node.prototype.setDrawing = jest.fn();
    Node.prototype.setHitColor = jest.fn();

    const drawing = new Drawing(canvas);

    drawing.add(new Empty("node1", new Vector(50, 50)));
    drawing.add(new Empty("node2", new Vector(60, 60)));
    drawing.add(new Empty("node3", new Vector(70, 70)));

    expect(Node.prototype.setContext).toHaveBeenCalledTimes(3);
    expect(Node.prototype.setContext).toHaveBeenLastCalledWith(
      canvas.context,
      canvas.offContext
    );
    expect(Node.prototype.setDrawing).toHaveBeenCalledTimes(3);
    expect(Node.prototype.setDrawing).toHaveBeenLastCalledWith(drawing);
    expect(Node.prototype.setHitColor).toHaveBeenCalledTimes(3);
  });

  test("if add method adds an array of new view objects to the scene-graph", () => {
    Node.prototype.setContext = jest.fn();
    Node.prototype.setDrawing = jest.fn();
    Node.prototype.setHitColor = jest.fn();

    const drawing = new Drawing(canvas);

    drawing.add([
      new Empty("node1", new Vector(50, 50)),
      new Empty("node2", new Vector(60, 60)),
      new Empty("node3", new Vector(70, 70)),
    ]);

    expect(Node.prototype.setContext).toHaveBeenCalledTimes(3);
    expect(Node.prototype.setContext).toHaveBeenLastCalledWith(
      canvas.context,
      canvas.offContext
    );
    expect(Node.prototype.setDrawing).toHaveBeenCalledTimes(3);
    expect(Node.prototype.setDrawing).toHaveBeenLastCalledWith(drawing);
    expect(Node.prototype.setHitColor).toHaveBeenCalledTimes(3);
  });

  test("if remove method removes a leaf node from scene-graph", () => {
    const drawing = new Drawing(canvas);
    createMockSceneGraph(drawing);

    expect(drawing["sceneGraph"].childs.length).toStrictEqual(2);

    drawing.remove("Node2");

    expect(drawing["sceneGraph"].childs.length).toStrictEqual(1);
    expect(drawing["sceneGraph"].childs[0].id).toStrictEqual("Node1");
  });

  test("if remove method removes a sub-tree from scene-graph", () => {
    const drawing = new Drawing(canvas);
    createMockSceneGraph(drawing);

    expect(drawing["sceneGraph"].childs.length).toStrictEqual(2);

    const nodeToRemove = drawing["sceneGraph"].childs.find(
      (child) => child.id === "Node1"
    );
    drawing.remove(nodeToRemove);

    expect(drawing["sceneGraph"].childs.length).toStrictEqual(1);
    expect(drawing["sceneGraph"].childs[0].id).toStrictEqual("Node2");
  });
});
