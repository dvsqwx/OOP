import { Shape } from "./shape";
import { RECTANGLE_FILL } from "./variant";

export class RectShape extends Shape {
  protected fill = RECTANGLE_FILL;

  protected outline(ctx: CanvasRenderingContext2D): void {
    const dx = Math.abs(this.x2 - this.x1);
    const dy = Math.abs(this.y2 - this.y1);
    ctx.rect(this.x1 - dx, this.y1 - dy, dx * 2, dy * 2);
  }
}