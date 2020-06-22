namespace Percept {

    export interface IDebugCall {
        [key: string]: {
            debugFunction: Function,
            arguments: any[],
            frames?: number
        }[]
    }

    export class Drawing {

        renderTree: Node;
        debugCalls: IDebugCall;

        constructor(public canvas: Canvas, public globalUpdate?: Function) {
            let rootNode = new View.Empty('#Root', Vector2.Zero());
            rootNode.context = this.canvas.context;
            rootNode.drawing = this;
            this.renderTree = rootNode;
            this.debugCalls = {}
        }
    
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

        add(node: Node): void {
            node.parent = this.renderTree;
            node.setContext(this.canvas.context);
            node.setDrawing(this);
        }
    }
}