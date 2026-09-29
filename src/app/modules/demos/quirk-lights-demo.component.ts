import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type Speed = 'slow' | 'normal' | 'fast';
type Variant = 'classic' | 'neon' | 'plus-ultra';
type IlluminationMode = 'cascade' | 'pulse' | 'alternating' | 'wave' | 'random' | 'color-cycle';

const DEFAULT_COLORS: Record<Variant, string[]> = {
  classic: ['#D32F2F', '#00ACC1', '#FFA000', '#C2185B'],
  neon: ['#ff2d78', '#00f0ff', '#00ff88', '#ffe600', '#7a05ff'],
  'plus-ultra': ['#ff0044', '#ff7700', '#ffee00', '#00ffaa', '#00ccff', '#ff00ff'],
};

const CABLE_BASE_Y = 12;
const CABLE_AMPLITUDE = 10;
const CABLE_CYCLES = 2.5;
const BULB_SIZE = 24;
const CASCADE_STEP_SECONDS = 0.15;

@Component({
  selector: 'app-quirk-lights-demo',
  standalone: false,
  templateUrl: './quirk-lights-demo.component.html',
  styleUrl: './quirk-lights-demo.component.scss'
})
export class QuirkLightsDemoComponent implements OnInit, OnDestroy {
  mode: IlluminationMode = 'cascade';
  variant: Variant = 'classic';
  speed: Speed = 'normal';
  density = 5;
  interactive = false;

  bulbs: { color: string; delay: string; marginTop: number; broken: boolean; svg: SafeHtml }[] = [];
  cablePath = '';
  private resizeTimer: any = null;

  constructor(private sanitizer: DomSanitizer) {}

  get colors(): string[] {
    return DEFAULT_COLORS[this.variant];
  }

  get duration(): string {
    return this.speed === 'slow' ? '3s' : this.speed === 'fast' ? '0.8s' : '1.5s';
  }

  ngOnInit(): void {
    this.renderBulbs();
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
  }

  private handleResize = (): void => {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.renderBulbs(), 150);
  };

  private bulbSvg(color: string, index: number): string {
    const uid = `ql${index}`;
    const safeColor = color.replace(/"/g, '&quot;');
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">` +
      `<defs>` +
      `<linearGradient id="${uid}-glass" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0%" stop-color="${safeColor}" stop-opacity="0.12"/>` +
      `<stop offset="45%" stop-color="${safeColor}" stop-opacity="0.75"/>` +
      `<stop offset="100%" stop-color="${safeColor}" stop-opacity="1"/>` +
      `</linearGradient>` +
      `<linearGradient id="${uid}-facet-a" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0%" stop-color="#fff" stop-opacity="0.85"/>` +
      `<stop offset="100%" stop-color="#fff" stop-opacity="0.05"/>` +
      `</linearGradient>` +
      `<linearGradient id="${uid}-facet-b" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0%" stop-color="#000" stop-opacity="0.4"/>` +
      `<stop offset="100%" stop-color="#000" stop-opacity="0.02"/>` +
      `</linearGradient>` +
      `<linearGradient id="${uid}-socket" x1="0" y1="0" x2="1" y2="0">` +
      `<stop offset="0%" stop-color="#0f2b1a"/>` +
      `<stop offset="35%" stop-color="#1A472A"/>` +
      `<stop offset="70%" stop-color="#22633a"/>` +
      `<stop offset="100%" stop-color="#12341f"/>` +
      `</linearGradient>` +
      `</defs>` +
      `<rect x="10" y="0.5" width="4" height="2.1" rx="0.7" fill="#0d2716"/>` +
      `<rect x="7.6" y="2.2" width="8.8" height="4.6" rx="0.9" fill="url(#${uid}-socket)"/>` +
      `<rect x="7.2" y="6.6" width="9.6" height="1.5" rx="0.6" fill="#12341f"/>` +
      `<g fill="url(#${uid}-glass)"><polygon points="12,22 17.4,15.2 15.9,7.4 8.1,7.4 6.6,15.2"/></g>` +
      `<polygon points="7.2,8 16.8,8 14.1,21.4 9.9,21.4" fill="url(#${uid}-facet-a)"/>` +
      `<polygon points="7.6,8 9,8 9.3,20.8 7.2,20.8" fill="url(#${uid}-facet-b)"/>` +
      `<polygon points="16.4,8 15,8 14.7,20.8 16.8,20.8" fill="url(#${uid}-facet-b)"/>` +
      `</svg>`;
  }

  private bulbDelay(index: number, count: number): string {
    const groupCount = this.colors.length;
    switch (this.mode) {
      case 'pulse': return '0s';
      case 'alternating': return `calc(${this.duration} * -${index % 2 === 0 ? 0 : 0.5})`;
      case 'wave': return `calc(${this.duration} * -${count > 1 ? (index / (count - 1)).toFixed(4) : 0})`;
      case 'random': {
        const frac = ((index * 73 + 29) % 97) / 97;
        return `calc(${this.duration} * -${frac.toFixed(4)})`;
      }
      case 'color-cycle': {
        const group = groupCount > 0 ? index % groupCount : 0;
        return `calc(${this.duration} * -${(group / groupCount).toFixed(4)})`;
      }
      case 'cascade':
      default: return `-${(index * CASCADE_STEP_SECONDS).toFixed(2)}s`;
    }
  }

  renderBulbs(): void {
    const width = window.innerWidth || 1024;
    const count = Math.max(1, Math.ceil((width * this.density) / 100));
    const bulbsExtent = Math.max(width, count * BULB_SIZE);

    const points: string[] = [];
    for (let x = 0; x <= width; x += 8) {
      const y = CABLE_BASE_Y + CABLE_AMPLITUDE * Math.sin((2 * Math.PI * CABLE_CYCLES * x) / width);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    this.cablePath = `M${points.join(' L')}`;

    this.bulbs = [];
    for (let i = 0; i < count; i++) {
      let bulbCenterX: number;
      if (count * BULB_SIZE > width) {
        bulbCenterX = BULB_SIZE / 2 + i * BULB_SIZE;
      } else if (count > 1) {
        bulbCenterX = BULB_SIZE / 2 + (i / (count - 1)) * (bulbsExtent - BULB_SIZE);
      } else {
        bulbCenterX = bulbsExtent / 2;
      }
      const cableY = CABLE_BASE_Y + CABLE_AMPLITUDE * Math.sin((2 * Math.PI * CABLE_CYCLES * bulbCenterX) / bulbsExtent);
      const marginTop = Math.max(0, cableY - 1.5);
      const rawSvg = this.bulbSvg(this.colors[i % this.colors.length], i);
      this.bulbs.push({
        color: this.colors[i % this.colors.length],
        delay: this.bulbDelay(i, count),
        marginTop,
        broken: false,
        svg: this.sanitizer.bypassSecurityTrustHtml(rawSvg)
      });
    }
  }

  toggleBulb(index: number): void {
    if (!this.interactive) return;
    this.bulbs[index].broken = !this.bulbs[index].broken;
  }
}
