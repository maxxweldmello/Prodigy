import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { UsersListComponent } from './users-list.component';
import { UsersDetailComponent } from './users-detail.component';
import { NotificationComponent } from '../shared/notification/notification.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', title: "GDTC | Login", component: LoginComponent },
  {
    path: '',
    children: [
      {
        path: '',
        component: UsersListComponent,
        children: [
          { path: ':id', component: UsersDetailComponent },
          { path: '', component: UsersDetailComponent }
        ],
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        component: NotificationComponent,
        outlet: 'notificationOutlet'
      }
    ]
  }
];

@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule {
  constructor() {
    console.log("User Module Loaded");
  }
}
