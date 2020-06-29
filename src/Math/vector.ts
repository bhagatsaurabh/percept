namespace Percept {

    /**
     * Stores 2D Vector
     */
    export class Vector2 {

        tmpX: number;
        tmpY: number;

        constructor (public x: number, public y: number) {}

        toString() {
            return '[' + this.x.toFixed(3) + ', ' + this.y.toFixed(3) + ']';
        }
        
        add(arg1: number | Vector2, arg2?: number): Vector2 {
            // Params : (vector2d) or (x, y)
            if (arg1 instanceof Vector2) {
                return new Vector2(this.x + arg1.x, this.y + arg1.y);
            } else {
                return new Vector2(this.x + arg1, this.y + arg2);
            }
        }

        addInPlace(arg1: number | Vector2, arg2?: number): Vector2 {
            // Params : (vector2d) or (x, y)
            if (arg1 instanceof Vector2) {
                this.x += arg1.x;
                this.y += arg1.y;
            } else if (!arg2) {
                this.x += arg1;
                this.y += arg1;
            } else {
                this.x += arg1;
                this.y += arg2;
            }
            return this;
        }

        multiply(arg1: number | Vector2, arg2?: number): Vector2 {
            // Params : (vector2d) or (x, y)
            if (arg1 instanceof Vector2) {
                return new Vector2(this.x * arg1.x, this.y * arg1.y);
            } else {
                return new Vector2(this.x * arg1, this.y * arg2);
            }
        }

        multiplyInPlace(arg1: number | Vector2, arg2?: number): Vector2 {
            // Params : (vector2d) or (x, y)
            if (arg1 instanceof Vector2) {
                this.x *= arg1.x;
                this.y *= arg1.y;
            } else if (!arg2) {
                this.x *= arg1;
                this.y *= arg1;
            } else {
                this.x *= arg1;
                this.y *= arg2;
            }
            return this;
        }

        subtract(arg1: number | Vector2, arg2?: number): Vector2 {
            // Params : (vector2d) or (x, y)
            if (arg1 instanceof Vector2) {
                return new Vector2(this.x - arg1.x, this.y - arg1.y);
            } else {
                return new Vector2(this.x - arg1, this.y - arg2);
            }
        }

        subtractInPlace(arg1: number | Vector2, arg2?: number): void {
            // Params : (vector2d) or (x, y)
            if (arg1 instanceof Vector2) {
                this.x -= arg1.x;
                this.y -= arg1.y;
            } else {
                this.x -= arg1;
                this.y -= arg2;
            }
        }

        rotate(pivot: Vector2, degrees: number): Vector2 {
            degrees = degrees * Constant.TAU;
            let cosT = Math.cos(degrees);
            let sinT = Math.sin(degrees);
            return new Vector2(
                (cosT * (this.x - pivot.x)) - (sinT * (this.y - pivot.y)) + pivot.x,
                (sinT * (this.x - pivot.x)) + (cosT * (this.y - pivot.y)) + pivot.y
            );
        }

        rotateInPlace(pivot: Vector2, degrees: number): Vector2 {
            degrees = degrees * Constant.TAU;
            let cosT = Math.cos(degrees);
            let sinT = Math.sin(degrees);
            this.tmpX = (cosT * (this.x - pivot.x)) - (sinT * (this.y - pivot.y)) + pivot.x;
            this.tmpY = (sinT * (this.x - pivot.x)) + (cosT * (this.y - pivot.y)) + pivot.y;
            this.x = this.tmpX;
            this.y = this.tmpY;
            return this;
        }

        max() {
            return Math.max(this.x, this.y);
        }

        transform(matrix: Matrix) {
            let result = Matrix.Multiply([[this.x, this.y, 1]], matrix.value);
            return new Vector2(result[0][0], result[0][1]);
        }

        transformInPlace(matrix: Matrix) {
            let result = Matrix.Multiply([[this.x, this.y, 1]], matrix.value);
            this.x = result[0][0];
            this.y = result[0][1];
        }

        static Midpoint(vector1: Vector2, vector2: Vector2): Vector2 {
            return new Vector2((vector1.x + vector2.x) / 2, (vector1.y + vector2.y) / 2);
        }

        static Distance(vector1: Vector2, vector2: Vector2): number {
            return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2));
        }
        
        static Zero(): Vector2 {
            return new Vector2(0, 0);
        }

        static One(): Vector2 {
            return new Vector2(1, 1);
        }

        
        static Bounds(vectors: Vector2[]): Vector2[] {
            let minVec = new Vector2(Number.MAX_VALUE, Number.MAX_VALUE);
            let maxVec = new Vector2(Number.MIN_VALUE, Number.MIN_VALUE);

            vectors.forEach((vector) => {
                if (vector.x < minVec.x) minVec.x = vector.x;
                if (vector.y < minVec.y) minVec.y = vector.y;
                if (vector.x > maxVec.x) maxVec.x = vector.x;
                if (vector.y > maxVec.y) maxVec.y = vector.y;
            });
            return [minVec, maxVec];
        }

        static Average(vectors: Vector2[]): Vector2 {
            let sumX = 0;
            let sumY = 0;
            vectors.forEach((vector) => {
                sumX += vector.x;
                sumY += vector.y;
            });
            return new Vector2(sumX / vectors.length, sumY / vectors.length);
        }

        static Random(minXOrCanvas: number | Canvas, maxX?: number, minY?: number, maxY?: number): Vector2 {
            if(minXOrCanvas instanceof Canvas) {
                return new Vector2(
                    Math.random() * minXOrCanvas.width,
                    Math.random() * minXOrCanvas.height
                );
            } else {
                return new Vector2(
                    Math.random() * (maxX - minXOrCanvas) + minXOrCanvas,
                    Math.random() * (maxY - minY) + minY
                );
            }
        }

        static Lerp(start: Vector2, end: Vector2, amount: number): Vector2 {
            return new Vector2(
                start.x + ((end.x - start.x) * amount),
                start.y + ((end.y - start.y) * amount)
            );
        }

        clone(): Vector2 {
            return new Vector2(this.x, this.y);
        }
    }
}