import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ConvertToDashPipe } from '../shared/convert-to-dash.pipe';

import { ProductDetailGuard } from './product-detail.guard';
import { ProductResolver } from './product.resolver';
import { AuthGuard } from '../users/auth.guard';

import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductListComponent, canActivate: [AuthGuard], resolve: { products: ProductResolver } },
      { path: ':id', component: ProductDetailComponent, canActivate: [ProductDetailGuard, AuthGuard] },
      { path: ':id/edit', component: ProductEditComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ConvertToSpacesPipe,
    ConvertToDashPipe,
    ProductDetailComponent,
    ProductEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductModule {
  constructor() {
    console.log("Product Module Loaded");
  }
}
