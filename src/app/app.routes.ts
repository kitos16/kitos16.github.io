import { Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ProjectsComponent } from './projects.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  // Ruta comodín para redirigir al inicio en caso de URLs no encontradas
  { path: '**', redirectTo: '' }
];