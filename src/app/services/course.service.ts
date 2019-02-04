import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CMS, LMS} from "../config";
import {NbAuthService} from "@nebular/auth";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private token: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });


  }
  addTeacherToCourse(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    const body: string = JSON.stringify(data);
    return this.http.post(LMS + '/youngspheresite/api/enroll_teacher/', body, httpOptions);

  }
  addStudentToCourse(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    const body: string = JSON.stringify(data);
    return this.http.post(LMS + '/youngspheresite/api/enroll_student/', body, httpOptions);

  }
  getteachers(course_key) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    return this.http.get(LMS + '/youngspheresite/api/enroll_teacher/' + course_key + '/', httpOptions);
  }
  getstudents(course_key) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    return this.http.get(LMS + '/youngspheresite/api/enroll_student/' + course_key + '/', httpOptions);
  }

  getcourses(school) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    return this.http.get(LMS + '/youngspheresite/api/course/' + school + '/', httpOptions);
  }
  savecourse(courseprofile) {
    console.log(this.token)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    const body: string = JSON.stringify(courseprofile);
    return this.http.post(CMS + '/course_api/', body, httpOptions);
  }
  addstudentsfromsection(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    const body: string = JSON.stringify(data);
    return this.http.post(LMS + '/youngspheresite/api/bulk_enroll_section/', body, httpOptions);
  }
  updatecourse(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };

    const body: string = JSON.stringify(profile);
    return this.http.put(CMS + '/youngspheresite/api/course/'+profile.id+'/', body, httpOptions);
  }

}
