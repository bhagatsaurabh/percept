import { Vector2 } from "../Math/math";
import { Node } from '../node';

interface IImageProperties {
  shadowColor?: string,
  shadowOffset?: Vector2,
  staticShadow?: boolean,
  shadowBlur?: number
}

export class Image extends Node {

  _source: HTMLImageElement;

  constructor(id: string, position: Vector2, source: string | HTMLImageElement, public width: number, public height: number, public props?: IImageProperties) {
    super(id, position, []);

    (!props) && (this.props = {});
    if (typeof (source) == 'string') {
      this._source = new window.Image();
      this._source.src = source;
    } else {
      this._source = source;
    }
    this._source.crossOrigin = "Anonymous";
  }

  _render(): void {
    if (this.props) {
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

    let topLeft = this.absolutePosition.subtract((this.width * this.transform.scale.x) / 2, (this.height * this.transform.scale.y) / 2);
    this.context.drawImage(this._source, topLeft.x, topLeft.y, this.width * this.transform.scale.x, this.height * this.transform.scale.y);
  }

  _offRender(): void {
    this.offContext.fillStyle = this.hitColor;

    // Rotate bounding-rectangle using worldTransform's rotation component
    this.offContext.translate(this.absolutePosition.x, this.absolutePosition.y);
    this.offContext.rotate(this.transform.worldTransform.getRotation() * (Math.PI / 180));
    this.offContext.translate(-this.absolutePosition.x, -this.absolutePosition.y);

    let topLeft = this.absolutePosition.subtract((this.width * this.transform.scale.x) / 2, (this.height * this.transform.scale.y) / 2);
    this.offContext.fillRect(topLeft.x, topLeft.y, this.width * this.transform.scale.x, this.height * this.transform.scale.y);
  }

  getDimension(): Vector2 {
    return new Vector2(
      this.width,
      this.height
    );
  }
}
