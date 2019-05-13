import { Component } from '@angular/core';
import {NbAuthService} from "@nebular/auth";
import {ProfileService} from "../../services/profile.service";
import {LocalDataSource} from "ng2-smart-table";
import {CourseService} from "../../services/course.service";
import {ClassService} from "../../services/class.service";
import {SectionService} from "../../services/section.service";
import {TeacherService} from "../../services/teacher.service";
import {available_templates} from "../../config";

@Component({
  selector: 'ngx-profile',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'edit',type:'html', title: 'Edit' }],
      position: 'right'
    },
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
      course_status: {
        title: 'Course Status'
      },
    }
  };
  source: LocalDataSource;

  teachersettings = {
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
  teachersource: LocalDataSource;

  studentsettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
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
      user: {
        title: 'User'
      }
    }
  };
  studentsource: LocalDataSource;
  newsection: any;
  school: any;
  available_sections:any = [];
  available_classes:any = [];
  available_teachers:any = []
  available_templates = available_templates;
  token: string;
  username: string;
  addNewCourse: boolean = false;
  editcoursetab: boolean = false;
  presenteditcourse: string;
  newcourse: any = {};
  newteacher: any = {
    user_id: null,
  };
  constructor(private courseservice: CourseService, private authservice: NbAuthService, private profileservice: ProfileService,
              private classservice: ClassService, private sectionservice: SectionService, private teacherservice: TeacherService) {
    this.authservice.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
        this.username = token.getPayload().preferred_username
        this.profileservice.getschool(this.username).subscribe(result => {
          this.school = result;
          this.listOfCourses();
          this.listOfClasses();
          //this.listOfSections();
          this.listOfTeachers();

        })
      });




  }
  onEditRow(data) {

    this.presenteditcourse = data.data.course_id;
    this.editcoursetab = true;
    this.listOfTeachersOfCourse();
    this.listOfStudentsOfCourse();


  }
  addTeacher() {
    console.log(this.newteacher)
    this.newteacher.destination_course_key = this.presenteditcourse;
    console.log(this.newteacher)
    this.courseservice.addTeacherToCourse(this.newteacher).subscribe( (result: any) => {
      console.log(result);
    })

  }
  listOfTeachers() {
    this.teacherservice.getteachers(this.school.school.id).subscribe((result: any) => {
      this.available_teachers = result;
    });
  }
  listOfSections() {
    this.sectionservice.getsections(this.school.organization.id).subscribe((result: any) => {
      this.available_sections = result;
    });
  }
  classselected() {
    this.available_sections = [];
    this.sectionservice.getsectionsbyclass(this.newcourse.course_class).subscribe((result: any) => {
      this.available_sections = result;
    })
  }
  userRowSelect(data) {
    console.log(data)
  }
  listOfClasses() {
    this.classservice.getclasses(this.school.organization.id).subscribe((result: any) => {
      this.available_classes = result;
      this.newcourse.section_class = result[0].id;
    });
  }

  addCourse() {
    this.newcourse.org = this.school.organization.short_name;
    this.newcourse.organization = this.school.organization.id;
    this.newcourse.run = this.newcourse.course_section;
    if(this.newcourse['source_key'] == 'blank'){
      delete this.newcourse['source_key'];
    }

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
    this.courseservice.getcourses(this.school.organization.id).subscribe((result: any) => {
      this.source = new LocalDataSource(result);
    });
  }
  listOfTeachersOfCourse() {
    this.courseservice.getteachers(this.presenteditcourse).subscribe((result: any) => {
      this.teachersource = new LocalDataSource(result);
    });
  }
  listOfStudentsOfCourse() {
    this.courseservice.getstudents(this.presenteditcourse).subscribe((result: any) => {
      this.studentsource = new LocalDataSource(result);
    });
  }
  addstudentsfromsection() {
    let data = {
      section: this.newsection,
      destination_course_key: this.presenteditcourse
    };
    this.courseservice.addstudentsfromsection(data).subscribe((result: any) => {
      console.log(result);
    });
  }



}
