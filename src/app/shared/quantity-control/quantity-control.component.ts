import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.css']
})
export class QuantityControlComponent {
  @Input() quantity: number = 0;        
  @Output() quantityChange:EventEmitter<number> = new EventEmitter<number>();

  increase() {
    this.quantity++;  
    this.quantityChange.emit(this.quantity);
  }

  decrease() {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
