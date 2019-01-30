import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LMS} from "../config";
import {NbAuthService} from "@nebular/auth";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private token: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });


  }
  getstudents(school) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    return this.http.get(LMS + '/youngspheresite/api/student/' + school + '/', httpOptions);
  }
  savestudent(studentprofile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    const body: string = JSON.stringify(studentprofile);
    return this.http.post(LMS + '/youngspheresite/api/student/', body, httpOptions);
  }
  updatestudent(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };

    const body: string = JSON.stringify(profile);
    return this.http.put(LMS + '/youngspheresite/api/student/'+profile.id+'/', body, httpOptions);
  }

}
