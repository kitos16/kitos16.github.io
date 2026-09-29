import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

interface Point {
  x: number;
  y: number;
  pressure: number;
}

interface StrokeCommand {
  id: string;
  tool: 'brush' | 'eraser';
  color: string;
  baseWidth: number;
  points: Point[];
}

@Component({
  selector: 'app-gear-sketch-demo',
  standalone: false,
  templateUrl: './gear-sketch-demo.component.html',
  styleUrl: './gear-sketch-demo.component.scss'
})
export class GearSketchDemoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  tool: 'brush' | 'eraser' = 'brush';
  brushColor = '#000000';
  backgroundColor = '#1a1a2e';
  baseWidth = 4;

  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private pendingPoints: Point[] = [];
  private strokePoints: Point[] = [];
  private rafId = 0;
  private currentPointerId: number | null = null;
  private commands: StrokeCommand[] = [];
  private cursor = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (this.ctx) {
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
    }
    this.setupCanvas();
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, rect.width, rect.height);
    }

    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('pointercancel', this.onPointerCancel);
  }

  private getPointsFromEvent(event: PointerEvent): Point[] {
    const canvas = this.canvasRef.nativeElement;
    if (event.getCoalescedEvents) {
      const coalesced = event.getCoalescedEvents();
      if (coalesced.length > 0) {
        return coalesced.map(e => ({
          x: e.offsetX,
          y: e.offsetY,
          pressure: e.pressure > 0 ? e.pressure : 0.5
        }));
      }
    }
    return [{
      x: event.offsetX,
      y: event.offsetY,
      pressure: event.pressure > 0 ? event.pressure : 0.5
    }];
  }

  private onPointerDown = (event: PointerEvent): void => {
    if (this.currentPointerId !== null) return;
    this.currentPointerId = event.pointerId;
    this.isDrawing = true;

    const points = this.getPointsFromEvent(event);
    this.strokePoints = [...points];
    this.pendingPoints = points;

    this.rafId = requestAnimationFrame(this.rafLoop);
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.isDrawing || event.pointerId !== this.currentPointerId) return;
    const points = this.getPointsFromEvent(event);
    this.pendingPoints.push(...points);
    this.strokePoints.push(...points);
  };

  private onPointerUp = (event: PointerEvent): void => {
    if (event.pointerId !== this.currentPointerId) return;
    this.currentPointerId = null;

    if (this.pendingPoints.length > 0 && this.ctx) {
      this.drawPoints(this.pendingPoints);
      this.pendingPoints = [];
    }

    this.isDrawing = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    if (this.strokePoints.length === 0) return;

    const cmd: StrokeCommand = {
      id: Math.random().toString(36).slice(2, 10),
      tool: this.tool,
      color: this.brushColor,
      baseWidth: this.baseWidth,
      points: [...this.strokePoints]
    };

    this.commands = this.commands.slice(0, this.cursor);
    this.commands.push(cmd);
    this.cursor = this.commands.length;
    this.strokePoints = [];
  };

  private onPointerCancel = (event: PointerEvent): void => {
    if (event.pointerId !== this.currentPointerId) return;
    this.currentPointerId = null;
    this.isDrawing = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.pendingPoints = [];
    this.strokePoints = [];
    this.replay();
  };

  private rafLoop = (): void => {
    if (!this.isDrawing) return;
    if (this.pendingPoints.length > 0 && this.ctx) {
      this.drawPoints(this.pendingPoints);
      this.pendingPoints = [];
    }
    this.rafId = requestAnimationFrame(this.rafLoop);
  };

  private drawPoints(points: Point[]): void {
    if (!this.ctx || points.length === 0) return;
    this.paintStroke(points);
  }

  private paintStroke(points: Point[]): void {
    if (!this.ctx || points.length === 0) return;

    this.ctx.globalCompositeOperation = this.tool === 'eraser' ? 'destination-out' : 'source-over';
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.brushColor;
    this.ctx.fillStyle = this.brushColor;

    if (points.length === 1) {
      const p = points[0];
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, this.effectiveWidth(p.pressure) / 2, 0, Math.PI * 2);
      this.ctx.fill();
      return;
    }

    this.ctx.beginPath();
    this.ctx.arc(points[0].x, points[0].y, this.effectiveWidth(points[0].pressure) / 2, 0, Math.PI * 2);
    this.ctx.fill();

    for (let i = 1; i < points.length; i++) {
      const from = points[i - 1];
      const to = points[i];
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.lineWidth = this.effectiveWidth(to.pressure);
      this.ctx.stroke();
    }
  }

  private effectiveWidth(pressure: number): number {
    return this.baseWidth * (0.5 + pressure * 0.5);
  }

  private replay(): void {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, w, h);

    const list = this.cursor >= 0 ? this.commands.slice(0, this.cursor) : this.commands;
    for (const cmd of list) {
      this.ctx.globalCompositeOperation = cmd.tool === 'eraser' ? 'destination-out' : 'source-over';
      this.ctx.strokeStyle = cmd.color;
      this.ctx.fillStyle = cmd.color;
      this.paintStroke(cmd.points);
    }
  }

  undo(): void {
    if (this.cursor > 0) {
      this.cursor--;
      this.replay();
    }
  }

  redo(): void {
    if (this.cursor < this.commands.length) {
      this.cursor++;
      this.replay();
    }
  }

  clear(): void {
    this.commands = [];
    this.cursor = 0;
    this.replay();
  }

  get canUndo(): boolean {
    return this.cursor > 0;
  }

  get canRedo(): boolean {
    return this.cursor < this.commands.length;
  }
}
