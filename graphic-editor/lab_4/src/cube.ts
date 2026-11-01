import type { Shape } from "./shape";
import { RectShape } from "./rectangle";
import { LineShape } from "./line";

export class CubeShape extends RectShape {
  protected override fill = "";
  private parts: Shape[] = [];

  constructor(x: number, y: number) {
    super(x, y);
    this.setEnd(x, y);
  }

  override setEnd(x: number, y: number): void {
    const size = Math.max(Math.abs(x - this.x1), Math.abs(y - this.y1));
    const offset = size / 2;
    super.setEnd(this.x1 + size, this.y1 + size);
    this.parts = [new RectShape(
      this.x1 + offset, this.y1 - offset,
      this.x2 + offset, this.y2 - offset, ""
    )];
    for (const [cx, cy] of [
      [this.x1 - size, this.y1 - size], [this.x1 + size, this.y1 - size],
      [this.x1 + size, this.y1 + size], [this.x1 - size, this.y1 + size]
    ]) this.parts.push(new LineShape(cx, cy, cx + offset, cy - offset));
  }

  override show(ctx: CanvasRenderingContext2D, rubber = false): void {
    super.show(ctx, rubber);
    for (const part of this.parts) part.show(ctx, rubber);
  }
}