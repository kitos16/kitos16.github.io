import { Routes } from '@angular/router';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { QuirkLightsDemoComponent } from './modules/demos/quirk-lights-demo.component';
import { CalendulumDemoComponent } from './modules/demos/calendulum-demo.component';
import { GearSketchDemoComponent } from './modules/demos/gear-sketch-demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'demo/quirk-lights', component: QuirkLightsDemoComponent },
  { path: 'demo/calendulum', component: CalendulumDemoComponent },
  { path: 'demo/gear-sketch', component: GearSketchDemoComponent },
  { path: '**', redirectTo: '' }
];