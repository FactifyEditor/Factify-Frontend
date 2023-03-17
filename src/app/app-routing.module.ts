import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
const routes: Routes = [{
  path:'auth',
  loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
}
,{
  path:'feed',
  canActivate: [AuthGuard],
  loadChildren: () => import('./modules/media/media.module').then(m => m.MediaModule)
},
{
  path:'users',
  canActivate: [AuthGuard],
  loadChildren: () => import('./modules/settings/users/users.module').then(m => m.UsersModule)
},
{
  path:'ratings',
  canActivate: [AuthGuard],
  loadChildren:()=>import('./modules/settings/ratings/ratings.module').then(m=>m.RatingsModule)
},
{
  path:'templates',
  canActivate: [AuthGuard],
  loadChildren:()=>import('./modules/settings/templates/templates.module').then(m=>m.TemplatesModule)
},
{
  canActivate: [AuthGuard],
  path:'languages',
  loadChildren:()=>import('./modules/settings/languages/languages.module').then(m=>m.LanguagesModule)
},
{
  path:'', redirectTo:'feed',pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
