import { Vector2 } from "../math";
import { LinearGradient, RadialGradient } from ".";
import { Node } from "../core/node";

interface ITextProperties {
  font?: string;
  outline?: boolean;
  fill?: boolean;
  outlineColor?: string | LinearGradient | RadialGradient;
  fillColor?: string | LinearGradient | RadialGradient;
  outlineWidth?: number;
  shadowColor?: string;
  shadowOffset?: Vector2;
  staticShadow?: boolean;
  shadowBlur?: number;
}

export class Text extends Node {
  _text: string;
  _originalWidth: number;
  _originalHeight: number;

  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this._text = text;
  }

  constructor(
    id: string,
    position: Vector2,
    text: string,
    public props?: ITextProperties
  ) {
    super(id, position, []);

    !props && (this.props = {});
    this.text = text;
    if (this.props.outlineColor && typeof this.props.outlineColor != "string") {
      this.props.outlineColor.node = this;
    }
    if (this.props.fillColor && typeof this.props.fillColor != "string") {
      this.props.fillColor.node = this;
    }

    let textMetricContext = document.createElement("canvas").getContext("2d");
    this.props.font && (textMetricContext.font = this.props.font);
    this._originalWidth = textMetricContext.measureText(text).width;
    this._originalHeight = textMetricContext.measureText("M").width;
  }

  _render(): void {
    if (this.props) {
      this.props.outlineColor &&
        (this.context.strokeStyle =
          typeof this.props.outlineColor == "string"
            ? this.props.outlineColor
            : this.props.outlineColor.create(this.context));
      this.props.fillColor &&
        (this.context.fillStyle =
          typeof this.props.fillColor == "string"
            ? this.props.fillColor
            : this.props.fillColor.create(this.context));
      this.props.outlineWidth &&
        (this.context.lineWidth = this.props.outlineWidth);
      this.props.shadowColor &&
        (this.context.shadowColor = this.props.shadowColor);
      this.props.shadowBlur &&
        (this.context.shadowBlur = this.props.shadowBlur);
      if (this.props.shadowOffset) {
        if (!this.props.staticShadow) {
          let shadowOffset = this.props.shadowOffset
            .transform(this.transform.worldTransform)
            .subtract(this.absolutePosition);
          this.context.shadowOffsetX = shadowOffset.x;
          this.context.shadowOffsetY = shadowOffset.y;
        } else {
          this.context.shadowOffsetX = this.props.shadowOffset.x;
          this.context.shadowOffsetY = this.props.shadowOffset.y;
        }
      }
      this.props.font && (this.context.font = this.props.font);
    }

    // Rotate image using worldTransform's rotation component
    this.context.translate(this.absolutePosition.x, this.absolutePosition.y);
    this.context.scale(this.scale.x, this.scale.y);
    this.context.rotate(
      this.transform.worldTransform.getRotation() * (Math.PI / 180)
    );
    this.context.translate(-this.absolutePosition.x, -this.absolutePosition.y);

    this.props.outline &&
      this.context.strokeText(
        this.text,
        this.absolutePosition.x - this._originalWidth / 2,
        this.absolutePosition.y + this._originalHeight / 2
      );
    (this.props.fill || !this.props.outline) &&
      this.context.fillText(
        this.text,
        this.absolutePosition.x - this._originalWidth / 2,
        this.absolutePosition.y + this._originalHeight / 2
      );
  }

  _offRender(): void {
    this.offContext.fillStyle = this.hitColor;

    // Rotate image using worldTransform's rotation component
    this.offContext.translate(this.absolutePosition.x, this.absolutePosition.y);
    this.offContext.scale(this.scale.x, this.scale.y);
    this.offContext.rotate(
      this.transform.worldTransform.getRotation() * (Math.PI / 180)
    );
    this.offContext.translate(
      -this.absolutePosition.x,
      -this.absolutePosition.y
    );

    this.offContext.fillRect(
      this.absolutePosition.x - this._originalWidth / 2,
      this.absolutePosition.y - this._originalHeight / 2,
      this._originalWidth,
      this._originalHeight
    );
  }

  getDimension(): Vector2 {
    return new Vector2(
      Vector2.Distance(
        this.transform.controlPoints[0],
        this.transform.controlPoints[1]
      ),
      0
    );
  }
}
