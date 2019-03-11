import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConstantsProvider} from "../../providers/constants/constants";

/**
 * Generated class for the CreateAssingmentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-assingment-modal',
  templateUrl: 'create-assingment-modal.html',
})
export class CreateAssingmentModalPage {

  assingmentForm: any = FormGroup;
  formErrors: any = {
    'minimumGrade': [],
    'name': []
  };

  validationMessages: any = {
    'minimumGrade': {
      'required': 'La nota mínima de la evaluación es obligatoria.',
    },
    'name': {
      'required': 'El nombre de la evaluación es obligatorio.',
    },
    'weight': {
      'required': 'El peso de la tarea es obligatorio.',
    },
    'numberOfParticipants': {
      'required': 'El numero de participantes es obligatorio.',
    }
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private api: ApiProvider,
              private formBuilder: FormBuilder,
              private constants: ConstantsProvider) {

    this.assingmentForm = this.formBuilder.group({
      minimumGrade: ['', Validators.required],
      name: ['', Validators.required],
      weight: ['', Validators.required],
      numberOfParticipants: ['', Validators.required],
      evaluation: [this.constants.HOST + this.constants.EVALUATIONS + '/' + navParams.get('evaluationId')]
    });

    console.log(navParams.get('evaluationId'));

    this.assingmentForm.valueChanges.subscribe(() => this.onValueChanged());

  }

  onValueChanged() {
    if (!this.assingmentForm) {
      return;
    }
    this.checkErrors(true);
  }

  private checkErrors(checkDirty: boolean) {
    const form = this.assingmentForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.assingmentForm[field] = '';
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
    console.log('ionViewDidLoad CreateAssingmentModalPage');
  }

  createAssingment() {
    if (this.assingmentForm.valid) {
      this.api.postAssingmentOfEvaluation(this.assingmentForm.value).subscribe((value) => {
        console.log(value);
      });
    }

    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss()
  }
}
