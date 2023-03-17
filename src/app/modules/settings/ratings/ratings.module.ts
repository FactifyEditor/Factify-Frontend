import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingsComponent } from './ratings.component';
import { CreateRatingComponent } from './create-rating/create-rating.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RatingLanguagesComponent } from './partial/rating-languages/rating-languages.component';
const routes: Routes = [
  {
    path: '',
    component: RatingsComponent,
    children: [
      {
        redirectTo: 'list',
        pathMatch: 'full',
        path: '',
      },
      {
        path: 'list',
        component: RatingListComponent,
      },
      {
        path: 'create',
        component: CreateRatingComponent,
      },
      {
        path: ':id',
        component: CreateRatingComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [RatingsComponent, RatingListComponent, CreateRatingComponent, RatingLanguagesComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class RatingsModule {}
