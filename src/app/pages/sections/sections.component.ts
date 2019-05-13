import { Component } from '@angular/core';
import {NbAuthService} from "@nebular/auth";
import {SectionService} from "../../services/section.service";
import {ProfileService} from "../../services/profile.service";
import {LocalDataSource} from "ng2-smart-table";
import {ClassService} from "../../services/class.service";

@Component({
  selector: 'ngx-profile',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent {
  settings = {
    columns: {
      id: {
        title: 'Id'
      },
      section_class_level: {
        title: 'Class'
      },
      section_name: {
        title: 'Section Name'
      },
      description: {
        title: 'Section Description'
      },
    }
  };
  available_classes = [];
  source: LocalDataSource;
  school: any;
  token: string;
  username: string;
  addNewSection: boolean = false;
  newsection: any = {};
  constructor(private sectionservice: SectionService, private authservice: NbAuthService,
              private profileservice: ProfileService, private  classservice: ClassService) {
    this.authservice.getToken()
      .subscribe((token) => {
        this.token = token.getValue()
        this.username = token.getPayload().preferred_username
        this.profileservice.getschool(this.username).subscribe(result => {
          this.school = result;
          this.listOfClasses();
          this.listOfSections()

        })
      });




  }
  addSection() {
    this.newsection.organization = this.school.organization.id;
    this.sectionservice.savesection(this.newsection).subscribe(result => {
      console.log("added new section");
      this.addNewSection = !(this.addNewSection)
      this.listOfSections();
    });
  }

  editSection(sectionprofile) {
    this.sectionservice.updatesection(sectionprofile).subscribe( result => {
        console.log("updated the section");
    });
  }

  listOfSections() {
    this.sectionservice.getsections(this.school.organization.id).subscribe((result: any) => {
      this.source = new LocalDataSource(result);
    });
  }
  listOfClasses() {
    this.classservice.getclasses(this.school.organization.id).subscribe((result: any) => {
      this.available_classes = result;
      this.newsection.section_class = result[0].id;
    });
  }



}
