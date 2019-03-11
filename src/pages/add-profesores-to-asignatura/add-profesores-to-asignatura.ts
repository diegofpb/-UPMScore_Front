import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {FormGroup} from "@angular/forms";
import {HttpClientProvider} from "../../providers/client-http/clientHttp";
import {PopoverMenuPage} from "../popover-menu/popover-menu";
import {ApiProvider} from "../../providers/api/api";
import {AddEvaluationsToAsignaturaPage} from "../add-evaluations-to-asignatura/add-evaluations-to-asignatura";
import {CreateTeacherPage} from "../create-teacher/create-teacher";

/**
 * Generated class for the AddProfesoresToAsignaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-profesores-to-asignatura',
  templateUrl: 'add-profesores-to-asignatura.html',
})
export class AddProfesoresToAsignaturaPage {

  subjectId: any;
  subjectName: any;
  teachersSuggested: Array<any> = [];
  teachersSuggestedInSystem: Array<any> = [];
  teachersSelected: Array<any> = [];
  allTeachersInSystem: Array<any> = [];

  subjectForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public client: HttpClientProvider,
              public popoverCtrl: PopoverController,
              public api: ApiProvider) {

    this.subjectForm = navParams.get('subjectForm');
    this.getTeachersOfSelectedSubject();
  }

  // TODO REVISAR POR POSIBLES ERRORES EN APIS Y DAR FALLOS.

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  getAllTeachersInSystem() {
    this.api.getAllTeachersInSystem().subscribe((value) => {
      console.log(value);
      this.allTeachersInSystem = value._embedded.teachers;
    })
  }

  // Funcion para obtener profesores de las asignaturas.
  getTeachersOfSelectedSubject() {
    let json = JSON.stringify(this.subjectForm.value);
    this.api.postSubjectToSystem(json).subscribe((value) => {
      console.log(value);
      this.subjectId = value.subjectId;
      this.subjectName = value.name;
      this.teachersSuggested = value.teachersSuggested;
      this.teachersSuggestedInSystem = value.teachersInSystem;
      this.allTeachersInSystem = value.teachersInSystem;
    })
  }

  searchForTeacher(name: any) {
    console.log("nombre es");
    console.log(name);
    if (name !== "" && name !== null){
      this.api.searchForTeachersNamed(name).subscribe((value) => {
        console.log(value);
        this.allTeachersInSystem = value._embedded.teachers;
      });
    } else {
      this.allTeachersInSystem = this.teachersSuggestedInSystem;
    }

    console.log("All: "); console.log(this.allTeachersInSystem);
    console.log("Sugg: "); console.log(this.teachersSuggestedInSystem);


  }

  filterItems(ev: any) {
    this.api.searchForTeachersNamed(ev.srcElement.value).subscribe((value) => {
      this.allTeachersInSystem = value._embedded.teachers;
      console.log(this.allTeachersInSystem);
      let val = ev.target.value;
      if (val && val.trim() !== '') {
        this.allTeachersInSystem = this.allTeachersInSystem.filter(function (item) {
          return item.name.toLowerCase().includes(val.toLowerCase());
        });
      }
    });
  }

  addSelectedTeacher(teacher: any) {
    if (this.teachersSelected.indexOf(teacher) > -1) {
      this.teachersSelected.splice(this.teachersSelected.indexOf(teacher), 1)
    } else {
      this.teachersSelected.push(teacher);
    }
  }

  sendTeachers(teachersSelected: any) {
    if (this.teachersSelected.length !== 0) {
      console.log(this.teachersSelected);
      this.api.postTeachersForSubject(teachersSelected, this.subjectId).subscribe((value) => {
        console.log(value);
        this.navCtrl.push(AddEvaluationsToAsignaturaPage, {
          subjectForm: this.subjectForm,
          subjectId: this.subjectId
        });
      });
    }
  }


  presentCreateTeacherModal() {
    this.navCtrl.push(CreateTeacherPage);
  }
}
