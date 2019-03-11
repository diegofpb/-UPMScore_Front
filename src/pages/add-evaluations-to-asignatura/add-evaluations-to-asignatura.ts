import {Component} from '@angular/core';
import {
  AlertController,
  FabContainer,
  IonicPage,
  ModalController,
  ModalOptions,
  NavController,
  NavParams,
  PopoverController,
  ToastController
} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {CreateEvaluationModalPage} from "../create-evaluation-modal/create-evaluation-modal";
import {PopoverMenuPage} from "../popover-menu/popover-menu";
import {CreateAssingmentModalPage} from "../create-assingment-modal/create-assingment-modal";

/**
 * Generated class for the AddEvaluationsToAsignaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-evaluations-to-asignatura',
  templateUrl: 'add-evaluations-to-asignatura.html',
})
export class AddEvaluationsToAsignaturaPage {

  evaluations: Array<any> = [];
  assingments: Array<any> = [];
  selectedEvaluation: any = null;
  subjectId: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              public popoverCtrl: PopoverController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.subjectId = this.navParams.get('subjectId');

    console.log("SubjectID: " + this.subjectId);

    if(this.subjectId == null || this.subjectId === ""){
      this.navCtrl.pop();
      this.toastCtrl.create({
        message: 'ID de asignatura no válido⛔️',
        duration: 8000,
        position: 'top',
        cssClass: "toast-class"
      }).present();
    } else {
      console.log("Obteniendo evaluaciones: " + this.subjectId);

      this.getEvaluationsOfSubject(this.subjectId);
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  getEvaluationsOfSubject(subjectId: String) {
    this.api.getEvaluationsFromSubject(subjectId).subscribe((value) => {
      console.log(value);
      this.evaluations = value._embedded.evaluations;
    });
  }

  getAssingmentsOfEvaluation(evaluation: any){
    this.selectedEvaluation = evaluation;
    this.api.getAssingmentsFromEvaluation(evaluation.id).subscribe((value) => {
      console.log(value);
      this.assingments = value._embedded.assingments;
    });
  }

  deleteEvaluationOfSubject(evaluation: any){
    //TODO ELIMINAR EVALUACION DE UNA ASIGNATURA.
    const confirm = this.alertCtrl.create({
      title: '¿Estás seguro que deseas eliminarlo?',
      message: 'Estás a punto de borrar la evaluacion ' + evaluation.name +
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
          }
        }
      ]
    });
    confirm.present();
  }

  importEvaluation(fab: FabContainer){
    this.toastCtrl.create({
      message: 'Esta opción no está disponible por el momento.⛔️',
      duration: 8000,
      position: 'top',
      cssClass: "toast-class"
    }).present();
    fab.close();
  }

  createEvaluation(fab: FabContainer){

    if(fab !== null){
      fab.close();
    }

    const createModalOptions: ModalOptions = {
      enableBackdropDismiss : true
    };

    const createModal =
      this.modalCtrl.create(CreateEvaluationModalPage,{ subjectId: this.subjectId },createModalOptions);

    createModal.present();

    createModal.onDidDismiss((evaluation) => {
      console.log(evaluation);
      this.getEvaluationsOfSubject(this.subjectId);
    })

  }

  editFormula(evaluation: any) {
    
  }

  createAssingmentForEvaluation(selectedEvaluation: any) {
    const createModalOptions: ModalOptions = {
      enableBackdropDismiss : true
    };

    const createModal =
      this.modalCtrl.create(CreateAssingmentModalPage,{ evaluation: selectedEvaluation, evaluationId: selectedEvaluation.id },createModalOptions);

    createModal.present();

    createModal.onDidDismiss((assingment) => {
      console.log(assingment);
    })
  }

  deleteAssingment(assingment: any) {
    
  }

  editAssingment(assingment: any) {
    
  }
}
