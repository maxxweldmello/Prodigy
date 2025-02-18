import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star-component/star.component';
import { FormsModule } from '@angular/forms';
import { QuantityControlComponent } from './quantity-control/quantity-control.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    StarComponent,
    QuantityControlComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent,
    QuantityControlComponent
  ]
})
export class SharedModule {
  constructor(){
    console.log("Shared Module")
  }
}
