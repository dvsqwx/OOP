import { LineShape } from "./line";
import { EllipseShape } from "./ellipse";

export class CircleLineShape extends LineShape {
  private circles: EllipseShape[] = [];

  constructor(x: number, y: number) {
    super(x, y);
    this.setEnd(x, y);
  }

  override setEnd(x: number, y: number): void {
    super.setEnd(x, y);
    this.circles = [[this.x1, this.y1], [x, y]].map(([cx, cy]) =>
      new EllipseShape(cx - 4, cy - 4, cx + 4, cy + 4)
    );
  }

  override show(ctx: CanvasRenderingContext2D, rubber = false): void {
    super.show(ctx, rubber);
    for (const circle of this.circles) circle.show(ctx, rubber);
  }
}