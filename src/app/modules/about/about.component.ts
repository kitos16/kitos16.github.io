import { Component } from '@angular/core';

interface Skill {
  name: string;
  level: number;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Social {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  skills: Skill[] = [
    { name: 'Angular / TypeScript', level: 90 },
    { name: 'HTML5 / CSS3 / SASS', level: 85 },
    { name: 'Node.js / Express', level: 80 },
    { name: 'Git / GitHub', level: 85 },
    { name: 'JavaScript', level: 88 },
    { name: 'React', level: 70 }
  ];

  experiences: Experience[] = [
    {
      title: 'Desarrollador Frontend',
      company: 'Tech Company',
      period: '2022 - Presente',
      description: 'Desarrollo de aplicaciones web con Angular y React. Colaboración en equipos ágiles.'
    },
    {
      title: 'Desarrollador Full Stack',
      company: 'Startup Digital',
      period: '2020 - 2022',
      description: 'Creación de APIs REST y interfaces responsivas. Implementación de CI/CD.'
    },
    {
      title: 'Desarrollador Junior',
      company: 'Agencia Web',
      period: '2018 - 2020',
      description: 'Mantenimiento de sitios web y aplicaciones móviles híbridas.'
    }
  ];

  socialLinks: Social[] = [
    { name: 'GitHub', url: 'https://github.com/kitos16', icon: 'GH' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/kitos16', icon: 'LI' },
    { name: 'Twitter', url: 'https://twitter.com/kitos16', icon: 'TW' }
  ];
}