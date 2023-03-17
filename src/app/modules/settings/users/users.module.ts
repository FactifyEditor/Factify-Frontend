import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: 'create',
        component: AddUserComponent,
      },
      {
        path: ':id',
        component: AddUserComponent,
      }
    ]
  },
];

@NgModule({
  declarations: [UsersComponent, UserListComponent, AddUserComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class UsersModule {}
