namespace Percept.View {

    interface IImageProperties {
        outline?: boolean,
        outlineColor?: string | LinearGradient | RadialGradient,
        outlineWidth?: number,
        outlineDashSegments?: number[],
        shadowColor?: string,
        shadowOffset?: Vector2,
        staticShadow?: boolean,
        shadowBlur?: number
    }

    export class Image extends Node {

        _source: HTMLImageElement;

        constructor(id: string, position: Vector2, source: string | HTMLImageElement, public width: number, public height: number, public props?: IImageProperties) {
            super(id, position, []);
            
            if (typeof(source) == 'string') {
                this._source = new window.Image();
                this._source.src = source;
            } else {
                this._source = source;
            }

            if (this.props && this.props.outlineColor && typeof(this.props.outlineColor) != 'string') {
                this.props.outlineColor.node = this;
            }
        }

        _render(): void {
            if (this.props) {
                (this.props.outlineColor) && (this.context.strokeStyle = (typeof(this.props.outlineColor) == 'string') ? this.props.outlineColor : this.props.outlineColor.create(this.context));
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

            // Rotate image using worldTransform's rotation component
            this.context.translate(this.absolutePosition.x, this.absolutePosition.y);
            this.context.rotate(this.transform.worldTransform.getRotation() * (Math.PI / 180));
            this.context.translate(-this.absolutePosition.x, -this.absolutePosition.y);

            let topRight = this.absolutePosition.subtract(this.width / 2, this.height / 2);
            this.context.drawImage(this._source, topRight.x, topRight.y, this.width * this.transform.scale.x, this.height * this.transform.scale.y);
            if ((this.props && this.props.outline)) {
                this.context.strokeRect(topRight.x, topRight.y, this.width, this.height);
            }
        }

        getDimension(): Vector2 {
            return new Vector2(
                this.width,
                this.height
            );
        }
    }
}