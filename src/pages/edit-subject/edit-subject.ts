import {Component} from '@angular/core';
import {
  AlertController,
  FabContainer,
  IonicPage,
  ModalController,
  ModalOptions,
  NavController,
  NavParams,
  PopoverController, ToastController
} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverMenuPage} from "../popover-menu/popover-menu";
import {EditStudentsModalPage} from "../edit-students-modal/edit-students-modal";
import {AddUpmAsignaturaModalPage} from "../add-upm-asignatura-modal/add-upm-asignatura-modal";

/**
 * Generated class for the EditSubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-subject',
  templateUrl: 'edit-subject.html',
})
export class EditSubjectPage {

  subject: any;
  appType = 'Info';
  links: any;

  evaluations: any;
  teachers: any;
  upmSubjects: any;

  subjectForm: any = FormGroup;
  formErrors: any = {
    'name': [],
    'course': [''],
    'semester': [],
    'year': [],
    'upmSubjects': []
  };

  validationMessages: any = {
    'name': {
      'required': 'El nombre es obligatorio.',
    },
    'course': {
      'required': 'El curso es obligatorio.',
    },
    'semester': {
      'required': 'El semestre es obligatorio.',
    },
    'year': {
      'required': 'El año académico es obligatorio.',
    }
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              public formBuilder: FormBuilder,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController
  ) {

    this.subject = navParams.get('asignatura');
    console.log(this.subject);

    // Setup the form
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      semester: ['', Validators.required],
      year: ['', Validators.required],
      upmSubjects: [''],

    });

    if (this.subject != null) {
      this.api.getSubject(this.subject.id).subscribe((value) => {
        this.subject = value;
        this.subjectForm.get("name").setValue(this.subject.name);
        this.subjectForm.get("course").setValue(this.subject.course);
        this.subjectForm.get("semester").setValue(this.subject.semester);
        this.subjectForm.get("year").setValue(this.subject.year);

        this.links = this.subject._links;

        this.api.getTeachersFromSubject(this.subject.id).subscribe((value) => {
          this.teachers = value._embedded.teachers;
          console.log(this.teachers);
        });

        this.api.getUPMSubjectsFromSubject(this.subject.id).subscribe((value) => {
          this.upmSubjects = value._embedded.uPMSubjects;
          console.log(this.upmSubjects);

        });

      });
    }

    this.subjectForm.valueChanges.subscribe(() => this.onValueChanged());


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubjectPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  onValueChanged() {
    if (!this.subjectForm) {
      return;
    }
    this.checkErrors(true);
  }

  private checkErrors(checkDirty: boolean) {
    const form = this.subjectForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.subjectForm[field] = '';
      const control = form.get(field);
      if (control && (control.dirty || !checkDirty) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }


  saveSubject() {

  }


  updateSubject() {

  }

  deleteTeacherFromSubject(id: any) {
    this.api.deleteTeacherFromSubject(id, this.subject.id).subscribe((value) => {
      console.log(value);
      this.api.getTeachersFromSubject(this.subject.id).subscribe((value) => {
        this.teachers = value._embedded.teachers;
        console.log(this.teachers);
      });
    });

  }

  deleteUPMSubjectFromSubject(upmSubject: any) {
    //UPMSubjectPK(subjectId=105000012,%20semester=2S,%20year=2018-19)
    this.api.deleteUpmSubjectFromSubject("UPMSubjectPK(subjectId=" + upmSubject.subjectId + ",%20semester=" + upmSubject.semester + ",%20year=" + upmSubject.year + ")", this.subject.id).subscribe((value) => {
      console.log(value);
      this.api.getUPMSubjectsFromSubject(this.subject.id).subscribe((value) => {
        this.upmSubjects = value._embedded.uPMSubjects;
        console.log(this.upmSubjects);
      });
    });


  }


  showStudents(subject: FabContainer) {

    const createModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };

    const createModal =
      this.modalCtrl.create(EditStudentsModalPage, {subject: subject}, createModalOptions);

    createModal.present();
  }


  presentDeleteSubjectModal() {
    const confirm = this.alertCtrl.create({
      title: '¿Estás seguro que deseas eliminarlo?',
      message: 'Estás a punto de borrar ' + this.subject.name +
        ' del sistema. Esta acción no se puede deshacer.\n ¿Estás seguro que deseas hacerlo?',
      buttons: [
        {
          text: 'No, cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sí, eliminar',
          handler: () => {
            console.log('Agree clicked');
            this.api.deleteSubject(this.subject.id).subscribe(() => {
              this.navCtrl.pop();
            }, (error) => {
              let toast = this.toastCtrl.create({
                duration: 8000,
                position: 'top',
                cssClass: "toast-class"
              });
              if (error.status === 500) {
                toast.setMessage("Error en el servidor (500) ⚠️")
              }
              console.log(error);
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }


  addUPMSubjectToSubject() {
    const createModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };

    const createModal =
      this.modalCtrl.create(AddUpmAsignaturaModalPage, {subject: this.subject}, createModalOptions);

    createModal.onDidDismiss(data => {
      this.api.getUPMSubjectsFromSubject(this.subject.id).subscribe((value) => {
        this.upmSubjects = value._embedded.uPMSubjects;
        console.log(this.upmSubjects);
      });
    });
    createModal.present();
  }
}
