import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddUpmsubjectsToAsignaturaPage} from "../add-upmsubjects-to-asignatura/add-upmsubjects-to-asignatura";
import {PopoverMenuPage} from "../popover-menu/popover-menu";

/**
 * Generated class for the AddAsignaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-asignatura',
  templateUrl: 'add-asignatura.html',
})
export class AddAsignaturaPage {


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
              private formBuilder: FormBuilder,
              public popoverCtrl: PopoverController
  ) {

    // Setup the form
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      course: ['',Validators.required],
      semester: ['',Validators.required],
      year: ['', Validators.required],
      upmSubjects: [''],

    });

    this.subjectForm.valueChanges.subscribe(() => this.onValueChanged());

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
      if (control && (control.dirty || !checkDirty) &&!control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  createSubject(){
    if(this.subjectForm.valid) {
      this.navCtrl.push(AddUpmsubjectsToAsignaturaPage, {
        subjectForm: this.subjectForm
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAsignaturaPage');
  }

}
