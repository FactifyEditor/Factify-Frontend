import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
//DATA TABLES
import {DataTablesModule} from 'angular-datatables';
import {SharedModule} from 'src/app/modules/shared/shared.module';
import { ComponentComponent } from './component/component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import {HeaderInterceptor} from 'src/app/interceptors/header.interceptor'
@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    SharedModule,
    NgbModule
  ],
  exports:[
    HttpClientModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi:true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
