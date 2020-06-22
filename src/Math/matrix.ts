namespace Percept {
    export class Matrix {
        value: number[][];

        constructor(value: number[][]) {
            this.value = value;
        }

        multiply(another: Matrix | number[][]): Matrix {
            let result;
            if (another instanceof Matrix) {
                result = [...Array(this.value.length)].map(x=>Array(another.value[0].length));

                for (let i = 0 ; i < this.value.length ; i++) {
                    for (let j = 0 ; j < another.value[0].length ; j++) {
                        let sum = 0;
                        for (let k = 0 ; k < this.value[0].length ; k++) {
                            sum += this.value[i][k] * another.value[k][j];
                        }
                        result[i][j] = sum;
                    }
                }
            } else {
                result = [...Array(this.value.length)].map(x=>Array(another[0].length));

                for (let i = 0 ; i < this.value.length ; i++) {
                    for (let j = 0 ; j < another[0].length ; j++) {
                        let sum = 0;
                        for (let k = 0 ; k < this.value[0].length ; k++) {
                            sum += this.value[i][k] * another[k][j];
                        }
                        result[i][j] = sum;
                    }
                }
            }

            return new Matrix(result);
        }

        multiplyInPlace(another: Matrix | number[][]): Matrix {
            let result;
            if (another instanceof Matrix) {
                result = [...Array(this.value.length)].map(x=>Array(another.value[0].length));

                for (let i = 0 ; i < this.value.length ; i++) {
                    for (let j = 0 ; j < another.value[0].length ; j++) {
                        let sum = 0;
                        for (let k = 0 ; k < this.value[0].length ; k++) {
                            sum += this.value[i][k] * another.value[k][j];
                        }
                        result[i][j] = sum;
                    }
                }
            } else {
                result = [...Array(this.value.length)].map(x=>Array(another[0].length));

                for (let i = 0 ; i < this.value.length ; i++) {
                    for (let j = 0 ; j < another[0].length ; j++) {
                        let sum = 0;
                        for (let k = 0 ; k < this.value[0].length ; k++) {
                            sum += this.value[i][k] * another[k][j];
                        }
                        result[i][j] = sum;
                    }
                }
            }

            this.value = result;
            return this;
        }

        clone() {
            return new Matrix([
                [this.value[0][0], this.value[0][1], this.value[0][2]],
                [this.value[1][0], this.value[1][1], this.value[1][2]],
                [this.value[2][0], this.value[2][1], this.value[2][2]]
            ]);
        }

        getRotation(): number {
            return Math.atan2(this.value[0][1], this.value[0][0]) * (180 / Math.PI);
        }

        static Identity() {
            return new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
        }

        static Zero() {
            return new Matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
        }

        static Multiply(matrix1: number[][], matrix2: number[][]) {
            let result = [...Array(matrix1.length)].map(x=>Array(matrix2[0].length));

            for (let i = 0 ; i < matrix1.length ; i++) {
                for (let j = 0 ; j < matrix2[0].length ; j++) {
                    let sum = 0;
                    for (let k = 0 ; k < matrix1[0].length ; k++) {
                        sum += matrix1[i][k] * matrix2[k][j];
                    }
                    result[i][j] = sum;
                }
            }

            return result;
        }
    }
}