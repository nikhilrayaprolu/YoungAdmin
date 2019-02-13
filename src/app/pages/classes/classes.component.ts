import { Component } from '@angular/core';
import {NbAuthService} from "@nebular/auth";
import {ClassService} from "../../services/class.service";
import {ProfileService} from "../../services/profile.service";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'ngx-profile',
  templateUrl: './classes.component.html',
})
export class ClassesComponent {
  settings = {
    columns: {
      class_level: {
        title: 'Class Level'
      },
      display_name: {
        title: 'Display Name'
      },
      num_sections: {
        title: 'Number of Sections'
      },
    }
  };
  source: LocalDataSource;
  class_levels = ['0','1','2']
  school: any;
  token: string;
  username: string;
  addNewClass: boolean = false;
  newclass: any = {class_level: '0'};
  constructor(private classservice: ClassService, private authservice: NbAuthService, private profileservice: ProfileService) {
    this.authservice.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
        this.username = token.getPayload().preferred_username
        this.profileservice.getschool(this.username).subscribe(result => {
          this.school = result;
          this.listOfClasses()

        })
      });




  }
  addClass() {
    this.newclass.organization = this.school.organization.id;
    this.classservice.saveclass(this.newclass).subscribe(result => {
      console.log("added new class");
    });
  }

  editClass(classprofile) {
    this.classservice.updateclass(classprofile).subscribe( result => {
        console.log("updated the class");
    });
  }

  listOfClasses() {
    this.classservice.getclasses(this.school.organization.id).subscribe((result: any) => {
      this.source = new LocalDataSource(result);
    });
  }



}
