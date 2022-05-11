import { Vector } from "../math/vector";
import { LinearGradient, RadialGradient } from "./index";
import { Node } from "../core/node";

export interface EllipseOptions {
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

export class Ellipse extends Node {
  constructor(
    id: string,
    position: Vector,
    public minor: number,
    public major: number,
    public props: EllipseOptions = {}
  ) {
    super(id, position, [
      position.subtract(0, minor),
      position.add(major, 0),
      position.add(0, minor),
      position.subtract(major, 0),
    ]);

    if (
      this.props.outlineColor &&
      typeof this.props.outlineColor !== "string"
    ) {
      this.props.outlineColor.node = this;
    }
    if (this.props.fillColor && typeof this.props.fillColor !== "string") {
      this.props.fillColor.node = this;
    }
  }

  /* istanbul ignore next */
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

    let position = this.absolutePosition;
    this.context.beginPath();
    if (this.minor == this.major) {
      this.context.arc(position.x, position.y, this.minor, 0, 2 * Math.PI);
    } else {
      this.context.ellipse(
        position.x,
        position.y,
        this.major,
        this.minor,
        Math.atan2(
          this.transform.controlPoints[1].y - position.y,
          this.transform.controlPoints[1].x - position.x
        ),
        0,
        2 * Math.PI
      );
    }
    if (this.props.fill) {
      this.context.fill();
    }
    if (this.props.outline || !this.props.fill) {
      this.context.stroke();
    }
  }

  /* istanbul ignore next */
  _offRender(): void {
    this.props.outlineWidth &&
      (this.offContext.lineWidth = this.props.outlineWidth);
    this.offContext.strokeStyle = this.hitColor.cssString;
    this.offContext.fillStyle = this.hitColor.cssString;

    let position = this.absolutePosition;
    this.offContext.beginPath();
    if (this.minor == this.major) {
      this.offContext.arc(position.x, position.y, this.minor, 0, 2 * Math.PI);
    } else {
      this.offContext.ellipse(
        position.x,
        position.y,
        this.major,
        this.minor,
        Math.atan2(
          this.transform.controlPoints[1].y - position.y,
          this.transform.controlPoints[1].x - position.x
        ),
        0,
        2 * Math.PI
      );
    }
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
        this.transform.controlPoints[1],
        this.transform.controlPoints[3]
      ),
      Vector.Distance(
        this.transform.controlPoints[0],
        this.transform.controlPoints[2]
      )
    );
  }
}
