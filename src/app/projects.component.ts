import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  // Mock de datos, puedes conectar esto a un servicio real o JSON si lo prefieres.
  projects = [
    { title: 'E-commerce App', description: 'Plataforma de ventas con carrito de compras construida con Angular y Firebase.', link: '#' },
    { title: 'API RESTful', description: 'Backend robusto construido con Node.js, Express y MongoDB.', link: '#' },
    { title: 'Dashboard Analytics', description: 'Panel interactivo para visualización de datos usando D3.js y Angular.', link: '#' },
  ];
}