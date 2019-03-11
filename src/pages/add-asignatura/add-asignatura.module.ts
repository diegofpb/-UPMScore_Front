import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAsignaturaPage } from './add-asignatura';

@NgModule({
  declarations: [
    AddAsignaturaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAsignaturaPage),
  ],
})
export class AddAsignaturaPageModule {}
