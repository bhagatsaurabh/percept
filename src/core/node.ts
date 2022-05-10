import { Transform, Vector } from "../math";
import { Drawing } from "./drawing";
import { Event } from "./event";
import { Color } from "./color";

/**
 * A Node in the scene-graph, consisting of a {@link Transform}
 */
export abstract class Node implements Event {
  drawing: Drawing;
  context: CanvasRenderingContext2D;
  offContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  transform: Transform;
  registeredEvents: any;
  order: number;
  hitColor: string;

  abstract _render(): void;
  abstract _offRender(): void;
  abstract getDimension(): Vector;

  get zIndex(): number {
    return this.order;
  }
  set zIndex(zIndex: number) {
    this.order = zIndex;

    if (this.parent) {
      this.parent.transform.childs.sort((a, b) => {
        return a.node.order - b.node.order;
      });
    }
  }

  get parent(): Node {
    return this.transform.parent.node;
  }
  set parent(newParent: Node) {
    this.transform.parent = newParent.transform;
  }

  get childs(): Node[] {
    return this.transform.childs.map((child) => {
      return child.node;
    });
  }

  get position(): Vector {
    return this.transform.position;
  }
  set position(position: Vector) {
    this.transform.position = position;
  }
  get absolutePosition(): Vector {
    return this.transform.absolutePosition;
  }

  get rotation(): number {
    return this.transform.rotation;
  }
  set rotation(degrees: number) {
    this.transform.rotation = degrees;
  }

  get localRotation(): number {
    return this.transform.localRotation;
  }
  set localRotation(degrees: number) {
    this.transform.localRotation = degrees;
  }

  get scale(): Vector {
    return this.transform.scale;
  }
  set scale(scale: Vector) {
    this.transform.scale = scale;
  }

  /**
   * A scene-graph Node
   *
   * @param id A unique identifier for this node
   * @param position Position where the node will be first initiated
   * @param controlPoints A set of {@link Vector Vectors} defining points of control for this Node, for e.g. for a Rectangle, the four corners are its control points, transformations such as position, rotation and scale are applied to these control points
   */
  constructor(public id: string, position: Vector, controlPoints: Vector[]) {
    this.transform = new Transform(
      position,
      0,
      0,
      Vector.Unit(),
      controlPoints,
      this
    );
    this.registeredEvents = {};
    this.order = 0;
  }

  /**
   * Sets a unique color for this node on hit-maps
   */
  setHitColor() {
    // Set unique color for hit detection in offscreen canvas
    let color: string = Color.Random();
    while (this.drawing.colorToNode[color]) {
      color = Color.Random();
    }

    this.hitColor = color;
    this.drawing.colorToNode[color] = this;

    this.transform.childs.forEach((child) => {
      child.node.setHitColor();
    });
  }

  /**
   * Register an event on this Node
   * @param eventKey name of the event
   * @param callback callback
   */
  on(eventKey: string, callback: Function): void {
    this.registeredEvents[eventKey] = callback;
  }

  /** Calls internal _render/_offRender functions and recursively invokes render functions for all child nodes */
  render(): void {
    this.context.save();
    this._render();
    this.context.restore();
    this.offRender();

    for (var child of this.transform.childs) {
      child.node.render();
    }
  }

  /** Calls internal _offRender function for this node */
  offRender(): void {
    this.offContext.save();
    this._offRender();
    this.offContext.restore();
  }

  /**
   * Calls all the event callbacks registered using {@link Node.on on}
   */
  call(method: string, args?: any[]) {
    if (this.registeredEvents[method]) {
      if (args) {
        this.registeredEvents[method](this, ...args);
      } else {
        this.registeredEvents[method](this);
      }
    }

    for (var child of this.transform.childs) {
      child.node.call(method, args);
    }
  }

  /** @hidden */
  setContext(
    context: CanvasRenderingContext2D,
    offContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ) {
    this.context = context;
    this.offContext = offContext;
    this.transform.childs.forEach((child) => {
      child.node.setContext(context, offContext);
    });
  }

  /** @hidden */
  setDrawing(drawing: Drawing) {
    this.drawing = drawing;
    this.transform.childs.forEach((child) => {
      child.node.setDrawing(drawing);
    });
  }

  /**
   * Remove this node from {@link Drawing Drawing's} scene-graph
   * Calls {@link Drawing.remove remove} on Drawing object
   */
  dispose(): void {
    this.drawing.remove(this.id);
  }
}
