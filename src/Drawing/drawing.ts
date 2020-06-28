namespace Percept {

    export interface IDebugCall {
        [key: string]: {
            debugFunction: Function,
            arguments: any[],
            frames?: number
        }[]
    }

    /**
     * Stores all views which will be rendered by canvas
     */
    export class Drawing {

        // Scene-graph root node
        private renderTree: Node;
        /**@hidden */
        debugCalls: IDebugCall;

        colorToNode: {[key:string]: Node};
        mousePos: Vector2;

        /**
         * 
         * @param canvas The Canvas object
         * @param globalUpdate A function that will be called per frame
         */
        constructor(public canvas: Canvas, public globalUpdate?: Function) {
            let rootNode = new View.Empty('#Root', Vector2.Zero());
            rootNode.context = this.canvas.context;
            rootNode.drawing = this;
            this.renderTree = rootNode;
            this.debugCalls = {}

            this._registerEvents();
            this.mousePos = Vector2.Zero();
            this.colorToNode = {};
        }

        _registerEvents(): void {
            this.canvas.canvas.onmousemove = (ev) => {
                this.mousePos.x = ev.clientX - this.canvas.canvas.offsetLeft;
                this.mousePos.y = ev.clientY - this.canvas.canvas.offsetTop;
            };

            this.canvas.canvas.onclick = () => {
                let pixel = this.canvas.offContext.getImageData(this.mousePos.x, this.mousePos.y, 1, 1).data;
                let hitColor = Color.rgbToHex(pixel[0], pixel[1], pixel[2]);

                (this.colorToNode[hitColor]) && (this.colorToNode[hitColor].call('click'));
            };
        }
    
        /**
         * @hidden
         */
        render() {
            this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.canvas.offContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.renderTree.call('update');

            (this.globalUpdate) && this.globalUpdate();

            this.renderTree.transform.childs.forEach((child) => {
                child.updateWorldTransform();
            });

            this.renderTree.transform.childs.forEach((child) => {
                child.node.render();
            });

            Debug.show(this.debugCalls, this.canvas.context);
            window.requestAnimationFrame(this.render.bind(this));
        }

        /**
         * Adds a view object to this drawing
         * 
         * @param node A View object to be rendered
         */
        add(node: Node): void {
            node.parent = this.renderTree;
            node.setContext(this.canvas.context, this.canvas.offContext);
            node.setDrawing(this);
            node.setHitColor();
        }

        remove(nodeOrID: Node | string) {
            if (nodeOrID instanceof Node) nodeOrID = nodeOrID.id;

            let queue = [];
            let currentNode;
            queue.push(this.renderTree);

            while((currentNode = queue.shift())) {
                if (currentNode.id == nodeOrID) {
                    currentNode.transform.parent.childs.splice(currentNode.transform.parent.childs.indexOf(currentNode.transform), 1);
                } else {
                    currentNode.transform.childs.forEach((child) => {
                        queue.push(child.node);
                    });
                }
            }
        }

        _debugSceneGraph(root: Node, indent: string): void {
            console.log(indent + root.id + '[' + root.order + ']');

            root.transform.childs.forEach((child) => {
                this._debugSceneGraph(child.node, ' ' + indent);
            });
        }
    }
}