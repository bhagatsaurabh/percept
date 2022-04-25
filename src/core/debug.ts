import { Drawing, IDebugCall } from ".";
import { Vector2 } from "../math";

/**
 * Includes static methods for debugging
 */
export class Debug {
  /**
   * Will render a filled circle denoting a single point on canvas
   *
   * @param key A unique name for this debug
   * @param drawing Drawing, on which this debug will render
   * @param point The point to render
   * @param props Styling properties for debug
   * @param frames Specifies for how many frames this debug will persist (e.g passing 100 will allow this debug to be rendered for 100 consecutive frames without clearing it from canvas)
   */
  static debugPoint(
    key: string,
    drawing: Drawing,
    point: Vector2,
    props: { color: string; radius?: number },
    frames?: number
  ) {
    Debug.limitDebugCalls(drawing, key, frames);

    drawing.debugCalls[key].push({
      debugFunction: Debug._debugPoint,
      arguments: [drawing.canvas.context, point.clone(), props],
    });
  }

  private static _debugPoint(
    context: CanvasRenderingContext2D,
    center: Vector2,
    props: { color: string; radius?: number }
  ) {
    context.fillStyle = props.color;
    context.beginPath();
    context.arc(
      center.x,
      center.y,
      props.radius ? props.radius : 2,
      0,
      2 * Math.PI
    );
    context.fill();
  }

  /**
   * Will render a line with green and red dots on start and end co-ordinates of line
   *
   * @param key A unique name for this debug
   * @param drawing Drawing, on which this debug will render
   * @param from Start Vector for this line
   * @param to End Vector point for this line
   * @param props Styling properties for debug
   * @param frames Specifies for how many frames this debug will persist (e.g passing 100 will allow this debug to be rendered for 100 consecutive frames without clearing it from canvas)
   */
  static debugLine(
    key: string,
    drawing: Drawing,
    from: Vector2,
    to: Vector2,
    props: { color: string; width?: number },
    frames?: number
  ) {
    Debug.limitDebugCalls(drawing, key, frames);

    drawing.debugCalls[key].push({
      debugFunction: Debug._debugLine,
      arguments: [drawing.canvas.context, from.clone(), to.clone(), props],
    });
  }

  private static _debugLine(
    context: CanvasRenderingContext2D,
    from: Vector2,
    to: Vector2,
    props: { color: string; width?: number }
  ) {
    context.strokeStyle = props.color;
    context.lineWidth = props.width ? props.width : 1;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();

    context.fillStyle = "green";
    context.beginPath();
    context.arc(from.x, from.y, 2, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = "red";
    context.beginPath();
    context.arc(to.x, to.y, 2, 0, 2 * Math.PI);
    context.fill();
  }

  /**
   * @hidden
   *
   * Starts debug render calls stored in debugCalls
   */
  static show(debugCalls: IDebugCall, context: CanvasRenderingContext2D) {
    for (let debug in debugCalls) {
      for (let call of debugCalls[debug]) {
        context.save();
        call.debugFunction(...call.arguments);
        context.restore();
      }
    }
  }

  // Used for persisting the debug calls on canvas (shifts array of debug calls to limit array size to frames)
  private static limitDebugCalls(
    drawing: Drawing,
    key: string,
    frames: number
  ) {
    if (
      frames &&
      drawing.debugCalls[key] &&
      frames - 1 < drawing.debugCalls[key].length
    ) {
      drawing.debugCalls[key].shift();
    } else {
      (!drawing.debugCalls[key] || !frames) && (drawing.debugCalls[key] = []);
    }
  }
}
