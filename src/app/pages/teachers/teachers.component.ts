import { Component } from '@angular/core';
import {NbAuthService} from "@nebular/auth";
import {TeacherService} from "../../services/teacher.service";
import {ProfileService} from "../../services/profile.service";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'ngx-profile',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'edit',type:'html', title: 'Edit' }],
      position: 'right'
    },
    columns: {
      email: {
        title: 'Email'
      },
      first_name: {
        title: 'First Name'
      },
      last_name: {
        title: 'Last Name'
      },
      gender: {
        title: 'Gender'
      },
      contact_number: {
        title: 'Phone Number'
      },
      birthday: {
        title: 'Birth Day'
      },
    }
  };
  source: LocalDataSource;

  school: any;
  private token: string;
  private username: string;
  addNewTeacher: boolean = false;
  newteacher: any = {};
  constructor(private teacherservice: TeacherService, private authservice: NbAuthService, private profileservice: ProfileService) {
    this.authservice.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
        this.username = token.getPayload().preferred_username
        this.profileservice.getschool(this.username).subscribe(result => {
          this.school = result;
          this.listOfTeachers()

        })
      });




  }
  addTeacher() {
    this.newteacher.school = this.school.school.id;
    this.teacherservice.saveteacher(this.newteacher).subscribe(result => {
      console.log("added new teacher");
    });
  }

  editTeacher(teacherprofile) {
    this.teacherservice.updateteacher(teacherprofile).subscribe( result => {
        console.log("updated the teacher");
    });
  }

  listOfTeachers() {
    this.teacherservice.getteachers(this.school.school.id).subscribe((result: any) => {
      this.source = new LocalDataSource(result);
    });
  }



}
