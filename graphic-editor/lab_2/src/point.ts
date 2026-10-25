import { Shape } from "./shape";

export class PointShape extends Shape {
  protected fill = "black";

  protected outline(ctx: CanvasRenderingContext2D): void {
    ctx.arc(this.x2, this.y2, 2, 0, Math.PI * 2);
  }
}