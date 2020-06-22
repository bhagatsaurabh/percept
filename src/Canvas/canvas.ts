namespace Percept {
    /**
     * The Canvas object holds an HTMLCanvasElement reference and its 2d context
     */
    export class Canvas {

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        width: number;
        height: number;
        private drawingHandle: number = -1;

        /**
         * If no parameters are passed then a new canvas element will be created and appended to `<body>`
         * 
         * @param element Reference to an html `<canvas>` or `<div>` element, if a `<div>` element is passed, then a canvas will be created and appended
         * @param width Passing a width will overwrite previously defined canvas width
         * @param height Passing a height will overwrite previously defined canvas height
         */
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

        /**
         * Calls render function of `Drawing`
         * 
         * @param drawing A `Drawing` object, which will be rendered by this canvas
         */
        draw(drawing: Drawing) {
            if(this.drawingHandle != -1) {
                window.cancelAnimationFrame(this.drawingHandle);
            }
            window.requestAnimationFrame(drawing.render.bind(drawing));
        }
    }
}