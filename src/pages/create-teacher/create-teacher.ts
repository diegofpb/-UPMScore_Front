import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverMenuPage} from "../popover-menu/popover-menu";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the CreateTeacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-teacher',
  templateUrl: 'create-teacher.html',
})
export class CreateTeacherPage {

  teacherForm: any = FormGroup;
  formErrors: any = {
    'name': [],
    'surname': [''],
    'email': [],
    'phoneNumber': [],
    'room': []
  };

  validationMessages: any = {
    'name': {
      'required': 'El nombre es obligatorio.',
    },
    'surname': {
      'required': 'Los appelidos son obligatorio.',
    },
    'email': {
      'required': 'El email es obligatorio.',
    },
    'phoneNumber': {
      'required': 'El número de teléfono es obligatorio.',
    },
    'room': {
      'required': 'El despacho es obligatorio.',
    }
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public popoverCtrl: PopoverController,
              public api: ApiProvider) {

    // Setup the form
    this.teacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['', Validators.required],
      room: [''],
      role: ['TEACHER']

    });

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
      if (control && (control.dirty || !checkDirty) &&!control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  createTeacher(){
    if(this.teacherForm.valid) {
      this.api.postTeacherToSystem(this.teacherForm.value).subscribe((value) => {
        console.log(value);
        this.navCtrl.pop();
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTeacherPage');
  }

}
