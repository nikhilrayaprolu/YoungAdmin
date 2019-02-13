/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NbAuthJWTInterceptor, NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbStepperModule} from "@nebular/theme";
import {server} from "./config";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NbStepperModule,
    BrowserAnimationsModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,

            key: 'access_token', // this parameter tells where to look for the token
          },
          baseEndpoint: server,
          login: {
            // ...
            endpoint: '/api/auth/login',
            redirect: {
              success: 'auth/success',
              failure: null,
            },
          },
          register: {
            // ...
            endpoint: '/api/auth/register',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
          },
        }),
      ],
      forms: {},
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
