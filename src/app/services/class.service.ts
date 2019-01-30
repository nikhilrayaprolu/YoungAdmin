import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LMS} from "../config";
import {NbAuthService} from "@nebular/auth";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private token: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });


  }
  getclasses(organization) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    return this.http.get(LMS + '/youngspheresite/api/class/' + organization + '/', httpOptions);
  }
  saveclass(classprofile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    const body: string = JSON.stringify(classprofile);
    return this.http.post(LMS + '/youngspheresite/api/class/', body, httpOptions);
  }
  updateclass(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };

    const body: string = JSON.stringify(profile);
    return this.http.put(LMS + '/youngspheresite/api/class/'+ profile.id+'/', body, httpOptions);
  }

}
