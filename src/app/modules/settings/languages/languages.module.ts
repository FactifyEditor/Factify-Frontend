import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages.component';
import { LanguagesListComponent } from './languages-list/languages-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AddLanguageComponent } from './add-language/add-language.component';
const routes: Routes = [
  {
    path: '',
    component: LanguagesComponent,
    children: [
      {
        redirectTo: 'list',
        pathMatch: 'full',
        path: '',
      },
      {
        path: 'list',
        component: LanguagesListComponent,
      },
      {
        path: 'create',
        component: AddLanguageComponent,
      },
      {
        path:':id',
        component:AddLanguageComponent
      }
      
    ],
  },
];
@NgModule({
  declarations: [
    LanguagesComponent,
    LanguagesListComponent,
    AddLanguageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
    
  ]
})
export class LanguagesModule { }
