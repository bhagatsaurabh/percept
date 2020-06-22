namespace Percept {
    export class Debug {

        static debugPoint(key: string, drawing: Drawing, point: Vector2, props: {color: string, radius?: number}, frames?: number) {
            Debug.limitDebugCalls(drawing, key, frames);

            drawing.debugCalls[key].push({
                debugFunction: Debug._debugPoint,
                arguments: [drawing.canvas.context, point.clone(), props]
            });
        }

        private static _debugPoint(context: CanvasRenderingContext2D, center: Vector2, props: {color: string, radius?: number}) {
            context.fillStyle = props.color;
            context.beginPath();
            context.arc(center.x, center.y, (props.radius) ? props.radius : 2 , 0, 2 * Math.PI);
            context.fill();
        }

        static debugLine(key: string, drawing: Drawing, from: Vector2, to: Vector2, props: {color: string, width?: number}, frames?: number) {
            Debug.limitDebugCalls(drawing, key, frames);

            drawing.debugCalls[key].push({
                debugFunction: Debug._debugLine,
                arguments: [drawing.canvas.context, from.clone(), to.clone(), props]
            });
        }

        private static _debugLine(context: CanvasRenderingContext2D, from: Vector2, to: Vector2, props: {color: string, width?: number}) {
            context.strokeStyle = props.color;
            context.lineWidth = (props.width) ? props.width : 1;
            context.beginPath();
            context.moveTo(from.x, from.y);
            context.lineTo(to.x, to.y);
            context.stroke();
            
            context.fillStyle = 'green'
            context.beginPath();
            context.arc(from.x, from.y, 2, 0, 2 * Math.PI);
            context.fill();

            context.fillStyle = 'red';
            context.beginPath();
            context.arc(to.x, to.y, 2, 0, 2 * Math.PI);
            context.fill();
        }

        static show (debugCalls: IDebugCall, context: CanvasRenderingContext2D) {
            for (let debug in debugCalls) {
                for (let call of debugCalls[debug]) {
                    context.save();
                    call.debugFunction(...call.arguments);
                    context.restore();
                }
            }
        }

        private static limitDebugCalls(drawing: Drawing, key: string, frames: number) {
            if (frames && drawing.debugCalls[key] && (frames-1) < drawing.debugCalls[key].length) {
                drawing.debugCalls[key].shift();
            } else {
                (!drawing.debugCalls[key] || !frames) && (drawing.debugCalls[key] = []);  
            }
        }
    }
}