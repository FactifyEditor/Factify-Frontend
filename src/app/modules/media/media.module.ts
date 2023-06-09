import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media.component';
import { MediaDetailComponent } from './media-detail/media-detail.component';
import { MediaListComponent } from './media-list/media-list.component';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from 'src/app/modules/shared/shared.module';
import { CreateMediaComponent } from './create-media/create-media.component';
import { ImageTemplateListComponent } from './partials/image-template-list/image-template-list.component';
import { VideoTemplateListComponent } from './partials/video-template-list/video-template-list.component';
import { DraftsComponent } from './drafts/drafts.component'
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng2ImgMaxModule } from 'ng2-img-max';
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
    path:'draft',
    component:DraftsComponent
  },
  {
    path:'create',
    component:CreateMediaComponent
  },
  {
    path:':id',
    component:CreateMediaComponent
  },
  {
    path:':id/detail',
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
    VideoTemplateListComponent,
    DraftsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ImageCropperModule,
    Ng2ImgMaxModule
  ]
})
export class MediaModule { }
