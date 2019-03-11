import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTeacherPage } from './create-teacher';

@NgModule({
  declarations: [
    CreateTeacherPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTeacherPage),
  ],
})
export class CreateTeacherPageModule {}
