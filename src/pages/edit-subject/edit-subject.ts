import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider) {

    this.subject = navParams.get('asignatura');
    console.log(this.subject);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubjectPage');
  }



  saveSubject(){

  }



}
