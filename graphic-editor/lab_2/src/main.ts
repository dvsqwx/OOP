import { PointShape } from "./point";
import { LineShape } from "./line";
import { RectShape } from "./rectangle";
import { EllipseShape } from "./ellipse";
import type { Shape } from "./shape";
import { JOURNAL_NUMBER, MAX_SHAPES } from "./variant";

const SHAPE_KINDS = { point: PointShape, line: LineShape, rect: RectShape, ellipse: EllipseShape };
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const status = document.getElementById("status")!;
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Canvas 2D недоступний");

const shapes = new Array<Shape | undefined>(MAX_SHAPES);
let count = 0;
let draft: Shape | null = null;
let pointerId: number | null = null;

const repaint = (): void => {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  for (let i = 0; i < count; i++) shapes[i]!.show(ctx);
  draft?.show(ctx, true);
  status.textContent = `Фігур: ${count} з ${MAX_SHAPES}`;
};

function cancel(): void {
  const id = pointerId;
  draft = null;
  pointerId = null;
  if (id !== null && canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id);
  repaint();
}

function update(e: PointerEvent, finish = false): void {
  if (!draft || e.pointerId !== pointerId) return;
  draft.setEnd(e.offsetX, e.offsetY);
  if (finish) {
    shapes[count++] = draft;
    cancel();
  } else repaint();
}

canvas.onpointerdown = (e) => {
  if (e.button !== 0 || draft || document.querySelector("details[open]")) return;
  if (count >= MAX_SHAPES) return alert(`Масив заповнений: максимум ${MAX_SHAPES} фігур.`);
  const input = document.querySelector<HTMLInputElement>('input[name="shape"]:checked')!;
  const ShapeClass = SHAPE_KINDS[input.value as keyof typeof SHAPE_KINDS];
  draft = new ShapeClass(e.offsetX, e.offsetY);
  pointerId = e.pointerId;
  canvas.setPointerCapture(pointerId);
  repaint();
};
canvas.onpointermove = (e) => update(e);
canvas.onpointerup = (e) => update(e, true);
canvas.onpointercancel = (e) => {
  if (e.pointerId === pointerId) cancel();
};

document.getElementById("clear")!.onclick = () => {
  shapes.fill(undefined);
  count = 0;
  cancel();
};
document.getElementById("about")!.onclick = () =>
  alert(`Графічний редактор об’єктів\nЛабораторна робота №2\nВаріант ${JOURNAL_NUMBER}`);

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  document.querySelectorAll("details").forEach((menu) => {
    if (!menu.contains(target) || target.closest("input, button")) menu.open = false;
  });
});

const resize = (): void => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(canvas.clientWidth * dpr);
  canvas.height = Math.round(canvas.clientHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  repaint();
};

new ResizeObserver(resize).observe(canvas);
resize();