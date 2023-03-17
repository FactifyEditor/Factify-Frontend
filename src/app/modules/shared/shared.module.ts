import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterComponent } from './toaster/toaster.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule, 
    RouterModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    FileUploadModule,
    NgbToastModule
  ],
  exports:[
    HttpClientModule,
    DataTablesModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxDropzoneModule,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    FileUploadModule,
    NgbToastModule,
    ToasterComponent
  ]
})
export class SharedModule { }
