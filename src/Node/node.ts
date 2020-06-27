/**@hidden */
namespace Percept {

    export abstract class Node implements Event {

        drawing: Drawing;
        context: CanvasRenderingContext2D;
        transform: Transform;
        registeredEvents: any;
        order: number;
        
        abstract _render(): void;
        abstract getDimension(): Vector2;

        get zIndex(): number {
            return this.order;
        }

        set zIndex(zIndex: number) {
            this.order = zIndex;

            (this.parent) && this.parent.transform.childs.sort((a, b) => {
                return a.node.order - b.node.order;
            });
        }

        get parent(): Node {
            return this.transform.parent.node;
        }
        set parent(newParent: Node) {
            this.transform.parent = newParent.transform;
        }

        get position(): Vector2 {
            return this.transform.position;
        }
        set position(position: Vector2) {
            this.transform.position = position;
        }
        get absolutePosition(): Vector2 {
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

        get scale(): Vector2 {
            return this.transform.scale;
        }
        set scale(scale: Vector2) {
            this.transform.scale = scale;
        }

        constructor(public id: string, position: Vector2, controlPoints: Vector2[]) {
            this.transform = new Transform(position, 0, 0, Vector2.One(), controlPoints, this);
            this.registeredEvents = {};
            this.order = 0;
        }

        on(eventKey: string, callback: Function): void {
            this.registeredEvents[eventKey] = callback;
        }

        render(): void {
            this.context.save();
            this._render();
            this.context.restore();

            for (var child of this.transform.childs) {
                child.node.render();
            }
        }

        call(method: string) {
            if (this.registeredEvents[method]) {
                this.registeredEvents[method](this);
            }

            for (var child of this.transform.childs) {
                child.node.call(method);
            }
        }

        setContext(context: CanvasRenderingContext2D) {
            this.context = context;
            this.transform.childs.forEach((child) => {
                child.node.setContext(context);
            });
        }

        setDrawing(drawing: Drawing) {
            this.drawing = drawing;
            this.transform.childs.forEach((child) => {
                child.node.setDrawing(drawing);
            });
        }



        dispose(): void {
            this.drawing.remove(this.id);
        }
    }
}