import { Canvas, Debug, Node, Color } from ".";
import { Vector } from "../math/vector";
import { Empty } from "../view/empty";

export interface DebugCall {
  debugFunction: Function;
  arguments: any[];
  frames?: number;
}

/**
 * Stores all views which will be rendered by canvas
 */
export class Drawing {
  // Scene-graph root node
  private sceneGraph: Node;
  /**@hidden */
  debugCalls: Record<string, DebugCall[]>;

  colorToNode: { [key: string]: Node };
  mousePos: Vector;

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

    this.mousePos = Vector.Zero();
    this.colorToNode = {};
    this._registerEvents();
  }

  /* istanbul ignore next */
  private _registerEvents(): void {
    let currentHitNode: Node, prevHitNode: Node;
    let currentDragNode: Node = null;
    let canvasOffset: DOMRect;

    this.canvas.canvasElement.onmousemove = (ev) => {
      canvasOffset = this.canvas.canvasElement.getBoundingClientRect();
      this.mousePos.x = ev.clientX - canvasOffset.left;
      this.mousePos.y = ev.clientY - canvasOffset.top;

      currentHitNode = this._getHitNode(this.mousePos);
      if (currentHitNode != prevHitNode) {
        prevHitNode && prevHitNode.call("mouseexit");
        currentHitNode && currentHitNode.call("mouseenter");
      }
      prevHitNode = currentHitNode;

      currentDragNode && currentDragNode.call("drag", [this.mousePos.clone()]);
    };

    this.canvas.canvasElement.onmousedown = () => {
      currentDragNode = currentHitNode;

      let hitNode = this._getHitNode(this.mousePos);
      hitNode && hitNode.call("mousedown");
    };

    this.canvas.canvasElement.onmouseup = () => {
      currentDragNode = null;

      let hitNode = this._getHitNode(this.mousePos);
      hitNode && hitNode.call("mouseup");
    };

    this.canvas.canvasElement.onclick = () => {
      let hitNode = this._getHitNode(this.mousePos);
      hitNode && hitNode.call("click");
    };

    this.canvas.canvasElement.oncontextmenu = (ev) => {
      ev.preventDefault();

      let hitNode = this._getHitNode(this.mousePos);
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
   * Adds a view object to this drawing
   *
   * @param node A View object to be rendered
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
   * Removes a view object from this drawing
   *
   * @param nodeOrID A View object or its id
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
