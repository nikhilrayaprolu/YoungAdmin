import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';

import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbDatepickerModule, NbSelectModule} from "@nebular/theme";
import {StudentsComponent} from "./students.component";

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),

  ],
  declarations: [
    StudentsComponent,
  ],
})
export class StudentsModule { }
