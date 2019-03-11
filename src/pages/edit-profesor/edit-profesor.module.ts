import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfesorPage } from './edit-profesor';

@NgModule({
  declarations: [
    EditProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfesorPage),
  ],
})
export class EditProfesorPageModule {}
