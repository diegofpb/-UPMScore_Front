import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../providers/api/api";
import {PopoverMenuPage} from "../popover-menu/popover-menu";


/**
 * Generated class for the EditProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profesor',
  templateUrl: 'edit-profesor.html',
})
export class EditProfesorPage {

  teacher: any;

  teacherForm: any = FormGroup;
  formErrors: any = {
    'name': [],
    'surname': [],
    'email': [],
    'phoneNumber': [],
    'room': []
  };

  validationMessages: any = {
    'name': {
      'required': 'El nombre es obligatorio.',
    },
    'surname': {
      'required': 'El apellido es obligatorio.',
    },
    'email': {
      'required': 'El email es obligatorio.',
    },
    'enabled': {
      'required': 'La activacion es obligatoria.',
    },
    'phoneNumber': {
      'required': 'El telefono.',
    },
    'room': {
      'required': 'El despacho es obligatorio.',
    }
  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              private formBuilder: FormBuilder,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController
  ) {

    this.teacher = navParams.get('teacher');

    // Setup the form
    this.teacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      room: ['', Validators.required],
      enabled: ['', ''],

    });

    if (this.teacher != null) {
      this.api.getTeacher(this.teacher.id).subscribe((value) => {
        this.teacher = value;
        this.teacherForm.get("name").setValue(this.teacher.name);
        this.teacherForm.get("surname").setValue(this.teacher.surname);
        this.teacherForm.get("email").setValue(this.teacher.email);
        this.teacherForm.get("phoneNumber").setValue(this.teacher.phoneNumber);
        this.teacherForm.get("room").setValue(this.teacher.room);
        this.teacherForm.get("enabled").setValue(this.teacher.enabled);
      });
    }

    this.teacherForm.valueChanges.subscribe(() => this.onValueChanged());

  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  onValueChanged() {
    if (!this.teacherForm) {
      return;
    }
    this.checkErrors(true);
  }

  private checkErrors(checkDirty: boolean) {
    const form = this.teacherForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.teacherForm[field] = '';
      const control = form.get(field);
      if (control && (control.dirty || !checkDirty) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfesorPage');
  }

  presentDeleteTeacherModal() {
    const confirm = this.alertCtrl.create({
      title: '¿Estás seguro que deseas eliminarlo?',
      message: 'Estás a punto de borrar a ' + this.teacher.name + ' ' + this.teacher.surname +
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
            this.api.deleteTeacher(this.teacher.id).subscribe(() => {
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


  modifyTeacher() {
    this.teacher.name = this.teacherForm.get('name').value;
    this.teacher.surname = this.teacherForm.get("surname").value;
    this.teacher.email = this.teacherForm.get("email").value;
    this.teacher.phoneNumber = this.teacherForm.get("phoneNumber").value;
    this.teacher.room = this.teacherForm.get("room").value;
    this.teacher.enabled = this.teacherForm.get("enabled").value;
    console.log(this.teacher);

    this.api.postTeacherToSystem(this.teacher).subscribe((value) => {
      console.log(value);
      this.navCtrl.pop();
    });

  }
}
