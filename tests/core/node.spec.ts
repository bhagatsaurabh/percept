import { Canvas, Color, Drawing } from "../../src/core";
import { Vector, Transform } from "../../src/math";
import { Empty } from "../../src/view/empty";

let canvas: Canvas, drawing: Drawing;
beforeEach(() => {
  canvas = new Canvas(document.createElement("canvas"));
  canvas.width = 500;
  canvas.width = 300;
  drawing = new Drawing(canvas);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("The Node constructor", () => {
  test("if Node object is created when creating a new View", () => {
    const node = new Empty("Node1", Vector.Zero());
    expect(node.transform instanceof Transform).toStrictEqual(true);
    expect(node.registeredEvents).toStrictEqual({});
    expect(node.order).toStrictEqual(0);
  });
});

describe("The Node accessors", () => {
  test("if get zIndex accessor returns order", () => {
    const node = new Empty("Node1", Vector.Zero());
    node.order = 11;

    expect(node.zIndex).toStrictEqual(11);
  });

  test("if set zIndex accessor sets the order and re-arranges sibling's Transforms", () => {
    const node1 = new Empty("Node1", Vector.Zero());
    const node2 = new Empty("Node2", Vector.Zero());
    const node3 = new Empty("Node3", Vector.Zero());
    node2.parent = node1;
    node3.parent = node1;

    expect(node1.childs.length).toStrictEqual(2);
    expect(node1.childs).toStrictEqual([node2, node3]);

    node2.zIndex = 2;

    expect(node2.order).toStrictEqual(2);
    expect(node1.childs).toStrictEqual([node3, node2]);
  });

  test("if get parent accessor returns Transform parent", () => {
    const node1 = new Empty("Node1", Vector.Zero());
    const node2 = new Empty("Node2", Vector.Zero());
    node2.parent = node1;

    expect(node2.parent).toStrictEqual(node2.transform.parent.node);
  });

  test("if set parent accessor sets the Transform parent", () => {
    const node1 = new Empty("Node1", Vector.Zero());
    const node2 = new Empty("Node2", Vector.Zero());
    node2.parent = node1;

    expect(node2.transform.parent).toStrictEqual(node1.transform);
  });

  test("if get childs accessor returns Transform childs mapped to their nodes", () => {
    const node1 = new Empty("Node1", Vector.Zero());
    const node2 = new Empty("Node2", Vector.Zero());
    const node3 = new Empty("Node3", Vector.Zero());
    node2.parent = node1;
    node3.parent = node1;

    expect(node1.childs).toStrictEqual([node2, node3]);
  });

  test("if get position accessor returns Transform position", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));
    node1.transform.position = new Vector(65, 87);

    expect(node1.position.x).toStrictEqual(65);
    expect(node1.position.y).toStrictEqual(87);
  });

  test("if set position accessor sets the Transform position", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));
    node1.position = new Vector(100, 150);

    expect(node1.transform.position.x).toStrictEqual(100);
    expect(node1.transform.position.y).toStrictEqual(150);
  });

  test("if get absolutePosition accessor returns Transform's absolutePosition", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));

    expect(node1.absolutePosition.x).toStrictEqual(
      node1.transform.absolutePosition.x
    );
    expect(node1.absolutePosition.y).toStrictEqual(
      node1.transform.absolutePosition.y
    );
  });

  test("if get rotation accessor returns Transform rotation", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));
    node1.transform.rotation = 150;

    expect(node1.rotation).toStrictEqual(150);
  });

  test("if set rotation accessor sets the Transform rotation", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));
    node1.rotation = 45;

    expect(node1.transform.rotation).toStrictEqual(45);
  });

  test("if get localRotation accessor returns Transform localRotation", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));
    node1.transform.localRotation = 150;

    expect(node1.localRotation).toStrictEqual(150);
  });

  test("if set localRotation accessor sets the Transform localRotation", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));
    node1.localRotation = 45;

    expect(node1.transform.localRotation).toStrictEqual(45);
  });

  test("if get scale accessor returns Transform scale", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));
    node1.transform.scale = new Vector(1.3, 1.6);

    expect(node1.scale.x).toStrictEqual(1.3);
    expect(node1.scale.y).toStrictEqual(1.6);
  });

  test("if set scale accessor sets the Transform scale", () => {
    const node1 = new Empty("Node1", new Vector(25, 50));
    node1.scale = new Vector(0.2, 0.5);

    expect(node1.transform.scale.x).toStrictEqual(0.2);
    expect(node1.transform.scale.y).toStrictEqual(0.5);
  });
});

