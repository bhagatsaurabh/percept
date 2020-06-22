namespace Percept {
    export class Canvas {

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        width: number;
        height: number;
        drawingHandle: number = -1;

        constructor(element?: HTMLCanvasElement | HTMLDivElement, width?: number, height?: number) {
            if (!element) {
                this.canvas = document.createElement('canvas');
                this.canvas.width = document.body.clientWidth;
                this.canvas.height = document.body.clientHeight;
                document.body.appendChild(this.canvas);
            } else {
                if (element instanceof HTMLDivElement) {
                    this.canvas = document.createElement('canvas');
                    if (width && height) {
                        this.canvas.width = width;
                        this.canvas.height = height;
                    } else {
                        this.canvas.width = element.clientWidth;
                        this.canvas.height = element.clientHeight;
                    }
                    element.appendChild(this.canvas);
                } else {
                    this.canvas = element;
                    if (width && height) {
                        this.canvas.width = width;
                        this.canvas.height = height;
                    }
                }
            }
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.context = this.canvas.getContext('2d');
        }

        load(drawing: Drawing) {
            if(this.drawingHandle != -1) {
                window.cancelAnimationFrame(this.drawingHandle);
            }
            window.requestAnimationFrame(drawing.render.bind(drawing));
        }
    }
}