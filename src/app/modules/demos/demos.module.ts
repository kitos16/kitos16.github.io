import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuirkLightsDemoComponent } from './quirk-lights-demo.component';
import { CalendulumDemoComponent } from './calendulum-demo.component';
import { GearSketchDemoComponent } from './gear-sketch-demo.component';

@NgModule({
  declarations: [
    QuirkLightsDemoComponent,
    CalendulumDemoComponent,
    GearSketchDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class DemosModule {}
