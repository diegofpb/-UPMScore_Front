import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {AddAsignaturaPage} from "../add-asignatura/add-asignatura";
import {PopoverMenuPage} from "../popover-menu/popover-menu";
import {ApiProvider} from "../../providers/api/api";
import {EditSubjectPage} from "../edit-subject/edit-subject";

/**
 * Generated class for the AsignaturasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asignaturas',
  templateUrl: 'asignaturas.html',
})
export class AsignaturasPage {

  asignaturasShow: Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public api: ApiProvider) {
  }

  ionViewDidEnter() {
    console.log("[ASIGNATURAS] UPDATING... ♻️");
    this.getSubjetcs();
  }

  ionViewDidLoad() {
    console.log('[ASIGNATURAS] LOADED  👌');
  }


  getSubjetcs() {
    this.api.getSubjects().subscribe((value) => {
      this.asignaturasShow = value._embedded.subjects;
      console.log(value);
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  filterItems(ev: any) {
    this.api.searchForSubjectsNamed(ev.srcElement.value).subscribe((value) => {
      this.asignaturasShow = value._embedded.subjects;
      let val = ev.target.value;
      if (val && val.trim() !== '') {
        this.asignaturasShow = this.asignaturasShow.filter(function (item) {
          return item.name.toLowerCase().includes(val.toLowerCase());
        });
      }
    });
  }

  addSubject() {
    this.navCtrl.canGoBack();
    this.navCtrl.push(AddAsignaturaPage)
  }

  editSubject(asignatura: any) {
    this.navCtrl.canGoBack();
    this.navCtrl.push(EditSubjectPage, {asignatura: asignatura, subjectId: asignatura.id})
  }

}
