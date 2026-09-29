import { Component } from '@angular/core';

interface Skill {
  name: string;
  level: number;
}

interface Experience {
  title: string;
  period: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  description = `Ingeniero de Software con 6 años de experiencia en desarrollo fullstack, especializado en Angular, Go, React y Node.js. Graduado como Ingeniero en Computación con Maestría en Inteligencia Artificial, combino fundamentos sólidos de ingeniería con una visión aplicada de la IA moderna.

Mi experiencia abarca el ciclo completo de desarrollo: desde la construcción de interfaces de usuario escalables y APIs robustas, hasta la administración de bases de datos y prácticas de DevOps. Actualmente me especializo en la orquestación de agentes de IA y programación agéntica, diseñando sistemas donde modelos de lenguaje y herramientas autónomas colaboran para resolver problemas complejos.

Me apasiona mantener un aprendizaje continuo, aplicar buenas prácticas de ingeniería y construir software que sea tanto funcional como mantenible.`;

  skills: Skill[] = [
    { name: 'Angular / TypeScript', level: 90 },
    { name: 'Go', level: 85 },
    { name: 'React', level: 80 },
    { name: 'Node.js', level: 85 },
    { name: 'Bases de Datos', level: 80 },
    { name: 'DevOps / CI/CD', level: 70 },
    { name: 'Agentes de IA / Programación Agéntica', level: 75 }
  ];

  experiences: Experience[] = [
    {
      title: 'Ingeniero de Software',
      period: '2023 - Presente',
      description: 'Desarrollo fullstack con Angular, Go, React y Node.js. Diseño de APIs robustas, administración de bases de datos y prácticas de DevOps. Especialización actual en orquestación de agentes de IA y programación agéntica.'
    },
    {
      title: 'Ingeniero de Software Jr.',
      period: '2021 - 2023',
      description: 'Desarrollo web con JavaScript y Node.js. Colaboración en equipos ágiles, control de versiones y despliegues continuos.'
    }
  ];
}