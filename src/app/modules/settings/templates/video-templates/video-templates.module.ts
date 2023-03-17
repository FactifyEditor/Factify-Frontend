import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTemplateComponent } from './add-template/add-template.component';
import { TemplateDetailComponent } from 'src/app/modules/settings/templates/video-templates/template-detail/template-detail.component';
import { TemplateListComponent } from 'src/app/modules/settings/templates/video-templates/template-list/template-list.component';
import {VideoTemplatesComponent} from 'src/app/modules/settings/templates/video-templates/video-templates.component'
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TemplateLanguagesComponent } from 'src/app/modules/settings/templates/video-templates/partial/template-languages/template-languages.component';

const routes:Routes=[
  {
    path: "",
    component: VideoTemplatesComponent,
    children:[{
      path:'',
      redirectTo:'list',
      pathMatch:'full'
      },
      {
        path: "list",
        component: TemplateListComponent
      },
      {
        path:'create',
        component:AddTemplateComponent
      },
      {
        path:':id',
        component:AddTemplateComponent
      }
    ]
  }
 ]
@NgModule({
  declarations: [
        VideoTemplatesComponent,
        AddTemplateComponent,
        TemplateDetailComponent,
        TemplateListComponent,
        TemplateLanguagesComponent,
 
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class VideoTemplatesModule { }
