import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from 'src/app/modules/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'

const routes:Routes=[
  {
    path:'',
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  }
  
  ]
@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
