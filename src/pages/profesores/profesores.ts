import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {PopoverMenuPage} from "../popover-menu/popover-menu";
import {CreateTeacherPage} from "../create-teacher/create-teacher";
import {EditProfesorPage} from "../edit-profesor/edit-profesor";

/**
 * Generated class for the ProfesoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profesores',
  templateUrl: 'profesores.html',
})
export class ProfesoresPage {

  profesoresShow : Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public api: ApiProvider) {


  }

  ionViewDidEnter() {
    console.log("[PROFESORES] UPDATING... ♻️")
    this.getTeachers()
  }

  ionViewDidLoad() {
    console.log('[PROFESORES] LOADED  👌');
  }

  getTeachers(){
    this.api.getAllTeachersInSystem().subscribe((value) => {
      this.profesoresShow = value._embedded.teachers;
      console.log(value);
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }


  filterItems(ev: any) {
    this.api.searchForTeachersNamed(ev.srcElement.value).subscribe((value) => {
      this.profesoresShow = value._embedded.teachers;
      let val = ev.target.value;
      if (val && val.trim() !== '') {
        this.profesoresShow = this.profesoresShow.filter(function (teacher) {
          return teacher.name.toLowerCase().includes(val.toLowerCase());
        });
      }
    });
  }

  addTeacher(){
    this.navCtrl.canGoBack();
    this.navCtrl.push(CreateTeacherPage)
  }

  editTeacher(teacher:any){
    this.navCtrl.push(EditProfesorPage,{teacher: teacher})
  }

}
