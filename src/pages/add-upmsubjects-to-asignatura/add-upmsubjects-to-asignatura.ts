import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {FormGroup} from "@angular/forms";
import {PopoverMenuPage} from "../popover-menu/popover-menu";
import {ApiProvider} from "../../providers/api/api";
import {AddProfesoresToAsignaturaPage} from "../add-profesores-to-asignatura/add-profesores-to-asignatura";

/**
 * Generated class for the AddUpmsubjectsToAsignaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-upmsubjects-to-asignatura',
  templateUrl: 'add-upmsubjects-to-asignatura.html',
})
export class AddUpmsubjectsToAsignaturaPage {

  subjectForm: FormGroup;
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
              public popoverCtrl: PopoverController,
              public api: ApiProvider,
              private alertCtrl: AlertController) {

    this.subjectForm = navParams.get('subjectForm');
    console.log(this.subjectForm);
    this.nextYear = parseInt(this.subjectForm.value.year.substring(2, 4))+1;
    this.getSchools();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUpmSubjectsToAsignaturaPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  getSchools() {
    this.api.getSchools().subscribe((value) => {
      this.schools = value;
    })
  }

  getPlans(schoolId: string) {
    this.api.getPlansFromSchoolId(schoolId, this.subjectForm.value.year + this.nextYear).subscribe((value) => {
      this.plans = value;
    })
  };

  getSubjects(planId: string) {
    this.api.getSubjectsFromPlan(planId, this.subjectForm.value.year + this.nextYear).subscribe((value) => {
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

        if (data === undefined){

          let alert2 = this.alertCtrl.create({
            title: 'Incorrecto',
            subTitle: 'Es necesario elegir un semestre.',
            buttons: ['Ok']
          });

          alert2.present();


        } else {
          let sub1: SelectedSubject = new SelectedSubject();
          sub1.subjectId = subject.codigo;
          sub1.year = this.subjectForm.value.year + "-" +this.nextYear;
          sub1.planId = planId;
          sub1.semester = data;
          sub1.subjectName = subject.nombre;

          console.log(sub1);

          if (this.selectedSubjects.indexOf(sub1) > -1) {
            this.selectedSubjects.splice(this.selectedSubjects.indexOf(sub1), 1)
          } else {
            this.selectedSubjects.push(sub1);
          }

          console.log(this.selectedSubjects);
        }

      }
    });

    alert.present();
  }

  sendSubjects(){
    this.subjectForm.value.upmSubjects = this.selectedSubjects;
    if(this.subjectForm.valid) {
      this.navCtrl.push(AddProfesoresToAsignaturaPage, {
        subjectForm: this.subjectForm
      });
    }
  }

}

class SelectedSubject {
  subjectName: any;
  subjectId: any;
  year: any;
  semester: any;
  planId: any;
}
