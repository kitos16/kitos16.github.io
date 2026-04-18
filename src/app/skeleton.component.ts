import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: false,
  template: `
    <div class="skeleton" [class.circle]="circle" [style.width]="width" [style.height]="height">
    </div>
  `,
  styles: [`
    .skeleton {
      background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-alt-color) 50%, var(--bg-secondary) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
    }
    .skeleton.circle {
      border-radius: 50%;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '20px';
  @Input() circle = false;
}