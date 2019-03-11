import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProfesoresToAsignaturaPage } from './add-profesores-to-asignatura';

@NgModule({
  declarations: [
    AddProfesoresToAsignaturaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProfesoresToAsignaturaPage),
  ],
})
export class AddProfesoresToAsignaturaPageModule {}
