import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path: "",
    component: TemplatesComponent
  },
  {
    path:'images',
    loadChildren:()=>import('src/app/modules/settings/templates/image-templates/image-templates.module').then(m=>m.ImageTemplatesModule)
  },
  {
    path:'videos-audio',
    loadChildren:()=>import('src/app/modules/settings/templates/video-templates/video-templates.module').then(m=>m.VideoTemplatesModule)
  }
 ]
@NgModule({
  declarations: [
    TemplatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
  // schema:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TemplatesModule { }
