import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConstantsProvider} from "../../providers/constants/constants";

/**
 * Generated class for the CreateEvaluationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-evaluation-modal',
  templateUrl: 'create-evaluation-modal.html',
})
export class CreateEvaluationModalPage {

  subject: any;
  createdEvaluation: any;

  evaluationForm: any = FormGroup;
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
    }
  };

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private api: ApiProvider,
              private formBuilder: FormBuilder,
              private constants: ConstantsProvider
  ) {

    this.evaluationForm = this.formBuilder.group({
      minimumGrade: ['', Validators.required],
      name: ['', Validators.required],
      formula: [''],
      subject: [this.constants.HOST + this.constants.SUBJECTS + '/' + navParams.get('subjectId')]
    });

    this.evaluationForm.valueChanges.subscribe(() => this.onValueChanged());


  }

  onValueChanged() {
    if (!this.evaluationForm) {
      return;
    }
    this.checkErrors(true);
  }

  private checkErrors(checkDirty: boolean) {
    const form = this.evaluationForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.evaluationForm[field] = '';
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
    console.log('ionViewDidLoad CreateEvaluationModalPage');
  }

  createEvaluation() {
    console.log("enviando formulario");
    if (this.evaluationForm.valid) {
      console.log("formulario correcto");
      this.api.postEvaluationOfSubject(this.evaluationForm.value).subscribe((value) => {
        console.log(value);
      });
    }

    this.viewCtrl.dismiss(this.createdEvaluation);
  }

  closeModal() {
    this.viewCtrl.dismiss()
  }
}
