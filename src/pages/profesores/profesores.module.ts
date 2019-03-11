import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesoresPage } from './profesores';

@NgModule({
  declarations: [
    ProfesoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesoresPage),
  ],
})
export class ProfesoresPageModule {}
