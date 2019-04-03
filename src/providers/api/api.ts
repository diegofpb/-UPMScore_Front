import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../client-http/clientHttp";
import {ConstantsProvider} from "../constants/constants";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the UpmapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public client: HttpClientProvider,
              public constants: ConstantsProvider) {
  }

  getURL(url: string): Observable<any> {
    return this.client.get(url);
  }

  getSchools(): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.SCHOOLS);
  }

  getPlansFromSchoolId(schoolId: string, academicYear: string): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.SCHOOLS + "/" +
      schoolId + "/plans?year=" + academicYear);
  }

  getSubjectsFromPlan(planId: string, academicYear: string): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.PLANS + "/" +
      planId + "/subjects?year=" + academicYear);
  }

  postSubjectToSystem(data: any): Observable<any> {
    return this.client.postJson(this.constants.HOST + this.constants.CREATE_SUBJECT,
      data)
  }

  getAllTeachersInSystem(): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.TEACHERS)
  }

  searchForTeachersNamed(name: any): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.TEACHERS
      + this.constants.FIND_ALL_BY_NAME + "?name=" + name)
  }

  postTeachersForSubject(teachers: any, subjectId: any): Observable<any> {
    return this.client.postJson(this.constants.HOST + this.constants.CREATE_SUBJECT
    + "/" + subjectId + "/teachers", teachers)
  }

  uploadApoloCSV(UPMSubjectPK: any, subjectId: any, csvFile: File): Observable<any> {
    let form: FormData = new FormData();
    form.append("csvFile", csvFile, csvFile.name);
    return this.client.postMultiPart(this.constants.HOST + this.constants.CREATE_SUBJECT
      + "/" + subjectId + "/csv", csvFile)
  }

  getSubjects(): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.SUBJECTS);
  }

  searchForSubjectsNamed(name: any): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.SUBJECTS
      + this.constants.FIND_ALL_BY_NAME + "?name=" + name)
  }

  getSubject(subjectId: any): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.SUBJECTS + "/" + subjectId)
  }

  getEvaluationsFromSubject(subjectId: any): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.SUBJECTS + "/" + subjectId + this.constants.EVALUATIONS)
  }

  getEvaluationsFromSubjectProjection(subjectId: any): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.EVALUATIONS + "/search/bySubject?subject_id=" + subjectId)
  }

  getAssingmentsFromEvaluation(evaluationId: any): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.EVALUATIONS + "/" + evaluationId + this.constants.ASSINGMENTS)
  }

  postTeacherToSystem(data: any): Observable<any> {
    return this.client.postJson(this.constants.HOST + this.constants.TEACHERS,
      data)
  }

  getTeacher(id: any): Observable<any> {
    return this.client.get(this.constants.HOST + this.constants.TEACHERS
      + "/" + id)
  }

  deleteTeacher(id: any): Observable<any> {
    return this.client.delete(this.constants.HOST + this.constants.TEACHERS
      + "/" + id)
  }

  postEvaluationOfSubject(evaluation: any): Observable<any> {
    return this.client.postJson(this.constants.HOST + this.constants.EVALUATIONS,
      evaluation)
  }

  postAssingmentOfEvaluation(evaluation: any): Observable<any> {
    return this.client.postJson(this.constants.HOST + this.constants.ASSINGMENTS,
      evaluation)
  }

  deleteEvaluationFromSubject(id: any) {
    return this.client.delete(this.constants.HOST + this.constants.EVALUATIONS
      + "/" + id)
  }

  getTeachersFromSubject(subjectId: any): Observable<any>  {
    return this.client.get(this.constants.HOST + this.constants.SUBJECTS + "/" + subjectId + this.constants.TEACHERS)
  }


  getUPMSubjectsFromSubject(subjectId: any): Observable<any>  {
    return this.client.get(this.constants.HOST + this.constants.SUBJECTS + "/" + subjectId + this.constants.UPM_SUBJECTS)

  }
}
