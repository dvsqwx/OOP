import { RUBBER_COLOR } from "./variant";

export abstract class Shape {
  protected fill = "";

  constructor(protected x1: number, protected y1: number, protected x2 = x1, protected y2 = y1) {}

  setEnd(x: number, y: number): void {
    this.x2 = x;
    this.y2 = y;
  }

  protected abstract outline(ctx: CanvasRenderingContext2D): void;

  show(ctx: CanvasRenderingContext2D, rubber = false): void {
    ctx.beginPath();
    this.outline(ctx);
    ctx.strokeStyle = rubber ? RUBBER_COLOR : "black";
    if (!rubber && this.fill) {
      ctx.fillStyle = this.fill;
      ctx.fill();
    }
    ctx.stroke();
  }
}