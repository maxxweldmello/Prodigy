import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './users/login.component';

const routes: Routes = [
  { path: 'home', title: "GDTC | Home", component: WelcomeComponent },
  { path: 'login', title: "GDTC | Login", component: LoginComponent },
  { path: '', redirectTo: "home", pathMatch: 'full' },
  {
    path: 'products',
    title: "GDTC | Products",
    loadChildren: () => import('./products/product.module').then(m => m.ProductModule),
  },
  {
    path: 'users',
    title: "GDTC | Users",
    loadChildren: () => import('./users/user.module').then(m => m.UserModule),
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
