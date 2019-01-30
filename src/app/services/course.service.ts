import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LMS} from "../config";
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
  getcourses(school) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    return this.http.get(LMS + '/youngspheresite/api/course/' + school + '/', httpOptions);
  }
  savecourse(courseprofile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    const body: string = JSON.stringify(courseprofile);
    return this.http.post(LMS + '/youngspheresite/api/course/', body, httpOptions);
  }
  updatecourse(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };

    const body: string = JSON.stringify(profile);
    return this.http.put(LMS + '/youngspheresite/api/course/'+profile.id+'/', body, httpOptions);
  }

}
