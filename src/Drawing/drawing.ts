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
        }
    
        /**
         * @hidden
         */
        render() {
            this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
            node.setContext(this.canvas.context);
            node.setDrawing(this);
        }
    }
}