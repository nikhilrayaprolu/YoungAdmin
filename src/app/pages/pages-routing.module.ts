import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ProfileComponent} from "./profile/profile.component";
import {TeachersComponent} from "./teachers/teachers.component";
import {ClassesComponent} from "./classes/classes.component";
import {SectionsComponent} from "./sections/sections.component";
import {StudentsComponent} from "./students/students.component";
import {CoursesComponent} from "./courses/courses.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'teachers',
      component: TeachersComponent,
    },
    {
      path: 'classes',
      component: ClassesComponent,
    },
    {
      path: 'sections',
      component: SectionsComponent,
    },
    {
      path: 'students',
      component: StudentsComponent,
    },
    {
      path: 'courses',
      component: CoursesComponent,
    },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
