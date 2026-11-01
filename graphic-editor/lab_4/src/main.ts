import { PointShape } from "./point";
import { LineShape } from "./line";
import { RectShape } from "./rectangle";
import { EllipseShape } from "./ellipse";
import { CircleLineShape } from "./circle-line";
import { CubeShape } from "./cube";
import type { Shape } from "./shape";
import { JOURNAL_NUMBER, MAX_SHAPES } from "./variant";

const SHAPE_KINDS = {
  point: PointShape, line: LineShape, rect: RectShape, ellipse: EllipseShape,
  circleLine: CircleLineShape, cube: CubeShape
};
const SHAPE_NAMES = {
  point: "Крапка", line: "Лінія", rect: "Прямокутник", ellipse: "Еліпс",
  circleLine: "Лінія з кружечками", cube: "Каркас куба"
};
type ShapeKind = keyof typeof SHAPE_KINDS;

class MyEditor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private status = document.getElementById("status");
  private shapes: Shape[] = [];
  private type: ShapeKind = "point";
  private draft: Shape | null = null;
  private pointerId: number | null = null;
  private events = new AbortController();
  private observer: ResizeObserver;

  constructor() {
    const canvas = document.getElementById("canvas");
    if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Полотно не знайдено");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D недоступний");
    this.canvas = canvas;
    this.ctx = ctx;

    const options = { signal: this.events.signal };
    canvas.addEventListener("pointerdown", this.onPointerDown, options);
    canvas.addEventListener("pointermove", this.onPointerMove, options);
    canvas.addEventListener("pointerup", this.onPointerUp, options);
    canvas.addEventListener("pointercancel", this.onPointerCancel, options);
    document.querySelector("nav")?.addEventListener("change", this.onSelect, options);
    document.getElementById("toolbar")?.addEventListener("click", this.onSelect, options);
    document.getElementById("clear")?.addEventListener("click", this.clear, options);
    document.getElementById("about")?.addEventListener("click", this.about, options);
    document.addEventListener("click", this.closeMenus, options);
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(canvas);
    this.selectShape("point");
    this.resize();
  }

  private repaint(): void {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    for (const shape of this.shapes) shape.show(this.ctx);
    this.draft?.show(this.ctx, true);
    if (this.status) this.status.textContent = `Фігур: ${this.shapes.length} з ${MAX_SHAPES}`;
  }

  private cancel(): void {
    const id = this.pointerId;
    this.draft = null;
    this.pointerId = null;
    if (id !== null && this.canvas.hasPointerCapture(id)) this.canvas.releasePointerCapture(id);
    this.repaint();
  }

  private update(e: PointerEvent, finish = false): void {
    if (!this.draft || e.pointerId !== this.pointerId) return;
    this.draft.setEnd(e.offsetX, e.offsetY);
    if (finish) {
      this.shapes.push(this.draft);
      this.cancel();
    } else this.repaint();
  }

  private onPointerDown = (e: PointerEvent): void => {
    if (e.button !== 0 || this.draft || document.querySelector("details[open]")) return;
    if (this.shapes.length >= MAX_SHAPES) return alert(`Масив заповнений: максимум ${MAX_SHAPES} фігур.`);
    const ShapeClass = SHAPE_KINDS[this.type];
    this.draft = new ShapeClass(e.offsetX, e.offsetY);
    this.pointerId = e.pointerId;
    this.canvas.setPointerCapture(e.pointerId);
    this.repaint();
  };

  private onPointerMove = (e: PointerEvent): void => this.update(e);
  private onPointerUp = (e: PointerEvent): void => this.update(e, true);
  private onPointerCancel = (e: PointerEvent): void => {
    if (e.pointerId === this.pointerId) this.cancel();
  };

  private onSelect = (e: Event): void => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const type = target.closest<HTMLElement>("[data-shape]")?.dataset.shape;
    if (!type || !Object.prototype.hasOwnProperty.call(SHAPE_KINDS, type)) return;
    this.selectShape(type as ShapeKind);
  };

  private selectShape(type: ShapeKind): void {
    this.type = type;
    document.querySelectorAll<HTMLInputElement>('input[name="shape"]').forEach((input) => {
      input.checked = input.dataset.shape === type;
    });
    document.querySelectorAll<HTMLButtonElement>("#toolbar button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.shape === type));
    });
    document.title = `Графічний редактор — варіант ${JOURNAL_NUMBER} — ${SHAPE_NAMES[type]}`;
  }

  private clear = (): void => {
    this.shapes.length = 0;
    this.cancel();
  };

  private about = (): void => {
    alert(`Графічний редактор об’єктів\nЛабораторна робота №4\nВаріант ${JOURNAL_NUMBER}`);
  };

  private closeMenus = (e: Event): void => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    document.querySelectorAll("details").forEach((menu) => {
      if (!menu.contains(target) || target.closest("input, button")) menu.open = false;
    });
  };

  private resize = (): void => {
    if (this.events.signal.aborted) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(this.canvas.clientWidth * dpr);
    this.canvas.height = Math.round(this.canvas.clientHeight * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.repaint();
  };

  destroy = (e?: PageTransitionEvent): void => {
    if (e?.persisted || this.events.signal.aborted) return;
    window.removeEventListener("pagehide", this.destroy);
    this.events.abort();
    this.observer.disconnect();
    this.clear();
  };
}

const editor = new MyEditor();
window.addEventListener("pagehide", editor.destroy);