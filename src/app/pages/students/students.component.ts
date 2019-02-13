import { Component } from '@angular/core';
import {NbAuthService} from "@nebular/auth";
import {ProfileService} from "../../services/profile.service";
import {LocalDataSource} from "ng2-smart-table";
import {StudentService} from "../../services/student.service";
import {SectionService} from "../../services/section.service";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'ngx-profile',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
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
      user: {
        title: 'User'
      }
    }
  };
  bulkusers: any;
  source: LocalDataSource;
  availablesections = [];
  availablecourses = [];
  school: any;
  token: string;
  username: string;
  addNewStudent: boolean = false;
  newstudent: any = {};
  presenteditstudent: string;
  newcourse: any = {};
  editstudentdetails: boolean = false;

  constructor(private studentservice: StudentService, private authservice: NbAuthService,
              private profileservice: ProfileService, private sectionservice: SectionService,
              private courseservice: CourseService) {
    this.authservice.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
        this.username = token.getPayload().preferred_username
        this.profileservice.getschool(this.username).subscribe(result => {
          this.school = result;
          this.listOfStudents();
          this.listOfSections();
          this.listOfCourses();



        })
      });




  }
  listOfCourses() {
    this.courseservice.getcourses(this.school.organization.id).subscribe((result: any) => {
      this.availablecourses = result;
    });
  }
  onEditRow(data) {
    this.presenteditstudent = data.data.user;
    this.editstudentdetails = true;
  }
  addCourse() {
    this.newcourse.user_id = this.presenteditstudent;
    this.courseservice.addStudentToCourse(this.newcourse).subscribe( (result: any) => {
      console.log(result);
    })
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
  addBulkUsers() {
    this.studentservice.bulkuserregistration(this.bulkusers).subscribe((result: any) => {
      console.log(result);
    })
  }
  public csvJSON(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
      let file : File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv = reader.result;
        console.log(csv);
        var json = this.csvJSON(csv)
        console.log(json)
        this.bulkusers = json;
      }
    }
  }



}
