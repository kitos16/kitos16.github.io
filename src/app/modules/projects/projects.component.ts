import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [
    {
      title: 'quirk-lights',
      description: 'Holiday lights overlay with SVG bulbs on a sinusoidal cable. Illumination modes, variants, speed and density control.',
      features: [
        'Monorepo with packages for core, React, Angular, and Vanilla JS',
        'Agnostic CSS styles, SVGs, and DOM logic via @quirk-lights/core',
        'React component adapter via @quirk-lights/react',
        'Angular standalone component adapter for Angular 16+ via @quirk-lights/angular',
        'Web Component (Custom Element) via @quirk-lights/vanilla',
        'Managed with pnpm workspaces and Turborepo'
      ],
      link: 'https://github.com/kitos16/quirk-lights',
      demo: '/demo/quirk-lights',
      image: 'quirk-lights.png'
    },
    {
      title: 'calendulum',
      description: 'A reusable, customizable calendar suite for modern Angular (17+). Standalone components, signals, SCSS theming, zero external runtime dependencies.',
      features: [
        'Angular 17+ standalone calendar components',
        'Signals-based state management',
        'SCSS theming without external dependencies',
        'Zero runtime dependencies',
        'CalendulumMonth view already working',
        'Roadmap includes week/month/day views, date/range pickers, agenda, drag & drop, i18n'
      ],
      link: 'https://github.com/kitos16/calendulum',
      demo: '/demo/calendulum',
      image: 'calendulum.png'
    },
    {
      title: 'gear-sketch',
      description: 'Canvas drawing app with pressure-sensitive strokes, brush/eraser tools, and undo/redo history.',
      features: [
        'Gear protocol sketch generation',
        'CoffeeScript and TypeScript examples',
        'Integration with Gear protocol development workflow',
        'Sandbox for testing gear sketches'
      ],
      link: 'https://github.com/kitos16/gear-sketch',
      demo: '/demo/gear-sketch',
      image: 'gear-sketch.png'
    }
  ];
}