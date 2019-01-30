import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LMS} from "../config";
import {NbAuthService} from "@nebular/auth";

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private token: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });


  }
  getsections(organization) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    return this.http.get(LMS + '/youngspheresite/api/section/' + organization + '/', httpOptions);
  }
  savesection(sectionprofile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    const body: string = JSON.stringify(sectionprofile);
    return this.http.post(LMS + '/youngspheresite/api/section/', body, httpOptions);
  }
  updatesection(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };

    const body: string = JSON.stringify(profile);
    return this.http.put(LMS + '/youngspheresite/api/section/'+ profile.id+'/', body, httpOptions);
  }

}
