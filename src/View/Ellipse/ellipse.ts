namespace Percept.View {

    interface IEllipseProperties {
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

    export class Ellipse extends Node {

        constructor(id: string, position: Vector2, public minor: number, public major: number, public props?: IEllipseProperties) {

            super(id, position, [
                position.subtract(0, minor),
                position.add(major, 0),
                position.add(0, minor),
                position.subtract(major, 0)
            ]);

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

            let position = this.absolutePosition;
            this.context.beginPath();
            if (this.minor == this.major) {
                this.context.arc(position.x, position.y, this.minor, 0, 2 * Math.PI);
            } else {
                this.context.ellipse(
                    position.x, position.y,
                    this.major,
                    this.minor,
                    Math.atan2(this.transform.controlPoints[1].y - position.y, this.transform.controlPoints[1].x - position.x),
                    0,
                    2 * Math.PI
                );
            }
            if (this.props && this.props.fill) {
                this.context.fill();
            }
            if ((this.props && this.props.outline) || (!this.props) || (this.props && !this.props.outline && !this.props.fill)) {
                this.context.stroke();
            }
        }

        getDimension(): Vector2 {
            return new Vector2(
                Vector2.Distance(this.transform.controlPoints[1], this.transform.controlPoints[3]),
                Vector2.Distance(this.transform.controlPoints[0], this.transform.controlPoints[2])
            );
        }
    }
}