describe("The Node methods", () => {
  test("if setHitColor method sets a unique hitColor of node", () => {
    const node = new Empty("Node1", Vector.Zero());
    const mockChildSetHitColor = jest.fn();
    drawing.add(node);
    drawing.colorToNode["#zxcvbn"] = node;

    let counter = 0;
    jest.spyOn(Color, "Random").mockImplementation(() => {
      counter += 1;
      return counter === 2 ? "#ghijkl" : "#zxcvbn";
    });
    (node.transform as any).childs = [
      {
        node: {
          setHitColor: mockChildSetHitColor,
          setContext: jest.fn(),
          setDrawing: jest.fn(),
        },
      },
    ];

    node.setHitColor();

    expect(node.hitColor).toStrictEqual("#ghijkl");
    expect(drawing.colorToNode["#ghijkl"]).toStrictEqual(node);
    expect(mockChildSetHitColor).toHaveBeenCalledTimes(1);
  });

  test("if on method sets the event callback on provided eventKey", () => {
    const node = new Empty("Node1", Vector.Zero());
    const mockCallback = jest.fn();
    node.on("test", mockCallback);

    expect(node.registeredEvents["test"]).toStrictEqual(mockCallback);
  });

  test("if call method calls the event callback on provided eventKey without args", () => {
    const node = new Empty("Node1", Vector.Zero());
    const mockChildCall = jest.fn();
    (node.transform as any).childs = [{ node: { call: mockChildCall } }];
    const mockCallback = jest.fn();

    node.on("test", mockCallback);
    node.call("test");

    expect(mockCallback).toHaveBeenCalled();
    expect(mockChildCall).toHaveBeenCalled();
  });

  test("if call method calls the event callback on provided eventKey with args", () => {
    const node = new Empty("Node1", Vector.Zero());
    const mockChildCall = jest.fn();
    (node.transform as any).childs = [{ node: { call: mockChildCall } }];
    const mockCallback = jest.fn();

    node.on("test", mockCallback);
    node.call("test", ["arg1", 56, true]);

    expect(mockCallback).toHaveBeenCalledWith(node, "arg1", 56, true);
    expect(mockChildCall).toHaveBeenCalledWith("test", ["arg1", 56, true]);
  });

  test("if render method calls the View's _render method and its childs", () => {
    const node = new Empty("Node1", Vector.Zero());
    drawing.add(node);
    const mockChildRender = jest.fn();
    (node.transform as any).childs = [
      {
        node: {
          render: mockChildRender,
        },
      },
    ];
    const _renderSpy = jest.spyOn(node, "_render");
    const offRenderSpy = jest.spyOn(node, "offRender");

    node.render();

    expect(_renderSpy).toHaveBeenCalled();
    expect(offRenderSpy).toHaveBeenCalled();
    expect(mockChildRender).toHaveBeenCalled();
  });

  test("if offRender method calls the View's _offRender method", () => {
    const node = new Empty("Node1", Vector.Zero());
    drawing.add(node);
    const _offRenderSpy = jest.spyOn(node, "_offRender");

    node.offRender();

    expect(_offRenderSpy).toHaveBeenCalled();
  });

  test("if setContext method sets the context and offContext properties with children", () => {
    const node = new Empty("Node1", Vector.Zero());
    const mockChildSetContext = jest.fn();
    (node.transform as any).childs = [
      { node: { setContext: mockChildSetContext } },
    ];
    node.setContext(canvas.context, canvas.offContext);

    expect(node.context).toStrictEqual(canvas.context);
    expect(node.offContext).toStrictEqual(canvas.offContext);
    expect(mockChildSetContext).toHaveBeenCalledWith(
      canvas.context,
      canvas.offContext
    );
  });

  test("if setDrawing method sets the drawing property with children", () => {
    const node = new Empty("Node1", Vector.Zero());
    const mockChildSetDrawing = jest.fn();
    (node.transform as any).childs = [
      { node: { setDrawing: mockChildSetDrawing } },
    ];
    node.setDrawing(drawing);

    expect(node.drawing).toStrictEqual(drawing);
    expect(mockChildSetDrawing).toHaveBeenCalledWith(drawing);
  });

  test("if dispose method calls remove method on drawing with node's id", () => {
    const node = new Empty("Node1", Vector.Zero());
    drawing.add(node);

    const removeSpy = jest.spyOn(drawing, "remove");

    node.dispose();

    expect(removeSpy).toHaveBeenCalledWith(node.id);
  });
});
