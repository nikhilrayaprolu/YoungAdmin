import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ProfileModule} from "./profile/profile.module";
import {TeachersModule} from "./teachers/teachers.module";
import {ClassesModule} from "./classes/classes.module";
import {SectionsModule} from "./sections/sections.module";
import {StudentsModule} from "./students/students.module";
import {CoursesModule} from "./courses/courses.module";

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    ProfileModule,
    TeachersModule,
    ClassesModule,
    SectionsModule,
    StudentsModule,
    CoursesModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
