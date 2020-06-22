namespace Percept.View {

    interface IPolygonProperties {
        outline?: boolean
        fill?: boolean,
        outlineColor?: string | LinearGradient | RadialGradient,
        fillColor?: string | LinearGradient | RadialGradient,
        outlineWidth?: number,
        outlineDashSegments?: number[],
        shadowColor?: string,
        shadowOffset?: Vector2,
        staticShadow?: boolean,
        shadowBlur?: number
    }

    export class Polygon extends Node {

        constructor(id: string, vertices: Vector2[], center: Vector2, public props?: IPolygonProperties) {
            
            super(id, center, vertices);

            if (this.props && this.props.outlineColor && typeof(this.props.outlineColor) != 'string') {
                this.props.outlineColor.node = this;
            }
            if (this.props && this.props.fillColor && typeof(this.props.fillColor) != 'string') {
                this.props.fillColor.node = this;
            }
        }

        _render(): void {
            if (this.props) {
                (this.props.outlineColor) && (this.context.strokeStyle = (typeof(this.props.outlineColor) == 'string') ? this.props.outlineColor : this.props.outlineColor.create(this.context));
                (this.props.fillColor) && (this.context.fillStyle = (typeof(this.props.fillColor) == 'string') ? this.props.fillColor : this.props.fillColor.create(this.context));
                (this.props.outlineWidth) && (this.context.lineWidth = this.props.outlineWidth);
                (this.props.outlineDashSegments) && this.context.setLineDash(this.props.outlineDashSegments);
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
            this.context.moveTo(this.transform.controlPoints[0].x, this.transform.controlPoints[0].y);
            for(let index = 1 ; index < this.transform.controlPoints.length ; index++) {
                this.context.lineTo(this.transform.controlPoints[index].x, this.transform.controlPoints[index].y);
            }
            this.context.closePath();

            if (this.props && this.props.fill) {
                this.context.fill();
            }
            if ((this.props && this.props.outline) || (!this.props) || (this.props && !this.props.outline && !this.props.fill)) {
                this.context.stroke();
            }
        }

        getDimension(): Vector2 {
            let bounds = Vector2.Bounds(this.transform.controlPoints);

            return new Vector2(
                Math.abs(bounds[0].x - bounds[1].x),
                Math.abs(bounds[0].y - bounds[1].y)
            );
        }
    }
}