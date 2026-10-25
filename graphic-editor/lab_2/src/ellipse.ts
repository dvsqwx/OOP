import { ELLIPSE_FILL } from "./variant";

import { Shape } from "./shape";

export class EllipseShape extends Shape {
  protected fill = ELLIPSE_FILL;

  protected outline(ctx: CanvasRenderingContext2D): void {
    ctx.ellipse(this.x1, this.y1, Math.abs(this.x2 - this.x1), Math.abs(this.y2 - this.y1), 0, 0, Math.PI * 2);
  }
}