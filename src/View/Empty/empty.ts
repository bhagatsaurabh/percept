namespace Percept.View {

    export class Empty extends Node {
        
        constructor(id: string, position: Vector2) {
            super(id, position, []);
        }

        _render(): void {}

        getDimension(): Vector2 {
            return Vector2.Zero();
        }
    }
}