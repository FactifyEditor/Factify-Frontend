import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media.component';
import { MediaDetailComponent } from './media-detail/media-detail.component';
import { MediaListComponent } from './media-list/media-list.component';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from 'src/app/modules/shared/shared.module';
import { CreateMediaComponent } from './create-media/create-media.component';
import { ImageTemplateListComponent } from './partials/image-template-list/image-template-list.component';
import { VideoTemplateListComponent } from './partials/video-template-list/video-template-list.component'
const routes:Routes=[{
  path: "",
  component:MediaComponent,
  children:[{
    path:'',
    redirectTo:"list",
    pathMatch:"full"
  },
  {
    path:'list',
    component:MediaListComponent
  },
  {
    path:'create',
    component:CreateMediaComponent
  },
  {
    path:':id',
    component:MediaDetailComponent
  }]
}

]

@NgModule({
  declarations: [
    MediaComponent,
    MediaDetailComponent,
    MediaListComponent,
    CreateMediaComponent,
    ImageTemplateListComponent,
    VideoTemplateListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MediaModule { }
