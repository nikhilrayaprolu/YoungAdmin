import { Component } from '@angular/core';
import {NbAuthService} from "@nebular/auth";
import {ProfileService} from "../../services/profile.service";
import {LocalDataSource} from "ng2-smart-table";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'ngx-profile',
  templateUrl: './courses.component.html',
})
export class CoursesComponent {
  settings = {
    columns: {
      course_class: {
        title: 'Class'
      },
      course_section: {
        title: 'Section'
      },
      course_name: {
        title: 'Course Name'
      },
      description: {
        title: 'Description'
      },
      year: {
        title: 'Year'
      },
      course_id: {
        title: 'Course id'
      },
      coures_status: {
        title: 'Course Status'
      },
    }
  };
  source: LocalDataSource;

  school: any;
  private token: string;
  private username: string;
  addNewCourse: boolean = false;
  newcourse: any = {};
  constructor(private courseservice: CourseService, private authservice: NbAuthService, private profileservice: ProfileService) {
    this.authservice.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
        this.username = token.getPayload().preferred_username
        this.profileservice.getschool(this.username).subscribe(result => {
          this.school = result;
          this.listOfCourses()

        })
      });




  }
  addCourse() {
    this.newcourse.school = this.school.school.id;
    this.courseservice.savecourse(this.newcourse).subscribe(result => {
      console.log("added new course");
    });
  }

  editCourse(courseprofile) {
    this.courseservice.updatecourse(courseprofile).subscribe( result => {
        console.log("updated the cpurse");
    });
  }

  listOfCourses() {
    this.courseservice.getcourses(this.school.school.id).subscribe((result: any) => {
      this.source = new LocalDataSource(result);
    });
  }



}
