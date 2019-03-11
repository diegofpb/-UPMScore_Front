import { Component } from '@angular/core';
import {Events, IonicPage, NavParams} from 'ionic-angular';
import {AsignaturasPage} from "../asignaturas/asignaturas";
import {ProfesoresPage} from "../profesores/profesores";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the MainTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-tabs',
  templateUrl: 'main-tabs.html'
})
export class MainTabsPage {

  asignaturasNumber : number;
  profesoresNumber : number;

  asignaturasRoot : any = AsignaturasPage;
  profesoresRoot : any = ProfesoresPage;

  mySelectedIndex: number;

  constructor(public navParams: NavParams,
              public api: ApiProvider,
              public events: Events) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    this.refresh();

  }

  refresh(){
    this.api.getAllTeachersInSystem().subscribe((value) =>{
      this.profesoresNumber = value.page.totalElements;
      this.updateTabBadge();
    });

    this.api.getSubjects().subscribe((value) => {
      this.asignaturasNumber = value.page.totalElements;
      this.updateTabBadge();
    });
  }

  public updateTabBadge(): void {
    this.events.publish('asignaturas:updated', this.asignaturasNumber);
    this.events.publish('profesores:updated', this.profesoresNumber);
  }


}
