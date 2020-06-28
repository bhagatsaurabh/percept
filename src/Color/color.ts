namespace Percept {

    export class Color {
        static Random(): string {
            return ('#' + Math.floor(Math.random()*16777215).toString(16));
        }

        static rgbToHex(r: number, g: number, b: number): string {
            return "#" + Color._componentToHex(r) + Color._componentToHex(g) + Color._componentToHex(b);
        }

        static _componentToHex(c: number) {
            let hex = c.toString(16);
            return hex.length == 1 ? '0' + hex : hex;
        }
    }
}