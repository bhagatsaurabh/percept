import { Vector } from "../math/vector";
import { LinearGradient, RadialGradient } from ".";
import { Node } from "../core/node";

export interface RectangleOptions {
  outline?: boolean;
  fill?: boolean;
  outlineColor?: string | LinearGradient | RadialGradient;
  fillColor?: string | LinearGradient | RadialGradient;
  outlineWidth?: number;
  outlineDashSegments?: number[];
  shadowColor?: string;
  shadowOffset?: Vector;
  staticShadow?: boolean;
  shadowBlur?: number;
}

export class Rectangle extends Node {
  constructor(
    id: string,
    position: Vector,
    width: number,
    height: number,
    public props?: RectangleOptions
  ) {
    super(id, position, [
      position.add(-width / 2, -height / 2),
      position.add(width / 2, -height / 2),
      position.add(width / 2, height / 2),
      position.add(-width / 2, height / 2),
    ]);

    !props && (this.props = {});
    if (this.props.outlineColor && typeof this.props.outlineColor != "string") {
      this.props.outlineColor.node = this;
    }
    if (this.props.fillColor && typeof this.props.fillColor != "string") {
      this.props.fillColor.node = this;
    }
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
      this.props.outlineDashSegments &&
        this.context.setLineDash(this.props.outlineDashSegments);
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
    }

    this.context.beginPath();
    this.context.moveTo(
      this.transform.controlPoints[0].x,
      this.transform.controlPoints[0].y
    );
    this.context.lineTo(
      this.transform.controlPoints[1].x,
      this.transform.controlPoints[1].y
    );
    this.context.lineTo(
      this.transform.controlPoints[2].x,
      this.transform.controlPoints[2].y
    );
    this.context.lineTo(
      this.transform.controlPoints[3].x,
      this.transform.controlPoints[3].y
    );
    this.context.lineTo(
      this.transform.controlPoints[0].x,
      this.transform.controlPoints[0].y
    );
    if (this.props.fill) {
      this.context.fill();
    }
    if (this.props.outline || !this.props.fill) {
      this.context.stroke();
    }
  }

  _offRender(): void {
    this.props.outlineWidth &&
      (this.offContext.lineWidth = this.props.outlineWidth);
    this.offContext.strokeStyle = this.hitColor;
    this.offContext.fillStyle = this.hitColor;

    this.offContext.beginPath();
    this.offContext.moveTo(
      this.transform.controlPoints[0].x,
      this.transform.controlPoints[0].y
    );
    this.offContext.lineTo(
      this.transform.controlPoints[1].x,
      this.transform.controlPoints[1].y
    );
    this.offContext.lineTo(
      this.transform.controlPoints[2].x,
      this.transform.controlPoints[2].y
    );
    this.offContext.lineTo(
      this.transform.controlPoints[3].x,
      this.transform.controlPoints[3].y
    );
    this.offContext.lineTo(
      this.transform.controlPoints[0].x,
      this.transform.controlPoints[0].y
    );
    if (this.props.fill) {
      this.offContext.fill();
    }
    if (this.props.outline || !this.props.fill) {
      this.offContext.stroke();
    }
  }

  getDimension(): Vector {
    return new Vector(
      Vector.Distance(
        this.transform.controlPoints[0],
        this.transform.controlPoints[1]
      ),
      Vector.Distance(
        this.transform.controlPoints[1],
        this.transform.controlPoints[2]
      )
    );
  }
}
