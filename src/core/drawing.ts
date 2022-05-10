import { Canvas, Debug, Node, Color } from "./index";
import { Vector } from "../math/vector";
import { Empty } from "../view/empty";

export interface DebugCall {
  debugFunction: Function;
  arguments: any[];
  frames?: number;
}

/**
 * A Drawing is essentially a scene-graph consisting of all the {@link View Views} added to it using {@link Drawing.add add} method, it also registers event listeners on {@link Canvas.canvasElement canvasElement}
 */
export class Drawing {
  // Scene-graph root node
  private sceneGraph: Node;
  private pointers: any[] = [];

  /** @hidden */
  debugCalls: Record<string, DebugCall[]>;
  colorToNode: { [key: string]: Node };

  /**
   *
   * @param canvas The Canvas object
   * @param globalUpdate A function that will be called per frame
   */
  constructor(public canvas: Canvas, public globalUpdate?: Function) {
    let rootNode = new Empty("#Root", Vector.Zero());
    rootNode.context = this.canvas.context;
    rootNode.drawing = this;
    this.sceneGraph = rootNode;
    this.debugCalls = {};

    this.colorToNode = {};
    this._registerEvents();
  }

  private getRelativePosition(ev: PointerEvent | WheelEvent | MouseEvent) {
    const canvasOffset = this.canvas.canvasElement.getBoundingClientRect();
    return new Vector(
      ev.clientX - canvasOffset.left,
      ev.clientY - canvasOffset.top
    );
  }

  private updatePointer(ev: PointerEvent, position: Vector) {
    let pointer = this.pointers.find((pntr) => pntr.id === ev.pointerId);
    if (pointer) {
      pointer.position = position;
    }
  }

  private removePointer(ev: PointerEvent) {
    this.pointers.splice(
      this.pointers.findIndex((pointer) => pointer.id === ev.pointerId),
      1
    );
  }

  /* istanbul ignore next */
  private _registerEvents(): void {
    let currHitNode: Node, prevHitNode: Node;

    this.canvas.canvasElement.onpointerdown = (ev: PointerEvent) => {
      this.pointers.push({
        id: ev.pointerId,
        position: this.getRelativePosition(ev),
      });

      if (this.pointers.length === 1) {
        currHitNode = this._getHitNode(this.pointers[0].position);
        currHitNode &&
          currHitNode.call("down", [this.pointers[0].position.clone()]);
      } else {
        currHitNode = null;
      }
    };

    this.canvas.canvasElement.onpointermove = (ev: PointerEvent) => {
      const position = this.getRelativePosition(ev);
      this.updatePointer(ev, position);

      currHitNode && currHitNode.call("drag", [position.clone()]);

      if (ev.pointerType === "mouse" && !currHitNode) {
        let hitNode = this._getHitNode(position);
        if (hitNode !== prevHitNode) {
          prevHitNode && prevHitNode.call("exit", [position.clone()]);
          hitNode && hitNode.call("enter", [position.clone()]);
        } else {
          hitNode && !currHitNode && hitNode.call("over", [position.clone()]);
        }
        prevHitNode = hitNode;
      }
    };

    this.canvas.canvasElement.onpointerup = (ev: PointerEvent) => {
      this.removePointer(ev);

      currHitNode = null;

      const position = this.getRelativePosition(ev);
      let hitNode = this._getHitNode(position);
      hitNode && hitNode.call("up", [position.clone()]);
    };

    this.canvas.canvasElement.onpointerout = (ev) => {
      this.removePointer(ev);

      if (this.pointers.length === 0) {
        currHitNode = null;
      }
      if (prevHitNode) {
        const position = this.getRelativePosition(ev);
        prevHitNode.call("exit", [position.clone()]);
        prevHitNode = null;
      }
    };

    this.canvas.canvasElement.onclick = (ev) => {
      const position = this.getRelativePosition(ev);
      let hitNode = this._getHitNode(position);
      hitNode && hitNode.call("click", [position.clone()]);
    };

    this.canvas.canvasElement.oncontextmenu = (ev) => {
      ev.preventDefault();

      let hitNode = this._getHitNode(this.getRelativePosition(ev));
      hitNode && hitNode.call("rightclick");
    };
  }

  /* istanbul ignore next */
  private _getHitNode(position: Vector): Node {
    return this.colorToNode[
      Color.rgbToHex(
        this.canvas.offContext.getImageData(position.x, position.y, 1, 1).data
      )
    ];
  }

  /** @hidden */
  render() {
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.offContext.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.sceneGraph.call("update");

    this.globalUpdate && this.globalUpdate();

    this.sceneGraph.transform.childs.forEach((child) => {
      child.updateWorldTransform();
    });

    this.sceneGraph.transform.childs.forEach((child) => {
      child.node.render();
    });

    Debug.show(this.debugCalls, this.canvas.context);
  }

  /**
   * Adds a {@link View} to this drawing
   *
   * @param node A View to be added to the scene-graph
   */
  add(node: Node | Node[]): void {
    if (node instanceof Node) {
      node.parent = this.sceneGraph;
      node.setContext(this.canvas.context, this.canvas.offContext);
      node.setDrawing(this);
      node.setHitColor();
    } else {
      node.forEach((cNode) => {
        cNode.parent = this.sceneGraph;
        cNode.setContext(this.canvas.context, this.canvas.offContext);
        cNode.setDrawing(this);
        cNode.setHitColor();
      });
    }
  }

  /**
   * Removes a {@link View} from this drawing
   *
   * @param nodeOrID A View or its id
   */
  remove(nodeOrID: Node | string) {
    if (nodeOrID instanceof Node) nodeOrID = nodeOrID.id;

    let queue = [];
    let currentNode;
    queue.push(this.sceneGraph);

    while ((currentNode = queue.shift())) {
      if (currentNode.id == nodeOrID) {
        currentNode.transform.parent.childs.splice(
          currentNode.transform.parent.childs.indexOf(currentNode.transform),
          1
        );
      } else {
        currentNode.transform.childs.forEach((child) => {
          queue.push(child.node);
        });
      }
    }
  }

  /* istanbul ignore next */
  private _debugSceneGraph(root: Node, indent: string): void {
    console.log(indent + root.id + "[" + root.order + "]");

    root.transform.childs.forEach((child) => {
      this._debugSceneGraph(child.node, " " + indent);
    });
  }
}
