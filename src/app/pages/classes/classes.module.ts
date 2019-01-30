import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import {ClassesComponent} from "./classes.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbDatepickerModule, NbSelectModule} from "@nebular/theme";

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbDatepickerModule.forRoot()
  ],
  declarations: [
    ClassesComponent,
  ],
})
export class ClassesModule { }
