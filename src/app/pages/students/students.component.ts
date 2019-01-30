import { Component } from '@angular/core';
import {NbAuthService} from "@nebular/auth";
import {ProfileService} from "../../services/profile.service";
import {LocalDataSource} from "ng2-smart-table";
import {StudentService} from "../../services/student.service";
import {SectionService} from "../../services/section.service";

@Component({
  selector: 'ngx-profile',
  templateUrl: './students.component.html',
})
export class StudentsComponent {
  settings = {
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
  availablesections = [];
  school: any;
  private token: string;
  private username: string;
  addNewStudent: boolean = false;
  newstudent: any = {};
  constructor(private studentservice: StudentService, private authservice: NbAuthService,
              private profileservice: ProfileService, private sectionservice: SectionService) {
    this.authservice.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
        this.username = token.getPayload().preferred_username
        this.profileservice.getschool(this.username).subscribe(result => {
          this.school = result;
          this.listOfStudents()
          this.listOfSections()


        })
      });




  }
  listOfSections() {
    this.sectionservice.getsections(this.school.organization.id).subscribe((result: any) => {
      this.availablesections = result;
    });
  }
  addStudent() {
    this.newstudent.school = this.school.school.id;
    this.studentservice.savestudent(this.newstudent).subscribe(result => {
      console.log("added new student");
    });
  }

  editStudent(studentprofile) {
    this.studentservice.updatestudent(studentprofile).subscribe( result => {
        console.log("updated the student");
    });
  }

  listOfStudents() {
    this.studentservice.getstudents(this.school.school.id).subscribe((result: any) => {
      this.source = new LocalDataSource(result);
    });
  }



}
