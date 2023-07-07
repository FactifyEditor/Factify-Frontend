import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ]
  },
];
@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
    
  ]
})
export class AccountModule { }
