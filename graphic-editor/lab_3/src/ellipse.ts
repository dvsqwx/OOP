import { Shape } from "./shape";

export class EllipseShape extends Shape {
  protected outline(ctx: CanvasRenderingContext2D): void {
    ctx.ellipse(
      (this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2,
      Math.abs(this.x2 - this.x1) / 2, Math.abs(this.y2 - this.y1) / 2,
      0, 0, Math.PI * 2
    );
  }
}