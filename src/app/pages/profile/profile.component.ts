import { Component } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {NbAuthService} from "@nebular/auth";

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  profile: any = {};
  new = false;
  submitted: boolean;
  constructor(private profileservice: ProfileService, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {
        console.log(token, token.isValid())
        if (token.isValid()) {
          this.profileservice.getschool(token.getPayload().preferred_username).subscribe((result: any) => {
            console.log(result)
            if(result.school != null) {
              this.profile = result.school;
            }
            else {
              this.new = true
            }
            this.profile.organization = result.organization.name;
          })
        }
      });
  }

  updateprofile() {
    if (!this.new) {
      this.profileservice.update(this.profile).subscribe(result => {
        console.log(result);
      });
    } else {
      this.profileservice.save(this.profile).subscribe(result => {
        this.profile = result;
      });
    }
  }


}
