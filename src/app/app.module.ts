import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";

import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';


import {MyApp} from './app.component';
import {HttpClientProvider} from '../providers/client-http/clientHttp';
import {ConstantsProvider} from '../providers/constants/constants';
import {UserDataProvider} from '../providers/user-data/user-data';
import {MainTabsPage} from "../pages/main-tabs/main-tabs";
import {IonicStorageModule} from "@ionic/storage";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginPage} from "../pages/login/login";
import {AsignaturasPage} from "../pages/asignaturas/asignaturas";
import {AddAsignaturaPage} from "../pages/add-asignatura/add-asignatura";
import {AddProfesoresToAsignaturaPage} from "../pages/add-profesores-to-asignatura/add-profesores-to-asignatura";
import {BasicAuthInterceptorProvider} from '../providers/basic-auth-interceptor/basic-auth-interceptor';
import {ApiProvider} from "../providers/api/api";
import {ProfesoresPage} from "../pages/profesores/profesores";
import {PopoverMenuPage} from "../pages/popover-menu/popover-menu";
import {AddUpmsubjectsToAsignaturaPage} from "../pages/add-upmsubjects-to-asignatura/add-upmsubjects-to-asignatura";
import {EditSubjectPage} from "../pages/edit-subject/edit-subject";
import {CreateTeacherPage} from "../pages/create-teacher/create-teacher";
import {CreateEvaluationModalPage} from "../pages/create-evaluation-modal/create-evaluation-modal";
import {EditProfesorPage} from "../pages/edit-profesor/edit-profesor";
import {TooltipController, TooltipsModule} from "ionic-tooltips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CreateAssingmentModalPage} from "../pages/create-assingment-modal/create-assingment-modal";
import {EditStudentsModalPage} from "../pages/edit-students-modal/edit-students-modal";
import {AddUpmAsignaturaModalPage} from "../pages/add-upm-asignatura-modal/add-upm-asignatura-modal";

@NgModule({
  declarations: [
    MyApp,
    MainTabsPage,
    LoginPage,
    AsignaturasPage,
    ProfesoresPage,
    AddAsignaturaPage,
    AddProfesoresToAsignaturaPage,
    PopoverMenuPage,
    AddUpmsubjectsToAsignaturaPage,
    EditSubjectPage,
    CreateTeacherPage,
    CreateEvaluationModalPage,
    EditProfesorPage,
    CreateAssingmentModalPage,
    EditStudentsModalPage,
    AddUpmAsignaturaModalPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TooltipsModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: LoginPage, name: 'login', segment: 'login'},
        {component: MainTabsPage, name: 'home', segment: 'home'},
        {component: AsignaturasPage, name: 'asignaturas', segment: 'all'},
        {component: ProfesoresPage, name: 'profesores', segment: 'all'},
        {component: AddAsignaturaPage, name: 'nuevo', segment: 'nueva'},
        {component: CreateTeacherPage, name: 'nuevo', segment: 'nuevo'},
      ]
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainTabsPage,
    LoginPage,
    AsignaturasPage,
    ProfesoresPage,
    AddAsignaturaPage,
    AddProfesoresToAsignaturaPage,
    PopoverMenuPage,
    AddUpmsubjectsToAsignaturaPage,
    EditSubjectPage,
    CreateTeacherPage,
    CreateEvaluationModalPage,
    EditProfesorPage,
    CreateAssingmentModalPage,
    EditStudentsModalPage,
    AddUpmAsignaturaModalPage

  ],
  providers: [
    StatusBar,
    TooltipController,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptorProvider,
      multi: true
    },
    HttpClientProvider,
    ConstantsProvider,
    UserDataProvider,
    BasicAuthInterceptorProvider,
    ApiProvider
  ]
})
export class AppModule {
}
