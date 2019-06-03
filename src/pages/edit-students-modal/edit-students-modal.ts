import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the EditStudentsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-students-modal',
  templateUrl: 'edit-students-modal.html',
})
export class EditStudentsModalPage {

  validationMessages: any = {
    'apoloFile': {
      'required': 'El CSV es obligatorio.'
    }
  };


  subject: any = undefined;
  apoloFile: File;
  apoloFileName: string = 'Seleccionar CSV';
  apoloFileSrc: any;


  fileForm: any;
  formErrors: any = {
    'apoloFile': []
  };


  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public navParams: NavParams) {

    this.subject = navParams.get('subject');

    this.fileForm = this.formBuilder.group({
      apoloFile: ['', Validators.required],
    });

    this.apoloFileSrc = '';


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStudentsModalPage');
  }

  onChangeFile(data: any) {
    if (data.files && data.files[0]) {
      let file = data.files[0];

      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.apoloFileSrc = event.target.result;
      };
      reader.readAsDataURL(file);

      this.fileForm.controls['apoloFile'].setValue(file);
      this.apoloFile = file;
      this.apoloFileName = file.name;
    }
  }

  onValueChanged(data?: any) {
    var data = data;
    if (!this.fileForm) {
      return;
    }
    this.checkErrors(true);
  }

  private checkErrors(checkDirty: boolean) {
    const form = this.fileForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.fileForm[field] = '';
      const control = form.get(field);
      if (control && (control.dirty || !checkDirty) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }




}
