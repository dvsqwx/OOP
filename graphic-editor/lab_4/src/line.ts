import { Shape } from "./shape";

export class LineShape extends Shape {
  protected outline(ctx: CanvasRenderingContext2D): void {
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
  }
}