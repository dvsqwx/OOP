import { Shape } from "./shape";

export class RectShape extends Shape {
  protected outline(ctx: CanvasRenderingContext2D): void {
    ctx.rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
  }
}