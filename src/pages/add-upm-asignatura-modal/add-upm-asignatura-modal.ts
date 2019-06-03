import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AddProfesoresToAsignaturaPage} from "../add-profesores-to-asignatura/add-profesores-to-asignatura";

/**
 * Generated class for the AddUpmAsignaturaModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-upm-asignatura-modal',
  templateUrl: 'add-upm-asignatura-modal.html',
})
export class AddUpmAsignaturaModalPage {

  subject: any;
  schools: Array<any> = [];
  plans: Array<any> = [];
  subjects: any = null;
  searchSubjects: any;

  selectedSchool: any = null;
  selectedPlan: any = null;

  selectedSubjects: Array<any> = [];
  nextYear: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private alertCtrl: AlertController,
              private viewCtrl: ViewController) {

    this.subject = navParams.get('subject');
    console.log(this.subject);
    this.nextYear = parseInt(this.subject.year.substring(2, 4)) + 1;
    this.getSchools();


  }

  getSchools() {
    this.api.getSchools().subscribe((value) => {
      this.schools = value;
    })
  }

  getPlans(schoolId: string) {
    this.api.getPlansFromSchoolId(schoolId, this.subject.year + this.nextYear).subscribe((value) => {
      this.plans = value;
    })
  };

  getSubjects(planId: string) {
    this.api.getSubjectsFromPlan(planId, this.subject.year + this.nextYear).subscribe((value) => {
      this.subjects = value;
      this.searchSubjects = value;
    })
  };

  schoolSelectedEventOption(): void {
    this.getPlans(this.selectedSchool);
  }

  planSelectedEventOption(): void {
    this.getSubjects(this.selectedPlan);
  }

  filterItems(ev: any) {
    this.subjects = this.searchSubjects;
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.subjects = this.subjects.filter(function (item) {
        return item.nombre.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  addSelectedSubject(subject: any, planId: any) {

    let alert = this.alertCtrl.create();
    alert.setTitle('Seleccione semestre para ' + subject.nombre);

    for (let semester of Object.keys(subject.imparticion)) {
      alert.addInput({
        type: 'radio',
        label: semester,
        value: semester,
      });
    }


    alert.addButton({
      text: "Cancelar",
      handler: () => {
        console.log('Cancel clicked');
      }
    });

    alert.addButton({
      text: 'Seleccionar',
      handler: (data: any) => {

        if (data === undefined) {
          let alert2 = this.alertCtrl.create({
            title: 'Incorrecto',
            subTitle: 'Es necesario elegir un semestre.',
            buttons: ['Ok']
          });

          alert2.present();

        } else {
          let sub1: SelectedSubject = new SelectedSubject();
          sub1.subjectId = subject.codigo;
          sub1.year = this.subject.year + "-" + this.nextYear;
          sub1.planId = planId;
          sub1.semester = data;
          sub1.subjectName = subject.nombre;

          console.log(sub1);
          this.sendSubjects(sub1);

        }

      }
    });

    alert.present();
  }


  sendSubjects(subject: SelectedSubject) {
    let sub: SubjectToSend = new SubjectToSend();
    sub.id.subjectId = subject.subjectId;
    sub.id.year = subject.year;
    sub.id.semester = subject.semester;
    sub.name = subject.subjectName;

    this.api.postUPMSubjectToSubject(sub).subscribe((value) => {
      console.log("UPM SUBJECT POSTED");
      console.log(value);
      delete value._links;
      this.api.postBindUPMSubjectToSubject(this.subject.id, value).subscribe(() => {
        this.closeModal();
      });
    })

  }

  closeModal() {
    this.viewCtrl.dismiss()
  }


}

class SubjectToSend {
  name: String;
  id: subjectId = new subjectId();

}

class subjectId {
  subjectId: String;
  semester: String;
  year: String;
}

class SelectedSubject {
  subjectName: any;
  subjectId: any;
  year: any;
  semester: any;
  planId: any;
}
