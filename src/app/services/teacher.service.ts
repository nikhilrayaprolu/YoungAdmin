import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LMS} from "../config";
import {NbAuthService} from "@nebular/auth";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  token: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });


  }
  getteachers(school) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    return this.http.get(LMS + '/youngspheresite/api/teacher/' + school + '/', httpOptions);
  }
  saveteacher(teacherprofile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    const body: string = JSON.stringify(teacherprofile);
    return this.http.post(LMS + '/youngspheresite/api/teacher/', body, httpOptions);
  }
  updateteacher(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };

    const body: string = JSON.stringify(profile);
    return this.http.put(LMS + '/youngspheresite/api/teacher/'+profile.id+'/', body, httpOptions);
  }

}
