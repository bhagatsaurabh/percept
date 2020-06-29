namespace Percept.View {

    interface ILineProperties {
        color?: string | LinearGradient | RadialGradient,
        lineWidth?: number,
        lineCap?: CanvasLineCap,
        lineDashSegments?: number[],
        shadowColor?: string,
        shadowOffset?: Vector2,
        staticShadow?: boolean,
        shadowBlur?: number
    }

    export class Line extends Node {

        get from(): Vector2 {
            if (this._from instanceof Node)
                return this._from.absolutePosition;
            else
                return this.transform.controlPoints[0];
        }
        get to(): Vector2 {
            if (this._to instanceof Node)
                return this._to.absolutePosition;
            else
                return this.transform.controlPoints[1];
        }

        constructor(id: string, public _from: Vector2 | Node, public _to: Vector2 | Node, pivot?: number, public props?: ILineProperties) {
            super(
                id,
                (_from instanceof Vector2 && _to instanceof Vector2) ?
                    ((pivot) ? _from.add((_to.x - _from.x) * pivot, (_to.y - _from.y) * pivot) : _from.clone()) :
                    (Vector2.Zero()),
                (_from instanceof Vector2 && _to instanceof Vector2) ?
                    [_from, _to] :
                    []
            );

            (!props) && (this.props = {});
            if (this.props.color && typeof(this.props.color) != 'string') {
                this.props.color.node = this;
            }
        }

        _render(): void {
            if (this.props) {
                (this.props.color) && (this.context.strokeStyle = (typeof(this.props.color) == 'string') ? this.props.color : this.props.color.create(this.context));
                (this.props.lineWidth) && (this.context.lineWidth = this.props.lineWidth);
                (this.props.lineCap) && (this.context.lineCap = this.props.lineCap);
                (this.props.lineDashSegments) && this.context.setLineDash(this.props.lineDashSegments);
                (this.props.shadowColor) && (this.context.shadowColor = this.props.shadowColor);
                (this.props.shadowBlur) && (this.context.shadowBlur = this.props.shadowBlur);
                if (this.props.shadowOffset) {
                    if (!this.props.staticShadow) {
                        let shadowOffset = this.props.shadowOffset.transform(this.transform.worldTransform).subtract(this.absolutePosition);
                        this.context.shadowOffsetX = shadowOffset.x;
                        this.context.shadowOffsetY = shadowOffset.y;
                    } else {
                        this.context.shadowOffsetX = this.props.shadowOffset.x;
                        this.context.shadowOffsetY = this.props.shadowOffset.y;
                    }
                }
            }

            this.context.beginPath();
            this.context.moveTo(this.from.x, this.from.y);
            this.context.lineTo(this.to.x, this.to.y);
            this.context.stroke();
        }

        _offRender(): void {
            (this.props.lineWidth) && (this.offContext.lineWidth = this.props.lineWidth);
            this.offContext.strokeStyle = this.hitColor;

            this.offContext.beginPath();
            this.offContext.moveTo(this.from.x, this.from.y);
            this.offContext.lineTo(this.to.x, this.to.y);
            this.offContext.stroke();
        }

        getDimension(): Vector2 {
            return new Vector2(Vector2.Distance(this.transform.controlPoints[0], this.transform.controlPoints[1]), 0);
        }
    }
}