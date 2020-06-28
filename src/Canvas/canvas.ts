namespace Percept {
    /**
     * The Canvas object holds an HTMLCanvasElement reference and its 2d context
     */
    export class Canvas {

        canvasElement: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        offCanvasElement: OffscreenCanvas;
        offContext: OffscreenCanvasRenderingContext2D;
        
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
                this.canvasElement = document.createElement('canvas');
                this.canvasElement.width = document.body.clientWidth;
                this.canvasElement.height = document.body.clientHeight;
                document.body.appendChild(this.canvasElement);
            } else {
                if (element instanceof HTMLDivElement) {
                    this.canvasElement = document.createElement('canvas');
                    if (width && height) {
                        this.canvasElement.width = width;
                        this.canvasElement.height = height;
                    } else {
                        this.canvasElement.width = element.clientWidth;
                        this.canvasElement.height = element.clientHeight;
                    }
                    element.appendChild(this.canvasElement);
                } else {
                    this.canvasElement = element;
                    if (width && height) {
                        this.canvasElement.width = width;
                        this.canvasElement.height = height;
                    }
                }
            }
            this.width = this.canvasElement.width;
            this.height = this.canvasElement.height;
            this.context = this.canvasElement.getContext('2d');

            this.offCanvasElement = new OffscreenCanvas(this.width, this.height);
            this.offContext = this.offCanvasElement.getContext('2d');
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